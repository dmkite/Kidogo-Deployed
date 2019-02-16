import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import Header from '../components/Header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AttendanceCard from '../components/AttendanceCard'
import {styles} from '../components/AttendanceCard/styles'
import {getAttendance, changeCheckInOut} from '../actions/attendance'
import {LinearGradient} from 'expo'

class CheckIn extends Component{
  constructor(props){
    super(props)
    this.state = { 
      date: new Date(),
    }
  }
  

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  returnToday = () => {    
    return (
      `${this.state.date.getDate() < 10 ? '0' + this.state.date.getDate() : this.state.date.getDate()}-${Number(this.state.date.getMonth()) + 1 < 10 ? '0' + Number((this.state.date.getMonth()) + 1) : Number(this.state.date.getMonth()) + 1}-${this.state.date.getFullYear()}`)
  }
  
  componentDidMount = () => {
    const today = this.returnToday()
    this.props.getAttendance(today)
  }

  childrenHere = () => {
    const today = this.returnToday()
    if(!this.props.attendance[today]) return {total: 0, hereToday: 0}
    return Object.keys(this.props.attendance[today]).reduce((acc, id) => {
      childHere = this.props.attendance[today][id].checkIn
      if(childHere) acc.hereToday++
      acc.total++
      return acc
    }, {total: 0, hereToday: 0})
  }

  

  render(){
    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation}/>
        <Text style={{ color:'#ffffff80', fontSize:24, margin:10}}>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.state.date.getDay()] + ', ' +
          this.state.date.getDate() + ', ' +
          ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.state.date.getMonth()] + ' ' +
          this.state.date.getFullYear()}
        </Text>
        <Text style={{color:'#ffffff80', fontSize:18, margin:10, marginBottom:20}}>
          {this.childrenHere().total === this.childrenHere().hereToday ? 'All children are here' : this.childrenHere().hereToday === 1 ? '1 child is here' : this.childrenHere().hereToday + ' children are here'
          }
        </Text>
        <ScrollView contentContainerStyle={styles.attendanceHolder}>
          { this.props.attendance[this.returnToday()]
            ? Object.keys(this.props.attendance[this.returnToday()]).map( (id, i) =>{
              let cardDetails = this.props.attendance[this.returnToday()][id]
              return <AttendanceCard key={i} {...cardDetails} onPress={() => this.props.changeCheckInOut(this.returnToday(), id, 'checkIn')} isMorning={true}/>
            })
            : null
          }
        </ScrollView>

      </LinearGradient>
    )
  }
}


const mapStateToProps = state => ({attendance:state.attendance})
const mapDispatchToProps = dispatch => bindActionCreators({getAttendance, changeCheckInOut}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CheckIn)