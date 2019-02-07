import React from 'react'
import { Text, View, Button, Image, TextInput, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native'
import Header from '../components/Header/'

export default function Attendance(props){
  return (
    <View style={{flex:1}}>
      <Header navigation={props.navigation}/>
      <TouchableOpacity style={{flex:1, borderWidth:2}} onPress={() => props.navigation.navigate('CheckIn')}>
        <Text>Check In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ flex: 1, borderWidth: 2 }} onPress={() => props.navigation.navigate('CheckOut')}>
        <Text>Check Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ flex: 1, borderWidth: 2 }} onPress={() => props.navigation.navigate('AttendanceHistory')}>
        <Text>History</Text>
      </TouchableOpacity>
    </View>
  )
}