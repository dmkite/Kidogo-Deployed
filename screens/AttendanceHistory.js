import React, {Component} from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import dateMath from 'date-arithmetic'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header'
import {AttendanceHistoryView, AttendanceHistoryRow} from '../components/AttendanceHistoryView'
import {getAccounts} from '../actions/accounts'
import {getAttendance} from '../actions/attendance'


class AttendanceHistory extends Component {
  constructor(props){
    super(props)
    this.state = {
      dateMod: 0,
      dateSpan: []
    }
  }
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ff7e09',
      height: 0
    }
  }

  changeWeeks = (direction) => {
    console.log(typeof(this.state.dateMod))
    let dateMod = this.state.dateMod
    if (direction === 'forward') dateMod += 7
    else dateMod -= 7

    this.dateSpan(dateMod)
    this.setState({dateMod})
  }

  componentDidMount(){
    if(!Object.keys(this.props.attendance).length) this.props.getAttendance()
    if(!this.props.accounts.accounts[0].children.length) this.props.getAccounts()
    this.dateSpan(this.state.dateMod)
  }

  dateSpan = (dateMod) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    const dayOfWeek = date.getDay()

    let today = new Date(year, month, day)
    if(dateMod < 0) dateMod = -dateMod
    today = dateMath.subtract(today, dateMod, 'day')
    const upper = dateMath.add(today, 6 - dayOfWeek, 'day')
    const lower = dateMath.subtract(today, dayOfWeek, 'day' )
    const endSpan = []
    let endDate = upper.getDate()
    while( endDate > 0 && endSpan.length < 7){
      let day = endDate < 10 ? '0' + endDate : endDate
      let month = upper.getMonth() + 1 < 10 ? '0' + (upper.getMonth() + 1) : lower.getMonth() + 1
      let year = upper.getFullYear()
      endSpan.unshift(`${day}-${month}-${year}`)
      endDate--
    }
    if (endSpan.length === 7){
      this.setState({dateSpan:endSpan})
      return
    }
    
    else {
      let startDateLength = 7 - endSpan.length
      let startDate = lower.getDate()
      let startSpan = []
      while (startSpan.length !== startDateLength){
        let day = startDate < 10 ? '0' + startDate : startDate
        let month = lower.getMonth() + 1 < 10 ? '0' + (lower.getMonth() + 1) : lower.getMonth() + 1
        let year = lower.getFullYear()
        startSpan.push(`${day}-${month}-${year}`)
        startDate++ 
      }
      
      this.setState({dateSpan: startSpan.concat(endSpan)})
    }
  }

  attendanceByChild = (id) => {
    let attendance = this.props.attendance
    
    return this.state.dateSpan.map((date, i) => {
      if (!attendance[date] || !attendance[date][id] || !attendance[date][id].checkIn) return false
      return true
    })
  }

  accountsToChildren = () => {
    if(!this.props.accounts.accounts) return []
    return this.props.accounts.accounts.reduce((acc, acct) => {
      acct.children.forEach(child => {
        delete child.notes
        delete child.gender
        delete child.birthday
      })
      acc = acc.concat(acct.children)
      return acc
    }, [])
  }

  render(){
    return (
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>
        <Text>Attendance History</Text>
        <AttendanceHistoryView span={this.state.dateSpan} changeWeeks={this.changeWeeks} dateMod={this.state.dateMod}/>
        <ScrollView style={{marginTop:10}}>
          {this.accountsToChildren().map( (child, i) => {
            return <AttendanceHistoryRow key={i} i={i} {...child} attendanceStatus={this.attendanceByChild(child.id)}/>
          })}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({attendance: state.attendance, accounts: state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({getAccounts, getAttendance}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceHistory)