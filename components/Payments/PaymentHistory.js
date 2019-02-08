import React from 'react'
import { View, Text, TextInput } from 'react-native'
import PaymentRow from './PaymentRow'
import {styles} from './styles'

export default function PaymentHistory(props) {
  return (
    <View>
      <View style={styles.tableHeader}>
        <View style={{flex:.15}}></View>
        <Text style={{flex:.25, fontWeight:'bold'}}>Date</Text>
        <Text style={{ flex: .2, fontWeight: 'bold' }}>Before</Text>
        <Text style={{ flex: .2, textAlign: 'center', fontWeight: 'bold' }}>Payment</Text>
        <Text style={{ flex: .2, textAlign: 'right', fontWeight: 'bold', marginRight:10 }}>After</Text>
      </View>
      {console.log(props.paymentHistory)}
      {!props.paymentHistory
        ? <Text style={{ fontSize: 18 }}>This account has not made any payments</Text>
        : <View>
          
          {props.paymentHistory.reverse().map((ele, i) => <PaymentRow key={i} {...ele} even={(i + 1) % 2 === 0}/>)}
        </View>
      }
    </View>
  )
}