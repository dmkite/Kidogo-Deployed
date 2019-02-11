import React from 'react'
import {View, Text} from 'react-native'
import{Icon} from 'react-native-elements'
import {styles} from './styles'

export default function FinanceHistoryRow(props){
  const matchToIcon = {
    rent: 'home',
    electricity: 'bolt',
    fuel: 'fire',
    food: 'apple',
    water: 'tint',
    salary: 'money'

  }
  return(
    <View style={[styles.financeRow, props.even ? {backgroundColor:'#efefef'} : null]}>
      <View style={styles.iconHolder}>
        <Icon name={matchToIcon[props.memo]} type="font-awesome" size={30}/>
      </View>
      <Text style={{lineHeight:50, flex:.27}}>{props.date}</Text>
      <Text style={{ lineHeight: 50, flex: .27, textAlign:'center' }}>{props.memo}</Text>
      <Text style={{ lineHeight: 50, flex: .27, textAlign:'right', marginRight:10 }}>K {props.amount}</Text>
    </View>
  )
}
