import React, {Component} from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {LinearGradient} from 'expo'
import Header from '../components/Header'
import {AttendanceHistoryView, AttendanceHistoryRow} from '../components/AttendanceHistoryView'
import {getAccounts} from '../actions/accounts'
import {getAttendance} from '../actions/attendance'
import Dates from '../utilities/dates'

class AttendanceHistory extends Component {
  constructor(props){
    super(props)
    this.state = {
      dateMod: 0,
      dateSpan: [],
      d: new Dates()
    }
  }
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  changeWeeks = (direction) => {
    let dateMod = this.state.dateMod
    if (direction === 'forward') dateMod += 7
    else dateMod -= 7
    this.setState({ dateMod, dateSpan: this.state.d.getSpan(dateMod)})
  }

  componentDidMount(){
    if(!Object.keys(this.props.attendance).length) this.props.getAttendance()
    if(!this.props.accounts || !this.props.accounts[0] || !this.props.accounts[0].children.length) this.props.getAccounts()
    this.setState({dateSpan: this.state.d.getSpan(this.state.dateMod)})
  }

  attendanceByChild = (id) => {
    let attendance = this.props.attendance
    return this.state.dateSpan.map((date, i) => {
      if (!attendance[date] || !attendance[date][id] || !attendance[date][id].checkIn) return false
      return true
    })
  }

  accountsToChildren = () => {
    if(!this.props.accounts.length) return []
    return this.props.accounts.reduce((acc, acct) => {
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
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation}/>
        
        <AttendanceHistoryView span={this.state.dateSpan} changeWeeks={this.changeWeeks} dateMod={this.state.dateMod}/>
        <ScrollView style={{marginTop:10}}>
          {this.accountsToChildren().map( (child, i) => {
            return <AttendanceHistoryRow key={i} i={i} {...child} attendanceStatus={this.attendanceByChild(child.id)}/>
          })}
        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({attendance: state.attendance, accounts: state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({getAccounts, getAttendance}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceHistory)