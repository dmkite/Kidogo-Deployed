import React, {Component} from 'react'
import {View, ScrollView, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import axios from 'axios'
import {LinearGradient} from 'expo'
import Header from '../components/Header'


class Upload extends Component{
  constructor(props){
    super(props)
    this.state={
      avoidView: 0
    }
  }
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  addMargin = (num) => this.setState({ avoidView: num })

  render(){
    return (
      <LinearGradient
        style={[{ flex: 1 }, this.state.avoidView ? { marginTop: Number(this.state.avoidView) } : null]}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation} />
        <Text>Upload</Text>
      </LinearGradient>
      )
  }
}

export default Upload