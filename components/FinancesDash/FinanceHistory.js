import React from 'react'
import {View, Text} from 'react-native'
import {styles} from './styles'
import FinanceHistoryRow from './FinanceHistoryRow'

export default function FinancesHistory(props){
  return (
    <View style={{marginTop:50}}>
      <View style={styles.tableHeader}>
        <View style={[styles.tableRow, { flex: .19 }]}></View>
        <Text style={[styles.tableRow, { fontWeight: 'bold' }]}>Date</Text>
        <Text style={[styles.tableRow, {textAlign:'center', fontWeight: 'bold' }]}>type</Text>
        <Text style={[styles.tableRow, {textAlign: 'right', marginRight:10, fontWeight: 'bold' }]}>Amount</Text>
      </View>
      {!props.history
        ? <Text style={{ fontSize: 18 }}>You do not have any finance history</Text>
        : Object.keys(props.history).sort(byDate).map(date => {
          return props.history[date].map((exp, i) => <FinanceHistoryRow key={i}  {...exp} date={date} />)
        })
      }
    </View>
  )
}

function byDate(a, b) {
  if (!a || !b) return
  const [d1, m1, y1] = a.split('-')
  const [d2, m2, y2] = b.split('-')
  if (Number(y1) > Number(y2)) return -1
  else if (Number(y2) > Number(y1)) return 1

  if (Number(m1) > Number(m2)) return -1
  else if (Number(m2) > Number(m1)) return 1

  if (Number(d1) > Number(d2)) return -1
  else if (Number(d2) > Number(d1)) return 1

  return 0
}
