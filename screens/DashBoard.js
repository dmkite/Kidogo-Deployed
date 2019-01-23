import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
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
        <ScrollView>
          <DashView navigation={this.props.navigation}/>
          <ActionButtons navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    )
  }
}

export default DashBoard