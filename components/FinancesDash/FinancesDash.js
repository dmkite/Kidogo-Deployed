import React from 'react'
import {View, Text} from 'react-native'
import {styles} from './styles'
import { connect } from 'react-redux';
import {Icon} from 'react-native-elements'

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
            <View style={{flexDirection:'row'}}>
              <Icon name='arrow-downward' size={24} color='red'/>
              <Text style={[styles.dashText, { color: 'red' }]}>K{props.finances.net.expenses}</Text>
            </View>
          <Text style={styles.subText}>
            {Number(props.finances.net.expenses) > 0
              ? 'You spent ' + String(props.finances.net.expenses) + ' Shillings to run your daycare this week'
              : 'You didn\'t spend any money this week'
            }
          </Text>
        </View>

        <View style={styles.expenses}>
          <View style={{flexDirection:'row'}}>
            <Icon name='arrow-upward' size={24} color='green'/>
            <Text style={[styles.dashText, { color: 'green' }]}>K{props.finances.net.income}</Text>
          </View>
          <Text style={styles.subText }>
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