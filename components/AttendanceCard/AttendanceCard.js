import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {styles} from './styles'

export default function AttendanceCard(props){
  return (
    <TouchableOpacity style={styles.attendanceCard}>
      {props.checkIn
        ? <View style={styles.present}>
            <Icon name="check-circle-outline" color="white"/>
        </View>
        : null
      }
      <Image 
        source={{uri:props.img_uri}}
        style={styles.img}
        />
      <Text style={styles.text}>{props.f_name} {props.l_name || ' '}</Text>
    </TouchableOpacity>
  )
}