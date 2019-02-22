import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {styles} from './styles'

export default function AttendanceHistoryView(props){
  if(!props.span.length) return null
  const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
  const date1 = Number(props.span[0].substring(0,2)) + ' ' + months[Number(props.span[0].substring(3,5)) - 1]
  const date2 = Number(props.span[props.span.length - 1].substring(0, 2)) + ' ' + months[Number(props.span[props.span.length - 1].substring(3,5)) - 1]
  return (
    <View style={{ backgroundColor: '#00000090', paddingBottom:10 }}>
      <Text style={[styles.h1, {marginBottom:0}]}>Attendance History</Text>
      <View style={styles.dateHolder}>
        
        <TouchableOpacity onPress={() => props.changeWeeks('back')}>
          <Icon name="chevron-left" size={40} color="white"/>
        </TouchableOpacity>
        <Text style={styles.h2}>{date1} - {date2}</Text>
        <TouchableOpacity 
          onPress={
            props.dateMod < 0
              ? () => props.changeWeeks('forward')
              : null
          }
          style={
            props.dateMod < 0
              ? null
              : {opacity:0.3}
          }
        >
          <Icon name="chevron-right" size={40} color="white"/>
        </TouchableOpacity>
      </View>
      <View style={styles.dates}>
        <View style={{flex:.3}}></View>
        {props.span.map((date, i) => {
          return <View key={i} style={styles.date}>
            <Text style={styles.dateText}>
              {Number(date.substring(0,2)) + '/' + Number(date.substring(3,5))}
            </Text>
          </View>
        })}
      </View>
    </View>
  )
}