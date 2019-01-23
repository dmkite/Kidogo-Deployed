import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from '../components/Header'
import DashView from '../components/DashView'
import ActionButtons from '../components/ActionButtons'

class DashBoard extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>
        <DashView/>
        <ActionButtons navigation={this.props.navigation}/>
      </View>
    )
  }
}

export default DashBoard