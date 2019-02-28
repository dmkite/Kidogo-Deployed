import React, {Component} from 'react'
import {TextInput, Text, View, ScrollView, Image, TouchableOpacity} from 'react-native'
import {styles} from './newStyles'
import numberValidation from '../../utilities/numberValidation'

class EmergencyContact extends Component{
  constructor(props){
    super(props)
    this.state = {
      phone: null,
      f_name: null,
      l_name: null,
      focusedOn: null,
      showHelp:false,
      soundObject: null
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
        <Image source={require('../../assets/E_CONTACT.png')} style={styles.img}/>
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
              blurOnSubmit={false}
              onSubmitEditing={() => this.l_nameInput.focus()}
            />
            <Text style={[styles.label, this.state.focusedOn === 'f_name' ? styles.focused : null]}>Jina</Text>
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
              ref={(input) => this.l_nameInput = input}
              blurOnSubmit={false}
              onSubmitEditing={() => this.phoneInput.focus()}
            />
            <Text style={[styles.label, this.state.focusedOn === 'l_name' ? styles.focused : null]}>Ama Familia
</Text>
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
          onChangeText={(text) => this.handleNumberChange(text, 'phone', 3, 7)}
          ref={(input) => this.phoneInput = input}
        />
        <Text style={[styles.label, this.state.focusedOn === 'phone' ? styles.focused : null]}>Nambari ya Simu</Text>  

        {this.props.accountAlreadyCreated
          ? <View style={{flexDirection: 'row', marginTop:20, marginHorizontal:10}}>
            <TouchableOpacity style={[styles.button, { flex: .5, marginRight:5 }]} onPress={() => this.props.openForm('e_contacts')}>
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
            {this.state.phone && this.state.phone.length === 11 && this.state.f_name
              ? <TouchableOpacity style={[styles.button, { flex: .5, marginRight:5 }]}
                  onPress={() => {
                    let e_contact = { ...this.state }
                    delete e_contact.focusedOn
                    this.props.addMember('e_contacts', e_contact)
                  }}>
                  <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>
              : null
            }
          </View>
          :  this.state.phone && this.state.phone.length === 11 && this.state.f_name
            ? <View style={{flexDirection: 'row', marginTop:20, marginHorizontal:10}}>
                <TouchableOpacity style={[styles.button, { flex: .5, marginRight:5 } ]}
                  onPress={() => {
                        let e_contact = { ...this.state }
                        delete e_contact.focusedOn
                        this.props.addToAccount(e_contact, 'e_contacts')
                        this.setState({
                          phone: null,
                          f_name: null,
                          l_name: null,
                          focusedOn: null
                })}}>
                  <Text style={styles.btnText}>Add Another</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {flex:0.5, marginLeft:5}]}
                  onPress={() => {
                    let e_contact = { ...this.state }
                    delete e_contact.focusedOn
                    this.props.addToAccount(e_contact, 'e_contacts')
                    this.props.submitAccount()
                  }}>
                  <Text style={styles.btnText}>Next</Text>
                </TouchableOpacity>
              </View>
            : null      
        }
      </ScrollView>
    )
  }
}

export default EmergencyContact