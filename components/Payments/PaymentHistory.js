import React from 'react'
import { View, Text, TextInput } from 'react-native'
import PaymentRow from './PaymentRow'
import {styles} from './styles'

export default function PaymentHistory(props) {
  return (
    <View>
      <View style={styles.tableHeader}>
        <View style={{ flex:.15, color:'#ffffff80' }}></View>
        <Text style={{ flex: .25, color: '#ffffff80', fontWeight:'bold' }}>Date</Text>
        <Text style={{ flex: .2, color: '#ffffff80', fontWeight: 'bold' }}>Before</Text>
        <Text style={{ flex: .2, color: '#ffffff80', textAlign: 'center', fontWeight: 'bold' }}>Amount</Text>
        <Text style={{ flex: .2, color: '#ffffff80', textAlign: 'right', fontWeight: 'bold', marginRight:10 }}>After</Text>
      </View>
      {!props.paymentHistory
        ? <Text style={{ fontSize: 18, color:'#ffffff80' }}>This account has not made any payments</Text>
        : <View>
          {props.paymentHistory.sort(byDate).map((ele, i) => <PaymentRow key={i} {...ele} even={(i + 1) % 2 === 0}/>)}
        </View>
      }
    </View>
  )
}

function byDate(a,b){
  if(!a || !b) return
  const [d1, m1, y1] = a.date.split('-')
  const [d2, m2, y2] = b.date.split('-')
  if(Number(y1) > Number(y2)) return -1
  else if(Number(y2) > Number(y1)) return 1

  if(Number(m1) > Number(m2)) return -1
  else if(Number(m2) > Number(m1)) return 1
  
  if(Number(d1) > Number(d2))  return -1
  else if(Number(d2) > Number(d1)) return 1
  
  const aAdding = a.balanceBefore > a.balanceAfter
  const bAdding = b.balanceBefore > b.balanceAfter
  
  if(aAdding && bAdding){
    if (a.balanceAfter > b.balanceAfter) return 1
    if (b.balanceAfter > a.balanceAfter) return -1
  }

  if (aAdding && !bAdding) {
    if (b.balanceAfter >= a.balanceBefore) return -1
    if (a.balanceBefore >= b.balanceAfter) return 1
  }

  if( !aAdding && bAdding){
    if(a.balanceAfter >= b.balanceBefore) return 1
    if(b.balanceBefore >= a.balanceAfter) return -1
  }
  return 0
}
