import React, { Component } from 'react'
import { Text, View, ScrollView} from 'react-native'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AttendanceCard from '../components/AttendanceCard'
import { styles } from '../components/AttendanceCard/styles'
import { getAttendance, changeCheckInOut } from '../actions/attendance'
import {LinearGradient} from 'expo'
import Dates from '../utilities/dates'

class CheckOut extends Component {
  constructor(props) {
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
    this.props.getAttendance(this.state.d.getToday())
  }

  childrenHere = () => {
    const today = this.state.d.getToday()
    return Object.keys(this.props.attendance[today]).reduce((acc, id) => {
      let childArrived = this.props.attendance[today][id].checkIn
      if(childArrived) acc.total++ 
      let childLeft = this.props.attendance[today][id].checkOut
      if (childArrived && !childLeft) acc.remaining++
      return acc
    }, {total:0, remaining:0})
  }

  render() {
    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation} />
       <Text style={styles.h2}>
          {`${this.state.d.getDay()}, ${this.state.d.getDate()}, ${this.state.d.getMonth()} ${this.state.d.getYear()}`}
        </Text>
        
        {this.props.attendance && this.props.attendance[this.state.d.getToday()]
        ? <View>
            <Text style={[styles.text, {marginBottom:20}]}>
              {this.childrenHere().total === this.childrenHere().remaining ? 'No children have left' : this.childrenHere().remaining === 1 ? '1 child is still here' : this.childrenHere().remaining + ' children are still here'
              }
            </Text>
            <ScrollView contentContainerStyle={styles.attendanceHolder}>
              {this.props.attendance[this.state.d.getToday()]
                ? Object.keys(this.props.attendance[this.state.d.getToday()]).map((id, i) => {
                  let cardDetails = this.props.attendance[this.state.d.getToday()][id]
                  if(!!cardDetails.checkIn) return <AttendanceCard key={i} {...cardDetails} onPress={() => this.props.changeCheckInOut(this.state.d.getToday(), id, 'checkOut')} isMorning={false}/>
                  else return
                })
                : <Text style={styles.text}>No one was checked in today.</Text>
              }
            </ScrollView>
        </View>
          : <Text style={styles.text}>Attendance was not taken today.</Text>
        }
        </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({attendance:state.attendance})
const mapDispatchToProps = dispatch => bindActionCreators({getAttendance, changeCheckInOut}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)