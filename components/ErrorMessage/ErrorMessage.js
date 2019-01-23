import React from 'react'
import {View, Text} from 'react-native'
import {styles} from './styles'
import {Icon} from 'react-native-elements'

export default function ErrorMessage(props){
  return (
    <View style={styles.error}>
      <Icon name="error-outline" color="#c10000" size={50}/>
      <Text style={styles.errorMessage}>{props.error}</Text>
    </View>
  )
}