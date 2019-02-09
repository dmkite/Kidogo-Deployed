import React, {Component} from 'react'
import {View, TextInput, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {styles as pStyles} from '../Payments/pStyles'

class EnterFinances extends Components {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <View>
        <Text style={pStyles.balance}>K {this.props.balance}</Text>
        <View style={pStyles.inputHolder}>
          <Text style={pStyles.prefix}>K</Text>
          <TextInput
            style={[pStyles.input, pStyles.amountInput, { borderLeftWidth: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
            keyboardType="number-pad"
            placeholder='amount'
            value={this.state.amount}
            onChangeText={(text) => this.numberValidation(text, 'amount')}
          />
          <TextInput
            style={[pStyles.input, pStyles.dateInput]}
            maxLength={10}
            keyboardType="number-pad"
            placeholder="DD-MM-YYYY"
            value={this.state.date}
            onChangeText={(text) => this.numberValidation(text, 'date', 2, 5)}
          />
        </View>

        <TouchableOpacity style={pStyles.submit} onPress={() => {
          return Number(this.state.amount) > 0
            ? Promise.all([this.setState({ amount: null }), this.props.makePayment(this.props.id, this.state.amount, this.props.balance, this.state.date)])
            : null
        }}>
          <Text style={pStyles.btnText}>Make Payment</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default EnterFinances