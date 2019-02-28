import React, { Component } from 'react'
import { Text, ScrollView, TouchableOpacity, View } from 'react-native'
import {Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {LinearGradient, Audio} from 'expo'
import {getAttendance, changeCheckInOut} from '../actions/attendance'
import {styles} from '../components/AttendanceCard/styles'
import AttendanceCard from '../components/AttendanceCard'
import Header from '../components/Header'
import Dates from '../utilities/dates'

class CheckIn extends Component{
  constructor(props){
    super(props)
    this.state = { 
      d: new Dates(),
      soundObject: null
    }
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
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

  playAudio = async () => {
    try{
      if(!this.state.soundObject){
        const soundObject = new Audio.Sound()
        await soundObject.loadAsync(require('../assets/audio/attendance.mp3'))
        await soundObject.playAsync()
        this.setState({ soundObject })
      }
      else{   
        await this.state.soundObject.stopAsync()
        this.setState({soundObject: null})
      }
    }catch(err){
      console.error(err)
      this.setState({error:'We could not play the audio file'})
    }
  }  

  componentDidMount = () => {

    // if(!this.props.attendance[this.state.d.getToday()]){
      this.props.getAttendance(this.state.d.getToday())
    // }
  }

  render(){
    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation}/>
        <Text style={[styles.h1, styles.raleway]}>Check In</Text>
        <Text style={styles.h2}>
          {`${this.state.d.getDay()}, ${this.state.d.getDate()}, ${this.state.d.getMonth()} ${this.state.d.getYear()}`}
        </Text>
        <Text style={[styles.text, {marginLeft:10, marginBottom:20}]}>
          {this.childrenHere().total === this.childrenHere().hereToday 
            ? 'All children are here' 
            : this.childrenHere().hereToday === 1 
              ? '1 child is here' 
              : this.childrenHere().hereToday + ' children are here'
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
        <TouchableOpacity style={{ backgroundColor: '#ffffff80', position: 'absolute', bottom: -75, left: -75, width: 150, height: 150, borderRadius: 75 }} onPress={this.playAudio}>
            <View style={{ position: 'absolute', bottom: 85, left: 80 }}>
              <Icon name="record-voice-over" color="#3C233D" size={36} />
            </View>
          </TouchableOpacity>

      </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({attendance:state.attendance})
const mapDispatchToProps = dispatch => bindActionCreators({getAttendance, changeCheckInOut}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn)