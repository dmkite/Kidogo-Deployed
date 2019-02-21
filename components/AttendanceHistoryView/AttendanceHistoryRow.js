import React from 'react'
import {View, Text, Image} from 'react-native'
import {styles} from './styles'
import{styles as cardStyles} from '../AccountCard/styles'

export default function AttendanceHistoryRow(props){
  return (
    <View>
      
    <View style={styles.attendanceRow}>
      <View style={[styles.child]}>
        {props.img_uri
          ? <View style={{width:70, height:70, borderRadius:35, zIndex:100, overflow:'hidden'}}>
            <Image
              source={{ uri: props.img_uri }}
              style={{
                flex: 1,
                width: 70,
                height: null,
                resizeMode: 'cover',
                
              }}
            />
          </View>
          : <Text style={[cardStyles.circle, { backgroundColor: '#ccc', marginRight: 10, marginTop: 0, marginLeft: 0, borderWidth:0}]}>{props.f_name[0].toUpperCase()}</Text>}
        <Text numberOfLines={1} style={styles.name}>{props.f_name} {props.l_name}</Text>
      </View>
      {props.attendanceStatus.map((date, i) => {
        return <View key={i} style={styles.dateStatusHolder}>
          <View style={[styles.dateStatus, date ? { backgroundColor:'#007C47'} : {backgroundColor:'white', opacity:0.5}]}></View>
        </View>
      })}
    </View>
    </View>
  )
}