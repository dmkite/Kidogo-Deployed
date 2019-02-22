import React from 'react'
import { View, Text } from 'react-native'
import PaymentRow from './PaymentRow'
import {styles} from './styles'

export default function PaymentHistory(props) {
  return (
    <View>
      <Text style={styles.h1}>Payment History</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.headerRow, {marginLeft:10, flex:0.2}]}>Date</Text>
        <Text style={[styles.headerRow, {textAlign:'center'}]}>Amount</Text>
        <Text style={[styles.headerRow, {flex:0.5}]}>Balance</Text>
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
    if(a.balanceAfter >= b.balanceBefore) return 1
    if(b.balanceBefore >= a.balanceAfter) return -1
  }
  if( !aAdding && bAdding){
    if(a.balanceAfter >= b.balanceBefore) return 1
    if(b.balanceBefore >= a.balanceAfter) return -1
  }
  if(!aAdding && !bAdding){
    if(a.balanceAfter >= b.balanceBefore) return -1
    if(b.balanceBefore >= a.balanceAfter) return 1
  }
  return 0
}
