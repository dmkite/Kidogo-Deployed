import React, {Component} from 'react'
import { ScrollView, TextInput, View, Text, Image, Picker, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {styles} from './newStyles'
import numberValidation from '../../utilities/numberValidation'

class Guardian extends Component{
  constructor(props){
    super(props)
    this.state = {
      focusedOn: null,
      f_name: null,
      l_name:null,
      phone: null,
      govt_id: '',
      street: null,
      city: null,
      frequency: 'daily',
      rate: '100',
      hiddenId: '',
      showId: false
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
    if(this.state[field] && this.state[field].length) length = this.state[field].length
    this.setState({
      [field]: numberValidation(text, field, length, num1, num2)
    })
  }


  handleId = (text) => {
    let govt_id = this.state.govt_id 
    
    text.length > this.state.govt_id.length ? govt_id += text[text.length - 1] : govt_id = govt_id.slice(0, govt_id.length - 1)
    let hiddenId = ''
    for (let letter of govt_id) {
      hiddenId += '*'
    }
    this.setState({
      govt_id,
      hiddenId
    })
  }

  showId = () => {
    this.setState({showId: !this.state.showId})
  }
  
  pickerChange = (itemValue) => {
    this.setState({ frequency: itemValue })
  }

  render(){
    return (
      <ScrollView style={{ flex: 1 }} >
          <Image
            source={require('../../assets/GUARDIAN.png')}
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
          value={this.state.street}
          style={[styles.input, this.state.focusedOn === 'street' ? styles.focused : null]}
          onChangeText={(text) => this.handleChangeText(text, 'street')}
          onFocus={() => {
            this.changeFocus('focus', 'street')
            this.props.addMargin(-250)
          }}
          onBlur={() => {
            this.changeFocus('blur', null)
            this.props.addMargin(0)
          }}
        />
        <Text style={[styles.label, this.state.focusedOn === 'street' ? styles.focused : null]}>Address</Text>   

        <TextInput
          value={this.state.city}
          style={[styles.input, { width: 150 }, this.state.focusedOn === 'city' ? styles.focused : null]}
          onChangeText={(text) => this.handleChangeText(text, 'city')}
          onFocus={() => {
            this.changeFocus('focus', 'city')
            this.props.addMargin(-300)
          }}
          onBlur={() => {
            this.changeFocus('blur', null)
            this.props.addMargin(0)
          }}
        />
        <Text style={[styles.label, this.state.focusedOn === 'city' ? styles.focused : null]}>City</Text>   

        <TextInput
          style={[styles.input, this.state.focusedOn === 'phone' ? styles.focused : null]}
          value={this.state.phone}
          keyboardType="number-pad"
          maxLength={11}
          onFocus={() => {
            this.changeFocus('focus', 'phone')
            this.props.addMargin(-375)
          }}
          onBlur={() => {
            this.changeFocus('blur', null)
            this.props.addMargin(0)
          }}
          onChangeText={(text) => this.handleNumberChange(text, 'phone', 2, 6)}
        />
        <Text style={[styles.label, this.state.focusedOn === 'phone' ? styles.focused : null]}>Phone</Text>   

        <View style={styles.passwordHolder}>
          <TextInput
            keyboardType="number-pad"
            onFocus={() => {
              this.changeFocus('focus', 'govt_id')
              this.props.addMargin(-425)
              }}
            onBlur={() =>{
                this.changeFocus('blur', null)
                this.props.addMargin(0)
                }}
            style={[styles.input, {flex:0.9, marginRight:0}, this.state.focusedOn === 'govt_id' ? styles.focused : null]}
            maxLength={8}
            value={this.state.showId ? this.state.govt_id : this.state.hiddenId}
            onChangeText={(text) => this.handleId(text)}
          />
          <View style={[styles.showButton, this.state.focusedOn === 'govt_id' ? styles.focused : null]}>
            <TouchableOpacity onPress={this.showId}>
              <Icon name={this.state.showId ? "visibility-off" : 'visibility'} color="white" />
            </TouchableOpacity> 
          </View>
        </View>
        <Text style={[styles.label, this.state.focusedOn === 'govt_id' ? styles.focused : null]}>Government ID</Text> 

        {this.props.accountAlreadyCreated 
        ? null
        : <Rate 
            addMargin={this.props.addMargin} 
            changeFocus={this.changeFocus} 
            rate={this.state.rate}
            handleNumberChange={this.handleNumberChange}
            focusedOn={this.state.focusedOn}
            />
        }

        {this.props.accountAlreadyCreated
          ? <View style={styles.nameHolder}>
              <TouchableOpacity
                style={[{ flex: .5, marginTop: 20 }, styles.ready]}
                onPress={() => this.props.openForm('guardians')}>
                <Text style={[styles.nextText, { textAlign: 'left', marginLeft: 10 }]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[{ flex: .5, marginTop: 20 }, (!!this.state.f_name && !!this.state.l_name)
                ? styles.ready
                : styles.notReady]}
                onPress={() => {
                  let guardian = { ...this.state }
                  delete guardian.focusedOn
                  delete guardian.rate
                  delete guardian.frequency
                  delete guardian.hiddenId
                  delete guardian.showId
                  this.props.addMember('guardians', guardian)
                }}>
                <Text style={styles.nextText}>Add</Text>
              </TouchableOpacity>

            </View>
            : <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[{ flex: .5, marginTop: 20 }, (!!this.state.f_name && !!this.state.l_name && !!this.state.phone)
                ? styles.ready
                : styles.notReady]}
                onPress={
                  (!!this.state.f_name && !!this.state.l_name && !!this.state.phone)
                    ? () => {
                      this.state
                      let guardian = { ...this.state }
                      delete guardian.focusedOn
                      this.props.addToAccount(guardian, 'guardians')
                      this.setState({
                        focusedOn: null,
                        f_name: null,
                        l_name: null,
                        phone: null,
                        govt_id: '',
                        street: null,
                        city: null,
                        frequency: 'daily',
                        rate: '100',
                        hiddenId: '',
                        showId: false
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
                  this.state
                  let guardian = { ...this.state }
                  delete guardian.focusedOn
                  delete guardian.hiddenId
                  delete guardian.showId
                  this.props.addToAccount(guardian, 'guardians')

                  this.props.changeQuestionFocus('e_contact')
                }}
              >
                <Text style={styles.nextText}>Next</Text>
                <Icon name="chevron-right" size={24} color='white' style={{ flex: 0.1, marginTop: 13 }} />
              </TouchableOpacity>
            </View>
            
            }
      </ScrollView>
    )
  }
}

export default Guardian