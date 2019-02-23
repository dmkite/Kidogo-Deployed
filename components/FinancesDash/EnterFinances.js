import React, {Component} from 'react'
import {View, TextInput, Text, TouchableOpacity, Picker} from 'react-native'
import Dates from '../../utilities/dates';
import {styles} from './styles'
import numberValidation from '../../utilities/numberValidation'

class EnterFinances extends Component {
  constructor(props){
    super(props)
    this.state = {
      date: new Dates().getToday(),
      amount:'0',
      memo: 'rent',
      focusedOn: null
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

  handleChangeText = (text, field) => this.setState({ [field]: text })

  render(){
    return (
      <View>
        <View style={[styles.input, { height: 30, paddingLeft: 0 }]}>
          <Picker
            selectedValue={this.state.memo}
            style={{height:30, color:'white'}}
            onValueChange={(itemValue, itemIndex) => this.setState({memo: itemValue})}>
            <Picker.Item label="Kodi ya Nyumba" value="rent"/>
            <Picker.Item label="Maji" value="water" />
            <Picker.Item label="Chakula" value="food" />
            <Picker.Item label="Mafuta anayotumia" value="fuel" />
            <Picker.Item label="Umeme" value="electricity" />
            <Picker.Item label="Mushahara" value="salary" />
          </Picker>
        </View>
        <Text style={styles.label}>Expense</Text>
        <View style={{flexDirection:'row'}}>
          <View style={{ flex:0.5 }}>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.prefix, this.state.focusedOn === 'rate' ? styles.focused : null]}>K</Text>
              <TextInput
                style={[styles.input, { flex: .8, marginLeft: 0 }]}
                keyboardType="number-pad"
                value={this.state.amount}
                onChangeText={(text) => this.handleNumberChange(text, 'amount')}
                onFocus={() => {
                  this.changeFocus('focus', 'amount')
                  this.props.addMargin(-225)
                }}
                onBlur={() => {
                  this.changeFocus('blur', null)
                  this.props.addMargin(0)
                }} />
            </View>
            <Text style={[styles.label, this.state.focusedOn === 'amount' ? styles.focused : null]}>Amount</Text>
          </View>

          <View style={{flex:0.5, marginLeft:5}}>
            <TextInput
              style={[styles.input, styles.dateInput]}
              maxLength={10}
              keyboardType="number-pad"
              value={this.state.date}
              onChangeText={(text) => this.handleNumberChange(text, 'date', 2, 5)}
              onFocus={() => {
                this.changeFocus('focus', 'date')
                this.props.addMargin(-225)
              }}
              onBlur={() => {
                this.changeFocus('blur', null)
                this.props.addMargin(0)
              }} />
            <Text style={[styles.label, this.state.focusedOn === 'date' ? styles.focused : null]}>Date</Text>
          </View>
        </View>
        
        <View style={{margin:10, flexDirection:'row'}}>
          <TouchableOpacity style={[styles.button, {flex:0.5, marginRight:5}]} onPress={this.props.changeView}>
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
          {Number(this.state.amount) > 0
            ? <TouchableOpacity style={[styles.button, { flex: 0.5, marginLeft: 5 }]} onPress={ () => this.props.addExpense({
                    date: this.state.date,
                    amount: this.state.amount,
                    memo: this.state.memo
              })}>
                <Text style={styles.btnText}>Add Expense</Text>
              </TouchableOpacity>
            : null                
            }
        </View>     
      </View>
    )
  }
}

export default EnterFinances