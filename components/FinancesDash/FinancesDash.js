import React from 'react'
import {View, Text} from 'react-native'
import {styles} from './styles'
import { connect } from 'react-redux';

function FinancesDash(props){
  return (
    <View>
      <Text style={styles.net}>{
        Number(props.finances.net.income) > Number(props.finances.net.expenses)
          ? 'You earned ' + String(Number(props.finances.net.income) - Number(props.finances.net.expenses)) + ' Shillings this week!'
          : 'You lost ' + String(-(Number(props.finances.net.income) - Number(props.finances.net.expenses))) + ' Shillings this week'
      }</Text>
      <View style={styles.dash}>
        <View style={styles.expenses}>
          <Text style={[styles.dashText, { color: 'red' }]}>K{props.finances.net.expenses}</Text>
          <Text>
            {Number(props.finances.net.expenses) > 0
              ? 'You spent ' + String(props.finances.net.expenses) + ' Shillings to run your daycare this week'
              : 'You didn\'t spend any money this week'
            }
          </Text>
        </View>

        <View style={styles.expenses}>
          <Text style={[styles.dashText, { color: 'green' }]}>K{props.finances.net.income}</Text>
          <Text>
            {Number(props.finances.net.income) > 0
              ? 'You were paid ' + String(props.finances.net.income) + ' Shillings this week'
              : 'You weren\'t paid this week'
            }
          </Text>
        </View>
      </View>

    </View>
  )
}

const mapStateToProps = state => ({finances: state.finances})

export default connect(mapStateToProps)(FinancesDash)