import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {styles} from '../Signup/styles'
import setAsync from '../../utilities/setAsync'

export default function Modal(props){
  return (<View style={styles.modal}>
    <Text style={styles.h2}>Your device has the following records:</Text>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.title}>Accounts:</Text>
      <Text style={styles.content}>{props.dif.local.accounts} Records</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.title}>Finances:</Text>
      <Text style={styles.content}>{props.dif.local.finances} Records</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.title}>Daily Questions:</Text>
      <Text style={styles.content}>{props.dif.local.questions} Records</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.title}>Attendance:</Text>
      <Text style={styles.content}>{props.dif.local.attendance} Records</Text>
    </View>

    <Text style={[styles.h2, {marginTop:20}]}>Do you want to replace it with the following?</Text>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.title}>Accounts:</Text>
      <Text style={styles.content}>{props.dif.server.accounts} Records</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.title}>Finances:</Text>
      <Text style={styles.content}>{props.dif.server.finances} Records</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.title}>Daily Questions:</Text>
      <Text style={styles.content}>{props.dif.server.questions} Records</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.title}>Attendance:</Text>
      <Text style={styles.content}>{props.dif.server.attendance} Records</Text>
    </View>

    <View style={{ margin: 10, marginTop: 20, flexDirection: 'row' }}>

      <TouchableOpacity style={[styles.button, { flex: 0.5, marginRight: 5 }]} onPress={() => props.handleChangeText(false, 'showDif')}>
        <Text style={styles.btnText}>Cancel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { flex: 0.5, marginLeft: 5 }]} onPress={() => Promise.all([props.changeLoading(), setAsync(props.newData, props.handleChangeText, props.changeLoading), props.handleChangeText(false, 'showDif')])}>
        <Text style={styles.btnText}>Replace</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}