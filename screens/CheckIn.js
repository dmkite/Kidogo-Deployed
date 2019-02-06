import React, { Component } from 'react'
import { Text, View, ScrollView, AsyncStorage } from 'react-native'
import Header from '../components/Header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {AttendanceCard} from '../components/AttendanceCard'
import {getAttendance, changeCheckIn} from '../actions/attendance'

class CheckIn extends Component{
  constructor(props){
    super(props)
    this.state = {
      attendance: [], 
      today: `${new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
    }
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ff7e09',
      height: 0
    }
  }

  changeAttendance = (id) => {


  }

  numberPresent = () => {
    let ct = 0
    for(let ids in this.props.attendance[this.today]){
      if(this.props.attendance[this.today][ids].checkIn) ct++
    }
    
    return ct
  }

  componentDidMount = async () => {
    this.props.getAttendance()

  }

  day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]
  year = new Date().getFullYear()
  date = new Date().getDate()
  month = ['January', 'February','March','April','May','June','July','August','September','October','November','December'][new Date().getMonth()]
  
  render(){
    return (
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>
        <Text>{this.day}, {this.date}, {this.month} {this.year}</Text>
        { this.numberPresent() === Object.keys(this.props.attendance).length 
          ? <Text>Everyone is here today</Text>
          : <Text>{this.numberPresent()} {this.numberPresent() !== 1 ? 'Children are' : 'Child is'} here today</Text>

        }
        <ScrollView>
          {
            Object.keys(this.props.attendance[today]).map((id, i) => {
              return <AttendanceCard key={i} {...this.props.attednance[today][id]} onPress={() => this.props.changeCheckIn(today, child.id)}/>
            })
          }
        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = state => ({attendance:state})
const mapDisptachToProps = dispatch => bindActionCreators({getAttendance, changeCheckIn}, dispatch)
export default connect(mapStateToProps, bindActionCreators)(CheckIn)