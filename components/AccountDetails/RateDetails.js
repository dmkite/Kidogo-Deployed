import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, Picker} from 'react-native'
import {styles} from './styles'
import {Icon} from 'react-native-elements'
import {Rate} from '../Forms'
import {styles as fStyles} from '../Forms/newStyles'
import numberValidation from '../../utilities/numberValidation'

export default class RateDetails extends Component{
  constructor(props) {
    super(props)
    this.state={
      frequency: this.props.frequency,
      rate: this.props.rate,
      focusedOn: null,
      newFrequency: 'daily',
      newRate:'100',
      newBalance: null
    }
  }


  changeFocus = (action, type) => {
    if (action === 'focus') this.setState({ focusedOn: type })
    else this.setState({ focusedOn: null })
  }

  handleNumberChange = (text, field, num1, num2) => {
    let length = 0
    if (this.state[field] && this.state[field].length) length = this.state[field].length
    this.setState({
      [field]: numberValidation(text, field, length, num1, num2)
    })
  }


  render(){
    return (
      <View>
        <View style={styles.balanceDisplay}>
          {this.props.currentForm === 'balance'
            ? <View style={{flex:1}}>
                <View style={styles.balanceEdit}>
                  <Text style={styles.balance}>K</Text>
                  <TextInput 
                    style={[styles.balance, styles.balanceInput]} 
                    autofocus={true} 
                    keyboardType="number-pad" 
                    onChangeText={(text) => this.handleNumberChange(text, 'newBalance')} 
                    placeholder={String(this.props.balance)}
                  />
  
                </View>
                
                <View style={styles.buttonBlock}>
                  
                  <TouchableOpacity style={[styles.rateBtn, { marginRight: 5 }]}>
                    <Text style={styles.btnText} onPress={() => {
                      this.props.changeField('balance', this.state.newBalance)
                      this.props.openForm('balance')  
                    }}>Change</Text>
                  </TouchableOpacity>
  
                  <TouchableOpacity style={[styles.rateBtn, { marginLeft: 5 }]}>
                    <Text style={styles.btnText} onPress={() => this.props.openForm('balance')}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            : <Text style={styles.balance}> K {this.props.balance}</Text>
          }
  
          <TouchableOpacity style={styles.editBtn} onPress={() => this.props.openForm('balance')}>
            <Icon name="edit" size={24} color='#624'/>
          </TouchableOpacity>
  
        </View>
          {this.props.currentForm === 'rate'
            ? <View>
                <View style={fStyles.nameHolder}>
                  <View style={{ flex: .5, marginRight: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                    <Text style={[fStyles.prefix, this.state.focusedOn === 'rate' ? styles.focused : null]}>K</Text>
                      <TextInput
                        style={[fStyles.input, { flex: .8, marginLeft: 0 }]}
                        keyboardType="number-pad"
                        value={this.state.newRate}
                        onChangeText={(text) => this.handleNumberChange(text, 'newRate')}
                        onFocus={() => {
                          this.changeFocus('focus', 'rate')
                        }}
                        onBlur={() => {
                          this.changeFocus('blur', null)
                        }} />
                    </View>
                  <Text style={[fStyles.label, this.state.focusedOn === 'rate' ? styles.focused : null]}>Rate</Text>
                  </View>
                  <View style={{ flex: .5, marginLeft: 5 }}>
                  <View style={[fStyles.input, { height: 30, paddingLeft: 0 }]}>
                      <Picker
                        style={{ color: 'white', marginTop: -10 }}
                        selectedValue={this.state.newFrequency}
                        onValueChange={(itemValue, itemIndex) => this.setState({ newFrequency: itemValue })}>
                        <Picker.Item label="daily" value="daily" />
                        <Picker.Item label="weekly" value="weekly" />
                        <Picker.Item label="termly" value="termly" />
                      </Picker>
                    </View>
                <Text style={fStyles.label}>frequency</Text>
                  </View>
                </View>

                <View style={styles.buttonBlock}>
              
                <TouchableOpacity style={[styles.rateBtn, { marginRight: 5 }]}>
                  <Text style={styles.btnText} onPress={() => {
                    this.props.changeField('rate', this.state.newRate, 'frequency', this.state.newFrequency)
                    this.props.openForm('rate')
                    }}>Change</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={[styles.rateBtn, { marginLeft: 5 }]}>
                  <Text style={styles.btnText} onPress={() => this.props.openForm('rate')}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          : <Text style={styles.rateFreq}>This account pays K{this.props.rate} {this.props.frequency}</Text>
          }
        {this.props.currentForm === 'rate' 
          ? null
        : <View style={styles.buttonBlock}>
          <TouchableOpacity style={[styles.rateBtn, {marginRight:5}]} onPress={() => this.props.navigation.navigate('Payments', {id:this.props.acctId})}>
            <Text style={styles.btnText}>Make Payment</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={[styles.rateBtn, { marginLeft: 5 }]} onPress={() => this.props.openForm('rate')}>
            <Text style={styles.btnText}>Change Rate</Text>
          </TouchableOpacity>
        </View>
        }
        
      </View>
    )

  }
}