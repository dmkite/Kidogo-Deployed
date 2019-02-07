import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AttendanceCard from '../components/AttendanceCard'
import { styles } from '../components/AttendanceCard/styles'
import { getAttendance, changeCheckIn } from '../actions/attendance'

class CheckOut extends Component {
  constructor(props) {
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
      let childArrived = this.props.attendance[today][id].checkIn
      if(childArrived) acc.total++ 
      let childLeft = this.props.attendance[today][id].checkOut
      if (childArrived && !childLeft) acc.remaining++
      return acc
    }, {total:0, remaining:0})
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header navigation={this.props.navigation} />
        <Text>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.state.date.getDay()] + ', ' +
            this.state.date.getDate() + ', ' +
            ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.state.date.getMonth()] + ' ' +
            this.state.date.getFullYear()}
        </Text>
        <Text>
          {this.childrenHere().total === this.childrenHere().remaining ? 'No children have left' : this.childrenHere().remaining === 1 ? '1 child is still here' : this.childrenHere().remaining + ' children are still here'
          }
        </Text>
        </View>
    )
  }
}

const mapStateToProps = state => ({attendance:state.attendance})
const mapDispatchToProps = dispatch => bindActionCreators({getAttendance}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)