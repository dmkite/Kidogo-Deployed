import React, {Component} from 'react'
import { Text, View, Button, Image, TextInput, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native'
import Header from '../components/Header/'
import {LinearGradient} from 'expo'

export default class Attendance extends Component{
  constructor(props){
    super(props)
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }
  render(){
    return (
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation}/>
        <TouchableOpacity style={{flex:1, borderWidth:2}} onPress={() => this.props.navigation.navigate('CheckIn')}>
          <Text>Check In</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={{ flex: 1, borderWidth: 2 }} onPress={() => this.props.navigation.navigate('CheckOut')}>
          <Text>Check Out</Text>
        </TouchableOpacity>
  
        <TouchableOpacity style={{ flex: 1, borderWidth: 2 }} onPress={() => this.props.navigation.navigate('AttendanceHistory')}>
          <Text>History</Text>
        </TouchableOpacity>
      </LinearGradient>
    )

  }
}