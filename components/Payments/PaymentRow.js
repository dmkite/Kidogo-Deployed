import React from 'react'
import {View, Text} from 'react-native'
import{Icon} from 'react-native-elements'
import {styles} from './styles'

export default function PaymentRow(props){
  return(
    <View>
      <View style={styles.paymentRow}>
        <Text style={[styles.textRow, {flex:0.2, marginLeft:10}]}>{props.date.slice(0,5)}</Text>
        <Text style={[styles.textRow, {textAlign:'center', flex:0.3 }]}>
          {Number(props.balanceBefore > Number(props.balanceAfter))
            ? `- K${props.amount}`
            : `K${props.amount}`
          }
        </Text>
        <View style={[styles.textRow, {flex:0.5, flexDirection:'row'}]}>
          <Text style={[styles.textRow, {flex:0.4}] }>K{props.balanceBefore}</Text>
          <Icon name="arrow-forward" color='#ffffff80' style={{flex:0.2}}/>
          <Text style={[styles.textRow, {textAlign:'right', marginRight:10, flex:0.4 }]}>K{props.balanceAfter}</Text>
        </View>
      </View>
      <View style={{height:1, marginVertical:10, backgroundColor:'#ffffff80'}}></View>
    </View>
  )
}


// <View>
//   <View style={styles.paymentRow}>
//     <View style={styles.iconHolder}>
//       {props.balanceBefore > props.balanceAfter
//         ? <View style={[styles.entryIcon, { backgroundColor: '#264' }]}>
//           <Icon name="add-circle" color='white' />
//         </View>
//         : <View style={[styles.entryIcon, { backgroundColor: '#624' }]}>
//           <Icon name='remove-circle' color='white' />
//         </View>
//       }
//     </View>
//     <Text style={[styles.textRow, { flex: .25 }]}>{props.date}</Text>
//     <Text style={styles.textRow}>K {props.balanceBefore}</Text>
//     <Text style={[styles.textRow, { textAlign: 'center' }]}>K {props.amount}</Text>
//     <Text style={[styles.textRow, { textAlign: 'right', marginRight: 10 }]}>K {props.balanceAfter}</Text>
//   </View>
//   <View style={{ height: 1, marginVertical: 10, backgroundColor: '#ffffff80' }}></View>
// </View>