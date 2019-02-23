import React from 'react'
import {View, Text} from 'react-native'
import{Icon} from 'react-native-elements'
import {styles} from './styles'

export default function FinanceHistoryRow(props){
  const matchToIcon = {
    rent: 'home',
    electricity: 'bolt',
    fuel: 'fire',
    food: 'spoon',
    water: 'tint',
    salary: 'money'
  }
  
  return(
    <View>
      <View style={styles.financeRow}>
        <View style={styles.iconHolder}>
          <Icon name={matchToIcon[props.memo]} type="font-awesome" size={30} color='#ffffff80'/>
        </View>
        <Text style={styles.tableRow}>{props.date}</Text>
        <Text style={[styles.tableRow, { textAlign:'center' }]}>{props.memo}</Text>
        <Text style={[styles.tableRow, {textAlign:'right', marginRight:10 }]}>K {props.amount}</Text>
      </View>
      <View style={{height:1, backgroundColor:'#ffffff80'}}></View>
    </View>
  )
}
