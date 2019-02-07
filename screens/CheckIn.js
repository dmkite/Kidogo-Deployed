import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import Header from '../components/Header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AttendanceCard from '../components/AttendanceCard'
import {styles} from '../components/AttendanceCard/styles'
import {getAttendance, changeCheckIn} from '../actions/attendance'

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
      backgroundColor: '#ff7e09',
      height: 0
    }
  }

  returnToday = () => {    
    return (
      `${this.state.date.getDate() < 10 ? '0' + this.state.date.getDate() : this.state.date}-${Number(this.state.date.getMonth()) + 1 < 10 ? '0' + Number((this.state.date.getMonth()) + 1) : Number(this.state.date.getMonth()) + 1}-${this.state.date.getFullYear()}`)
  }
  
  componentDidMount = () => {
    const today = this.returnToday()
    this.props.getAttendance(today)
  }

  childrenHere = () => {
    const today = this.returnToday()
    return Object.keys(this.props.attendance[today]).reduce((acc, id) => {
      childHere = this.props.attendance[today][id].checkIn
      if(childHere) acc++
      return acc
    }, 0)
  }

  render(){
    return (
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>
        <Text>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.state.date.getDay()] + ', ' +
          this.state.date.getDate() + ', ' +
          ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.state.date.getMonth()] + ' ' +
          this.state.date.getFullYear()}
        </Text>
        <Text>
          {Object.keys(this.props.attendance[this.returnToday()]).length === this.childrenHere() ? 'All children are here' : this.childrenHere() === 1 ? '1 child is here' : this.childrenHere() + ' children are here'
          }
        </Text>
        <ScrollView contentContainerStyle={styles.attendanceHolder}>
          {Object.keys(this.props.attendance[this.returnToday()]).map( (id, i) =>{
            let cardDetails = this.props.attendance[this.returnToday()][id]
            return <AttendanceCard key={i} {...cardDetails} onPress={() => this.props.changeCheckIn(this.returnToday(), id )} />
          })}
        </ScrollView>

      </View>
    )
  }
}


const mapStateToProps = state => ({attendance:state.attendance})
const mapDispatchToProps = dispatch => bindActionCreators({getAttendance, changeCheckIn}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CheckIn)