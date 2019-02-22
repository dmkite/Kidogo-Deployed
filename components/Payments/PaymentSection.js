import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {styles} from '../FinancesDash/styles'
import Dates from '../../utilities/dates'
import numberValidation from '../../utilities/numberValidation'

class PaymentSection extends Component{
  constructor(props){
    super(props)
    this.state={
      amount: null,
      focusedOn: null,
      openPayments: false,
      d: new Dates()
    }
  }

  handleNumberChange = (text, field, num1, num2) => {
    let length = 0
    if (this.state[field] && this.state[field].length) length = this.state[field].length
    this.setState({
      [field]: numberValidation(text, field, length, num1, num2)
    })
  }

  changeFocus = (action, type) => {
    if (action === 'focus') this.setState({ focusedOn: type })
    else this.setState({ focusedOn: null })
  }

  openPayments = () => this.setState({openPayments: !this.state.openPayments})

  render(){
    return (
      <View style={{marginBotom:50}}>
        <Text style={{fontSize:24, margin:10, color:'#ffffff80'}}>Balance: K{this.props.balance}</Text>
      
        {this.state.openPayments
          ? <View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.prefix, this.state.focusedOn === 'rate' ? styles.focused : null]}>K</Text>
                    <TextInput
                      style={[styles.input, { flex: .8, marginLeft: 0 }]}
                      keyboardType="number-pad"
                      value={this.state.amount}
                      onChangeText={(text) => this.handleNumberChange(text, 'amount')}
                      onFocus={() => {
                        this.changeFocus('focus', 'amount')
                        this.props.addMargin(-75)
                      }}
                      onBlur={() => {
                        this.changeFocus('blur', null)
                        this.props.addMargin(0)
                      }} />
                  </View>

                  <Text style={[styles.label, this.state.focusedOn === 'amount' ? styles.focused : null]}>Amount</Text>
                </View>

                <View style={{ flex: 0.5, marginLeft: 5 }}>
                  <TextInput
                    style={[styles.input, styles.dateInput]}
                    maxLength={10}
                    keyboardType="number-pad"
                    value={this.state.d.getToday()}
                    onChangeText={(text) => this.handleNumberChange(text, 'date', 2, 5)}
                    onFocus={() => {
                      this.changeFocus('focus', 'date')
                      this.props.addMargin(-75)
                    }}
                    onBlur={() => {
                      this.changeFocus('blur', null)
                      this.props.addMargin(0)
                    }} />
                  <Text style={[styles.label, this.state.focusedOn === 'date' ? styles.focused : null]}>Date</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.button} onPress={this.openPayments}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={() => {
                return Number(this.state.amount) > 0
                  ? Promise.all([this.setState({ amount: null }), this.props.makePayment(this.props.id, this.state.amount, this.props.balance, this.state.d.getToday()), this.openPayments()])
                  : null}}>
                <Text style={styles.btnText}>Make Payment</Text>
              </TouchableOpacity>

            </View> 
          : <TouchableOpacity style={styles.button} onPress={this.openPayments}>
              <Text style={styles.btnText}>Make Payment</Text>
            </TouchableOpacity>
        }    
      </View>
    )
  }
}

export default PaymentSection