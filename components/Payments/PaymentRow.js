import React from 'react'
import {View, Text} from 'react-native'
import{Icon} from 'react-native-elements'
import {styles} from './styles'

export default function PaymentRow(props){
  return(
    <View style={[styles.paymentRow, props.even ? {backgroundColor:'#00000050'} : null]}>
      <View style={styles.iconHolder}>
        {props.balanceBefore > props.balanceAfter 
          ? <View style={[styles.entryIcon, {backgroundColor:'green'}]}>
            <Icon name="add-circle" color='white' />
          </View>
          : <View style={[styles.entryIcon, { backgroundColor: 'red'}]}>
            <Icon name='remove-circle' color='white'/>
          </View>
          }
      </View>
      <Text style={[styles.textRow, {flex:.25}]}>{props.date}</Text>
      <Text style={styles.textRow }>K {props.balanceBefore}</Text>
      <Text style={[styles.textRow, {textAlign:'center' }]}>K {props.amount}</Text>
      <Text style={[styles.textRow, {textAlign:'right', marginRight:10 }]}>K {props.balanceAfter}</Text>
    </View>
  )
}