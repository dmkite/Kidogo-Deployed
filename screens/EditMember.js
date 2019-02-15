import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import {styles} from '../components/AccountDetails/styles'
import {styles as formStyles} from '../components/Forms/styles'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteMember, changeMember} from '../actions/accounts'

class EditMember extends Component{
  constructor(props){
    super(props)
    this.state = {
      f_name: '',
      l_name:'',
      birthdate: null,
      gender: '',
      notes:'',
      street: '',
      city:'',
      govt_id: '',
      phone: null,
    }
  }


  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  deleteMember = () => {
    const acctId = this.props.navigation.getParam('acctId')
    const memberId = this.props.navigation.getParam('editing').id
    const memberType = this.props.navigation.getParam('type')
    this.props.deleteMember(acctId, memberType, memberId)
    this.props.navigation.navigate('Account', {id: acctId})
  }

  componentDidMount = () => {
    const editing = this.props.navigation.getParam('editing')
    Object.keys(this.state).forEach(key => {
      if(!Object.keys(editing).includes(key)) delete this.state[key]
    })

    this.setState({...editing})
  }

  selectBadge = (gender) => {
    this.setState({gender})
  }

  handleChangeText = (text, field) => {
    this.setState({
      [field]:text
    })
  }

  changeMember = () => {
    const changes = Object.keys(this.state).reduce((acc, field) => {
      if(this.state[field]) acc[field] = this.state[field]
      return acc
    }, {})
    const acctId = this.props.navigation.getParam('acctId')
    const memberId = this.props.navigation.getParam('editing').id
    const memberType = this.props.navigation.getParam('type')

    this.props.changeMember(changes, acctId, memberType, memberId)
    // edit NOTE: added an 'update account' function, but not sure I can use it.;
    this.props.navigation.navigate('Account', { id: acctId })
  }

  numberValidation = (text, field, num1, num2) => {
    let charCode 
    if(text.length > 0) charCode = text[text.length - 1].charCodeAt(0)
    if (text.length > 0 && (charCode < 48 || charCode > 57)) text = text.slice(0, (text.length - 1))
    if(text.length > this.state[field].length){ //checks if deleting, don't add '-'
      if ( (num1 && text.length === num1) || (num2 &&text.length === num2))text += '-'
    }
    this.setState({
      [field]: text
    })
  }

  render(){
    return (
      <View style={{ flex: 1}}>
        {this.state.deleteMessage
          ? <View style={styles.deleteWarning}>
            <Text>Hold the button down to delete</Text>
            <View style={styles.iconHolder}>
              <Icon name="touch-app" />
              <Icon name="timer" />
              <Icon name="timer-3" />
            </View>
          </View>
          : null
        }
        <ScrollView style={{paddingBottom:100}}>
          
          <Text style={formStyles.h1}>Editing {this.props.navigation.getParam('editing').f_name}'s Information</Text>
          
          <Text style={formStyles.label}>First Name:</Text>
          <TextInput 
            style={formStyles.input} 
            placeholder={this.props.navigation.getParam('editing').f_name}
            onChangeText={(text) => this.handleChangeText(text, 'f_name')}
          />

          <Text style={formStyles.label}>Surname:</Text>
          <TextInput 
            style={formStyles.input} 
            placeholder={this.props.navigation.getParam('editing').l_name} 
            onChangeText={(text) => this.handleChangeText(text, 'l_name')}  
          />
          
          {this.state.birthdate !== undefined 
            ? <View>
                <Text style={formStyles.label}>Birthdate:</Text>
                <TextInput 
                  style={formStyles.input} 
                  keyboardType="number-pad" 
                  placeholder={this.props.navigation.getParam('editing').birthdate} 
                  onChangeText={(text) => this.numberValidation(text, 'birthdate', 2, 5)}
                  maxLength={10}
                  value={this.state.birthdate}
                />
            </View>
            : null
          }

          {this.state.gender !== undefined
            ? <View>
              <Text style={formStyles.label}>Gender:</Text>
              <View style={formStyles.badgeHolder}>
                <Text
                  onPress={ () => this.selectBadge('female') }
                  style={[formStyles.badge, this.state.gender === 'female' ? formStyles.selected : null]}>
                  Female
                </Text>
                <Text
                  onPress={() => this.selectBadge('male')}
                  style={[formStyles.badge, this.state.gender === 'male' ? formStyles.selected : null]}>
                  Male
                </Text>
                <Text
                  onPress={ () => this.selectBadge('other') }
                  style={[formStyles.badge, this.state.gender === 'other' ? formStyles.selected : null]}>Other</Text>
              </View>
            </View>
            :null
          }
          
          {this.state.notes !== undefined
            ? <View>
                <Text style={formStyles.label}>Notes:</Text>
                <TextInput 
                  style={formStyles.textarea} 
                  onChangeText={(text) => this.handleChangeText(text, 'notes')}
                />
              </View>
            :null
          }

          {this.state.phone !== undefined
            ? <KeyboardAvoidingView> 
                <Text style={formStyles.label}>Phone Number:</Text>
                <TextInput
                  keyboardType="number-pad"
                  style={formStyles.input}
                  placeholder={this.props.navigation.getParam('editing').phone}
                  value={this.state.phone}
                  maxLength={11}
                  onChangeText={(text) => {
                    this.numberValidation(text, 'phone', 2, 6)
                  }}
                />
              </KeyboardAvoidingView> 
            : null
          }
          
          {this.state.street !== undefined
            ? <View>
                <Text style={formStyles.label}>Street Address:</Text>
                <TextInput
                  style={formStyles.input}
                  placeholder={this.props.navigation.getParam('editing').street || "123 Kenyata Blvd."}
                  onChangeText={(text) => this.handleChangeText(text, 'street')}
                />
              </View>
              : null
          }

          {this.state.city !== undefined
            ? <View>
                <Text style={formStyles.label}>City:</Text>
                <TextInput
                  style={formStyles.input}
                  placeholder={this.props.navigation.getParam('editing').city || "Nairobi"}
                  onChangeText={(text) => this.handleChangeText(text, 'city')}
                />
              </View>
            : null
          }

          {this.state.govt_id !== undefined
            ? <KeyboardAvoidingView>
              <Text style={formStyles.label}>ID:</Text>
              <TextInput
                keyboardType="number-pad"
                style={formStyles.input}
                placeholder={this.props.navigation.getParam('editing').govt_id}
                value={this.state.govt_id}
                maxLength={11}
                onChangeText={(text) => {
                  this.numberValidation(text, 'govt_id', 3, 6)
                }}
              />
            </KeyboardAvoidingView>
            : null
          }

          <View style={styles.buttonBlock}>
            <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#02A676', marginRight: 5 }]} onPress={this.changeMember}>
              <Text style={styles.btnText}>Add Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.rateBtn, { backgroundColor: '#FC3C3C', marginLeft: 5 }]} 
              onLongPress={this.deleteMember}
              onPress={() => {
                this.setState({ deleteMessage: !this.state.deleteMessage })
                setTimeout(() => {
                  this.setState({ deleteMessage: !this.state.deleteMessage })
                }, 5000)
              }}
            >
              <Text style={styles.btnText}>Delete {this.props.navigation.getParam('editing').f_name}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({accounts:state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({deleteMember, changeMember}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditMember)