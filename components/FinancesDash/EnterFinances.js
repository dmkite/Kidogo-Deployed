import React, {Component} from 'react'
import {View, TextInput, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {styles as pStyles} from '../Payments/styles'
import Dates from '../../utilities/dates';
import numberValidation from '../../utilities/numberValidation'

class EnterFinances extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: new Dates().getToday(),
      amount:null
    }
  }

  render(){
    return (
      <View>
        <View style={pStyles.inputHolder}>
          <Text style={pStyles.prefix}>K</Text>
          <TextInput
            style={[pStyles.input, pStyles.amountInput, { borderLeftWidth: 0, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
            keyboardType="number-pad"
            placeholder='amount'
            value={this.state.amount}
          />

          <TextInput
            style={[pStyles.input, pStyles.dateInput]}
            maxLength={10}
            keyboardType="number-pad"
            placeholder="DD-MM-YYYY"
            value={this.state.date}
          />

        </View>
        <Icon
          name='tint'
          type='font-awesome'
          color='#f50'
        />

        <Icon
          name='home'
          type='font-awesome'
          color='#f50'
        />
        <Icon
          name='utensils'
          type='font-awesome'
          color='#f50'
        />
        <Icon
          name='fire'
          type='font-awesome'
          color='#f50'
        />
        <Icon
          name='bolt'
          type='font-awesome'
          color='#f50'
        />
        <Icon
          name='money-bill'
          type='font-awesome'
          color='#f50'
        />
      
             
      </View>
    )
  }
}

export default EnterFinances