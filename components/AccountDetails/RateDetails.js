import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {styles} from './styles'

export default function RateDetails(props) {
  return (
    <View>
      <Text style={styles.balance}> K {props.balance}</Text>
      <Text style={styles.rateFreq}>K {props.rate} {props.frequency}</Text>
      <View style={styles.buttonBlock}>
        <TouchableOpacity style={styles.rateBtn}>
          <Text style={{color:'white'}}>Make Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.rateBtn}>
          <Text style={{ color: 'white' }}>Change Rate</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}