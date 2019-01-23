import React from 'react'
import { TextInput, View, Text } from 'react-native'
import {styles} from './styles'

function InputText(props){
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{props.label}:</Text>
      <TextInput style={styles.input} onChangeText={(text) => props.handleChangeText(text)}/>
    </View>
  )
}

export default InputText