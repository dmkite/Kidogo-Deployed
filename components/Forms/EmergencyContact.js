import React, {Component} from 'react'
import {TextInput, Text, View} from 'react-native'
import {styles} from './styles'

class EmergencyContact extends Component{
  constructor(props){
    super(props)
    this.state = {
      phone: null
    }
  }

  render(){
    return (
      <View style={{flex:1}}>
        <Text style={styles.h1}>Emergency Contact</Text>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Mercy"
          onChangeText={(text) => this.props.handleChangeText(text, 'e_contact', 'f_name')}
        />

        <Text style={styles.label}>Surname:</Text>
        <TextInput
          style={styles.input}
          placeholder="Maina"
          onChangeText={(text) => this.props.handleChangeText(text, 'e_contact', 'l_name')}
        />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="##-###-####"
          value={this.state.phone}
          maxLength={11}
          onChangeText={(text) => {
            this.handlePhoneNumber(text)
            this.props.handleChangeText(text, 'e_contact', 'phone')
          }}
        />

      </View>
    )
  }
}

export default EmergencyContact