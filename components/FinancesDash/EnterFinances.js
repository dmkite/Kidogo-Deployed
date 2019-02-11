import React, {Component} from 'react'
import {View, TextInput, Text, TouchableOpacity, Picker} from 'react-native'
import {Icon} from 'react-native-elements'
import {styles as pStyles} from '../Payments/styles'
import Dates from '../../utilities/dates';
import {styles} from './styles'


class EnterFinances extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: new Dates().getToday(),
      amount:'',
      memo: 'rent'
    }
  }

  numberValidation = (text, field, num1, num2) => {
    let charCode
    if (text.length > 0) charCode = text[text.length - 1].charCodeAt(0)
    if (text.length > 0 && (charCode < 48 || charCode > 57)) text = text.slice(0, (text.length - 1))
    if (text.length > this.state[field].length) { //checks if deleting, don't add '-'
      if ((num1 && text.length === num1) || (num2 && text.length === num2)) text += '-'
    }

    if (field === 'date' || field === 'birthdate') {
      if (text.length === 1 && Number(text[0]) > 3) text = ''
      if (text.length === 4 && Number(text[3] > 1)) text = text.slice(0, (text.length - 1))
      if (text.length === 7 && Number(text[6] > 2)) text = text.slice(0, (text.length - 1))
    }

    this.setState({[field]: text})
  }

  render(){
    return (
      <View>
        <View style={styles.pickerHolder}>
          <Picker
            selectedValue={this.state.memo}
            style={{height:50}}
            onValueChange={(itemValue, itemIndex) => this.setState({memo: itemValue})}>
            <Picker.Item label="Rent" value="rent"/>
            <Picker.Item label="Water" value="water" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Fuel" value="fuel" />
            <Picker.Item label="Electricity" value="electricity" />
            <Picker.Item label="Salary" value="salary" />
          </Picker>
        </View>
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
        <TouchableOpacity style={styles.button} onPress={
          Number(this.state.amount) > 0
            ? () => this.props.addExpense({...this.state})
            : null          
        }>
          <Text style={styles.buttonText}>Add Expense</Text>
        </TouchableOpacity>
      
             
      </View>
    )
  }
}

export default EnterFinances