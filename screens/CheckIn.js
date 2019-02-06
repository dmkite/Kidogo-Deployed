import React, { Component } from 'react'
import { Text, View, ScrollView, AsyncStorage } from 'react-native'
import Header from '../components/Header'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {AttendanceCard} from '../components/AttendanceCard'

class CheckIn extends Component{
  constructor(props){
    super(props)
    this.state = {
      attendance: []
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
    const attendance = this.state.map(child => {
      if(child.id === id) child.isPresent = !child.isPresent
      return child
    })
    this.setState({attendance})

  }

  numberPresent = () => {
    return this.state.attendance.reduce((acc, child) => {
      if(child.isPresent) acc++
      return acc
    }, 0)
  }

  componentDidMount = async () => {
    // let accounts = await AsyncStorage.getItem('_ACCOUNTS')
    // accounts = JSON.parse(accounts)
    // accounts
    const accounts = this.props.accounts.accounts.reduce((acc, acct) => {
      acct.children.forEach(child => {
        child.acctId = acct.id
        child.isPresent = true
        delete child.notes 
        delete child.gender
        delete child.birthday
      })
      acc = acc.concat(acct.children)
      return acc
    }, [])
    this.setState({accounts})
  }

  render(){
    return (
      <View style={{flex:1}}>
        {console.log(this.props.accounts)}
        <Header navigation={this.props.navigation}/>
        { this.numberPresent() === this.state.attendance.length 
          ? <Text>Everyone is here today</Text>
          : <Text>{this.numberPresent()} {this.numberPresent() !== 1 ? 'Children are' : 'Child is'} here today</Text>

        }
        <ScrollView>
          {
            this.state.attendance.map((child, i) => {
              return <AttendanceCard key={i} {...child} onPress={() => this.changeAttendance(child.id)}/>
            })
          }
        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = state => ({accounts:state})

export default connect(mapStateToProps)(CheckIn)