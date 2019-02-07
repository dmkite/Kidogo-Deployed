import React from 'react'
import {View, Text, Image} from 'react-native'
import {styles} from './styles'
import{styles as cardStyles} from '../AccountCard/styles'

export default function AttendanceHistoryRow(props){
  return (
    <View style={[styles.attendanceRow, props.i % 2 === 0 ? styles.evenRow : null]}>
      <View style={styles.child}>
        {props.img_uri
          ? <View style={{width:70, height:70, borderRadius:35, zIndex:100, overflow:'hidden'}}>
            <Image
              source={{ uri: props.img_uri }}
              style={{
                flex: 1,
                width: 70,
                height: null,
                resizeMode: 'cover',
                borderColor: props.i % 2 === 0 ? '#fefefe' : 'white'
              }}
            />
          </View>
          : <Text style={[cardStyles.circle, { backgroundColor: '#ccc', marginRight: 10, marginTop: 0, marginLeft: 0, borderColor: props.i % 2 === 0 ? '#fefefe' : 'white' }]}>{props.f_name[0].toUpperCase()}</Text>}
        <Text style={styles.name}>{props.f_name} {props.l_name}</Text>
        
      </View>
      {props.attendanceStatus.map((date, i) => {
        return <View key={i} style={styles.dateStatusHolder}>
          <View style={[styles.dateStatus, date ? {backgroundColor:'green'} : {backgroundColor:'#ccc'}]}></View>
        </View>
      })}

    </View>
  )
}