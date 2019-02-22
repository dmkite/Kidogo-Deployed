import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import Header from '../components/Header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AttendanceCard from '../components/AttendanceCard'
import {styles} from '../components/AttendanceCard/styles'
import {getAttendance, changeCheckInOut} from '../actions/attendance'
import {LinearGradient} from 'expo'
import Dates from '../utilities/dates'

class CheckIn extends Component{
  constructor(props){
    super(props)
    this.state = { 
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

  // returnToday = () => {    
  //   return (
  //     `${this.state.date.getDate() < 10 ? '0' + this.state.date.getDate() : this.state.date.getDate()}-${Number(this.state.date.getMonth()) + 1 < 10 ? '0' + Number((this.state.date.getMonth()) + 1) : Number(this.state.date.getMonth()) + 1}-${this.state.date.getFullYear()}`)
  // }
  
  componentDidMount = () => {
    // const today = this.returnToday()
    if(!this.props.attendance[this.state.d.getToday()]){
      this.props.getAttendance(this.state.d.getToday())
    }
  }

  childrenHere = () => {
    const today = this.state.d.getToday()
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
              {console.log(this.props.attendance)}
        <Text style={{ color:'#ffffff80', fontSize:24, margin:10}}>
          {`${this.state.d.getDay()}, ${this.state.d.getDate()}, ${this.state.d.getMonth()} ${this.state.d.getYear()}`}
        </Text>
        <Text style={{color:'#ffffff80', fontSize:18, margin:10, marginBottom:20}}>
          {this.childrenHere().total === this.childrenHere().hereToday ? 'All children are here' : this.childrenHere().hereToday === 1 ? '1 child is here' : this.childrenHere().hereToday + ' children are here'
          }
        </Text>
        <ScrollView contentContainerStyle={styles.attendanceHolder}>
          {this.props.attendance[this.state.d.getToday()]
            ? Object.keys(this.props.attendance[this.state.d.getToday()]).map( (id, i) =>{
              let cardDetails = this.props.attendance[this.state.d.getToday()][id]
                return <AttendanceCard key={i} {...cardDetails} onPress={() => this.props.changeCheckInOut(this.state.d.getToday(), id, 'checkIn')} isMorning={true}/>
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