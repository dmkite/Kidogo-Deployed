import React, {Component} from 'react'
import {TextInput, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native'
import {styles} from './newStyles'
import {Icon } from 'react-native-elements'
import numberValidation from '../../utilities/numberValidation'

class EmergencyContact extends Component{
  constructor(props){
    super(props)
    this.state = {
      phone: '',
      f_name: null,
      l_name: null,
      focusedOn: null
    }
  }

  changeFocus = (action, type) => {
    if (action === 'focus') this.setState({ focusedOn: type })
    else this.setState({ focusedOn: null })
  }

  handleChangeText = (text, field) => {
    this.setState({ [field]: text })
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
      <ScrollView style={{ flex: 1 }} >
        <Image
          source={require('../../assets/E_CONTACT.png')}
          style={{
            height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50
          }}
        />

        <View style={styles.nameHolder}>
          <View style={{ flex: .5, marginRight: 5 }}>
            <TextInput
              onFocus={() => {
                this.changeFocus('focus', 'f_name')
                this.props.addMargin(-175)
              }}
              onBlur={() => {
                this.changeFocus('blur', null)
                this.props.addMargin(0)
              }}
              style={[styles.input, this.state.focusedOn === 'f_name' ? styles.focused : null]}
              value={this.state.f_name}
              onChangeText={(text) => this.handleChangeText(text, 'f_name')}
            />
            <Text style={[styles.label, this.state.focusedOn === 'f_name' ? styles.focused : null]}>Name</Text>
          </View>

          <View style={{ flex: .5, marginLeft: 5 }}>
            <TextInput
              onFocus={() => {
                this.changeFocus('focus', 'l_name')
                this.props.addMargin(-175)
              }}
              onBlur={() => {
                this.changeFocus('blur', null)
                this.props.addMargin(0)
              }}
              style={[styles.input, this.state.focusedOn === 'l_name' ? styles.focused : null]}
              value={this.state.l_name}
              onChangeText={(text) => this.handleChangeText(text, 'l_name')}
            />
            <Text style={[styles.label, this.state.focusedOn === 'l_name' ? styles.focused : null]}>Surname</Text>
          </View>
        </View>

        <TextInput
          style={[styles.input, this.state.focusedOn === 'phone' ? styles.focused : null]}
          value={this.state.phone}
          keyboardType="number-pad"
          maxLength={11}
          onFocus={() => {
            this.changeFocus('focus', 'phone')
            this.props.addMargin(-150)
          }}
          onBlur={() => {
            this.changeFocus('blur', null)
            this.props.addMargin(0)
          }}
          onChangeText={(text) => this.handleNumberChange(text, 'phone', 2, 6)}
        />
        <Text style={[styles.label, this.state.focusedOn === 'phone' ? styles.focused : null]}>Phone</Text>  

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={[{ flex: .5, marginTop: 20 }, (!!this.state.f_name && !!this.state.l_name && !!this.state.phone)
            ? styles.ready
            : styles.notReady]}
            onPress={
              (!!this.state.f_name && !!this.state.l_name && !!this.state.phone)
                ? () => {
                  let e_contact = { ...this.state }
                  delete e_contact.focusedOn
                  this.props.addToAccount(e_contact, 'e_contacts')
                  this.setState({
                    phone: '',
                    f_name: null,
                    l_name: null,
                    focusedOn: null
                  })
                }
                : null}
          >
            <Text style={[styles.nextText, { textAlign: 'left', marginLeft: 10 }]}>Add Another</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[{ flex: .5, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 },
          (!!this.state.f_name && !!this.state.l_name)
            ? styles.ready
            : styles.notReady]}
            onPress={() => {
              let e_contact = { ...this.state }
              delete e_contact.focusedOn
              this.props.addToAccount(e_contact, 'e_contacts')
              this.props.submitAccount()
            }}
          >
            <Text style={styles.nextText}>Next</Text>
            <Icon name="chevron-right" size={24} color='white' style={{ flex: 0.1, marginTop: 13 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default EmergencyContact