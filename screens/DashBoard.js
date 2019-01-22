import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import Header from '../components/Header'
class DashBoard extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Header/>
        <Text>This is the dashboard</Text>
      </View>
    )
  }
}

export default DashBoard