import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import numberValidation from '../../utilities/numberValidation'
import {confirm, resend} from '../../utilities/authentication'

export default class Caregiver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focusedOn: null,
      number: [],
    }
    this._2 = React.createRef()
    this._3 = React.createRef()
    this._4 = React.createRef()
    this._5 = React.createRef()
    this._6 = React.createRef()
  }

  handleNumberChange = (text, num) => {
    text = numberValidation(text)
    this.state.number[num - 1] = text
    if(text.length === 1 && num !== 6){
      this['_' + (num + 1)].current.focus()
    }
  }

  render(){
    return (
      <View>
        <Text style={{margin:10, color:'#ffffff80', fontSize:18}}>You will receive a text message with a 6-digit code shortly.</Text>
        <View style={{flexDirection:'row', marginTop:100, marginHorizontal:10, justifyContent:'space-between'}}>
          <TextInput
            style={[styles.input, { flex: .15}]}
            maxLength={1}
            keyboardType="number-pad"
            value={this.state.amount}
            onChangeText={(text) => this.handleNumberChange(text, 1)}
          />

          <TextInput
            ref={this._2}
            style={[styles.input, { flex: .15 }]}
            maxLength={1}
            keyboardType="number-pad"
            value={this.state.amount}
            onChangeText={(text) => this.handleNumberChange(text, 2)}
          />

          <TextInput
            ref={this._3}
            style={[styles.input, { flex: .15 }]}
            maxLength={1}
            keyboardType="number-pad"
            value={this.state.amount}
            onChangeText={(text) => this.handleNumberChange(text, 3)}
          />

          <TextInput
            ref={this._4}
            style={[styles.input, { flex: .15 }]}
            maxLength={1}
            keyboardType="number-pad"
            value={this.state.amount}
            onChangeText={(text) => this.handleNumberChange(text, 4)}
          />

          <TextInput
            ref={this._5}
            style={[styles.input, { flex: .15 }]}
            maxLength={1}
            keyboardType="number-pad"
            value={this.state.amount}
            onChangeText={(text) => this.handleNumberChange(text, 5)}
          />

          <TextInput
            ref={this._6}
            style={[styles.input, { flex: .15 }]}
            maxLength={1}
            keyboardType="number-pad"
            value={this.state.amount}
            onChangeText={(text) => this.handleNumberChange(text, 6)}
          />
        </View>
        <Text style={styles.label}>Code</Text>

        <View style={{flexDirection:'row', margin:10}}>
          <TouchableOpacity style={[styles.button, { flex: 0.5, marginRight:5 }]} onPress={() => resend(this.props.username, this.props.setError)}>
            <Text style={styles.btnText}>Resend</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, {flex:0.5, marginLeft:5}]} onPress={() => {
            this.state.number.length === 6 
              ? Promise.all([ confirm(this.props.username, this.state.number.join(''), this.props.storeAndNavigate, this.props.setError, this.props.handleChangeText),
                this.props.handleChangeText(true, 'loading')])
              : this.props.setError('Enter the confirmation code')
          }}>
            <Text style={styles.btnText}>Confirm</Text>
          </TouchableOpacity>
        </View> 
      </View>
    )
  }
}