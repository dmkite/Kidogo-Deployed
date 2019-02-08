import React from 'react'
import {View, Text} from 'react-native'
import{Icon} from 'react-native-elements'
import {styles} from './styles'

export default function PaymentRow(props){
  return(
    <View style={[styles.paymentRow, props.even ? {backgroundColor:'#efefef'} : null]}>
      {console.log(props.even)}
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
      <Text style={{lineHeight:50, flex:.25}}>{props.date}</Text>
      <Text style={{ lineHeight: 50, flex: .2 }}>K {props.balanceBefore}</Text>
      <Text style={{ lineHeight: 50, flex: .2, textAlign:'center' }}>K {props.amount}</Text>
      <Text style={{ lineHeight: 50, flex: .2, textAlign:'right', marginRight:10 }}>K {props.balanceAfter}</Text>
    </View>
  )
}