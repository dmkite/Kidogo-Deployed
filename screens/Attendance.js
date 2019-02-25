import React, {Component} from 'react'
import { Text, TouchableOpacity, ImageBackground } from 'react-native'
import Header from '../components/Header/'
import {LinearGradient} from 'expo'
import {styles} from '../components/ActionButtons/styles'

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
        style={[styles.actionContainer, { flex: 1}]}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation}/>
        <TouchableOpacity style={[styles.actionButton, {margin:10, marginBotom:0}]} onPress={() => this.props.navigation.navigate('CheckIn')}>
            <ImageBackground
              style={styles.buttonImage}
              source={require('../assets/CHECKIN.png')}>
            <Text style={[styles.actionText, styles.raleway]}>Check In</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, {margin:10, marginBotom:0}]} onPress={() => this.props.navigation.navigate('CheckOut')}>
            <ImageBackground
              style={styles.buttonImage}
              source={require('../assets/CHECKOUT.png')}>
            <Text style={[styles.actionText, styles.raleway]}>Check Out</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, {margin:10}]} onPress={() => this.props.navigation.navigate('AttendanceHistory')}>
            <ImageBackground
              style={styles.buttonImage}
              source={require('../assets/HISTORY.png')}>
            <Text style={[styles.actionText, styles.raleway]}>History</Text>
          </ImageBackground>
        </TouchableOpacity>
      </LinearGradient>
    )

  }
}