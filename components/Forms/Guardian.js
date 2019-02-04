import React, {Component} from 'react'
import { TextInput, View, Text } from 'react-native'
import {Icon} from 'react-native-elements'
import {styles} from './styles'
import { HitTestResultTypes } from 'expo/build/AR';

class Guardian extends Component{
  constructor(props){
    super(props)
    this.state = {
      phone: null,
      govt_id: null
    }
  }

  handlePhoneNumber = (text) => {
    if(text.length){
      const charCode = text[text.length - 1].charCodeAt(0)
      if (charCode < 48 || charCode > 57) text = text.slice(0, (text.length - 1))
      if (text.length === 2 || text.length === 6) text += '-'
      this.setState({
        phone: text
      })
    }
  }

  handleId = (text, num1, num2) => {
    const charCode = text[text.length - 1].charCodeAt(0)
    if (charCode < 48 || charCode > 57) text = text.slice(0, (text.length - 1))
    if (text.length === num1 || text.length === num2) text += '-'
    this.setState({
      date: text
    })
  }

  render(){
    return (
      <View style={{ flex: 1 }} >
        <Text style={styles.h1}>Guardian</Text>
        <Text style={styles.label}>First Name:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Mary" 
          onChangeText={(text) => this.props.handleChangeText(text, 'guardians', 'f_name')} 
        />

        <Text style={styles.label}>Surname:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mwangi" 
          onChangeText={(text) => this.props.handleChangeText(text, 'guardians', 'l_name')} 
        />

        <Text style={styles.label}>Address:</Text>   
        <TextInput 
          style={styles.input}
          placeholder="123 Kenyata Avenue"
          onChangeText={(text) => this.props.handleChangeText(text, 'guardians', 'address_1')}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input} 
          placeholder="Nairobi"
          onChangetext={(text) => this.props.handleChangeText(text, 'guardians', 'city')}
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="##-###-####"
          value={this.state.phone}
          maxLength={11}
          onChangeText={(text) => {
            this.handlePhoneNumber(text)
            this.props.handleChangeText(text, 'guardians', 'phone')
          }}
        />

        <Text style={styles.label}>Government Id</Text>
        <TextInput
          style={styles.input}
          placeholder="###-##-####"
          onChangeText={(text) => {
            this.handleId(text, 3, 6)
            this.props.handleChangeText(text, 'guardians', 'govt_id')}}
        />
      </View > 
    )
  }
}

export default Guardian