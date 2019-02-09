import React from 'react'
import {View, Text} from 'react-native'
import {styles} from './styles'

export default function FinancesDash(props){
  return (
    <View>
      <Text style={styles.net}>{
        Number(props.income) > Number(props.expenses)
          ? 'You earned ' + String(Number(props.income) - Number(props.expenses)) + ' Shillings this week!'
          : 'You lost ' + String(Number(props.income) - Number(props.expenses)) + ' Shillings this week'
      }</Text>
      <View style={styles.dash}>
        <View style={styles.expenses}>
          <Text style={[styles.dashText, {color:'red'}]}>{props.expenses}</Text>
          <Text>
            {Number(props.expenses) > 0
              ? 'You spent ' + String(props.expenses) + ' Shillings to run your daycare this week'
              : 'You didn\'t spend any money this week'
            }
          </Text>
        </View>

        <View style={styles.expenses}>
          <Text style={[styles.dashText, { color: 'green' }]}>{props.income}</Text>
          <Text>
            {Number(props.income) > 0
              ? 'You were paid ' + String(props.income) + ' Shillings this week'
              : 'You were\'nt paid this week'
            }
          </Text>
        </View>
      </View>

    </View>
  )
}