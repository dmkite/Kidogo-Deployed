import React, {Component} from 'react'
import {Picker, View, Text} from 'react-native'
import {FormLabel, FormInput, Button} from 'react-native-elements'
import {styles} from './styles'

class Child extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
        <View style = {{ flex:1}}>

          <FormLabel>First Name:</FormLabel>
          <FormInput placeholder="John" />
          <FormLabel>Surname:</FormLabel>
          <FormInput placeholder="Mwangi" />
          <Button large title="Submit" />
        </View >
      
    )
  }
}

export default Child