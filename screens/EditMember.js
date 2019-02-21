import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, TouchableOpacity, Picker, Image} from 'react-native'
// import {styles} from '../components/AccountDetails/styles'
import {styles} from '../components/Forms/newStyles'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteMember, changeMember} from '../actions/accounts'
import {LinearGradient} from 'expo'
import numberValidation from '../utilities/numberValidation'
import {Icon} from 'react-native-elements'

class EditMember extends Component{
  constructor(props){
    super(props)
    this.state = {
      f_name: null,
      l_name:null,
      birthdate: null,
      gender: null,
      notes:null,
      street: null,
      city:null,
      govt_id: null,
      phone: null,
      focusedOn: null,
      avoidView: 0,
      img_uri: null,
      hiddenId: '********',
      showId:false
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
    this.setState({
      showId: !this.state.showId
    })
  }

  componentDidMount = () => {
    const editing = this.props.navigation.getParam('editing')
    editing.focusedOn = null
    editing.avoidView = 0
    editing.hiddenId = '********',
    editing.showId = false
    Object.keys(this.state).forEach(key => {
      
      if(!Object.keys(editing).includes(key) ) delete this.state[key]
    })

    this.setState({...editing})
  }

  handleChangeText = (text, field) => {
    this.setState({
      [field]:text
    })
  }

  changeMember = async () => {
    const changes = Object.keys(this.state).reduce((acc, field) => {
      if( field === 'showId' || field === 'avoidView' || field === 'hiddenId' || field === 'focusedOn') return acc
      if(this.state[field] === '') acc[field] = null 
      else if(this.state[field]) acc[field] = this.state[field]
      return acc
    }, {})
    const acctId = this.props.navigation.getParam('acctId')
    const memberId = this.props.navigation.getParam('editing').id
    const memberType = this.props.navigation.getParam('type')
    
    await this.props.changeMember(changes, acctId, memberType, memberId)
    // edit NOTE: added an 'update account' function, but not sure I can use it.;
    await this.props.navigation.navigate('Account', { id: acctId })
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
  
  addMargin = (num) => this.setState({ avoidView: num })

  render(){
    return (
      <LinearGradient
        style={[{ flex: 1 }, this.state.avoidView ? { marginTop: Number(this.state.avoidView) } : null]}
        colors={['#11011B', '#3C233D']}>
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
          <Text style={styles.h1}>Editing {this.props.navigation.getParam('editing').f_name}'s Information</Text>
          
          {this.state.img_uri
            ? <Image
              source={{ uri: this.state.img_uri }}
              style={{
                height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50
              }}
            />
            : <Image
              source={
                this.props.navigation.getParam('type') === 'children'
                 ? require('../assets/CHILD.png')
                 :this.props.navigation.getParam('type') === 'guardians'
                    ? require('../assets/GUARDIAN.png')
                    : require('../assets/E_CONTACT.png')
                    }
              style={{
                height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50
              }}
            />
          }

          <View style={styles.nameHolder}>
            <View style={{ flex: .5, marginRight: 5 }}>
              <TextInput
                onFocus={() => {
                  this.changeFocus('focus', 'f_name')
                  this.addMargin(-175)
                }}
                onBlur={() => {
                  this.changeFocus('blur', null)
                  this.addMargin(0)
                }}
                style={[styles.input, this.state.focusedOn === 'f_name' ? styles.focused : null]}
                value={this.state.f_name}
                onChangeText={(text) => this.handleChangeText(text, 'f_name')}
                placeholder={this.props.navigation.getParam('editing').f_name} 
              />
              <Text style={[styles.label, this.state.focusedOn === 'f_name' ? styles.focused : null]}>Name</Text>
            </View>

            <View style={{ flex: .5, marginLeft: 5 }}>
              <TextInput
                onFocus={() => {
                  this.changeFocus('focus', 'l_name')
                  this.addMargin(-175)
                }}
                onBlur={() => {
                  this.changeFocus('blur', null)
                  this.addMargin(0)
                }}
                style={[styles.input, this.state.focusedOn === 'l_name' ? styles.focused : null]}
                value={this.state.l_name}
                onChangeText={(text) => this.handleChangeText(text, 'l_name')}
                placeholder={this.props.navigation.getParam('editing').l_name} 
              />
              <Text style={[styles.label, this.state.focusedOn === 'l_name' ? styles.focused : null]}>Surname</Text>
            </View>
          </View>

          
          {this.state.birthdate !== undefined 
            ? <View style={styles.nameHolder}>
              <View style={{ flex: .5, marginRight: 5 }}>
                <TextInput
                  style={[styles.input, styles.dateInput]}
                  maxLength={10}
                  keyboardType="number-pad"
                  value={this.state.birthdate}
                  onChangeText={(text) => this.handleNumberChange(text, 'birthdate', 2, 5)}
                  placeHolder={this.props.navigation.getParam('editing').birthdate}
                  onFocus={() => {
                    this.changeFocus('focus', 'birthdate')
                    this.addMargin(-250)
                  }}
                  onBlur={() => {
                    this.changeFocus('blur', null)
                    this.addMargin(0)
                  }} />
                <Text style={[styles.label, this.state.focusedOn === 'birthdate' ? styles.focused : null]}>Birthday <Text style={{ fontSize: 10 }}>(DD-MM-YYYY)</Text></Text>
              </View>
              <View style={{ flex: .5, marginLeft: 5 }}>
                <View style={[styles.input, { height: 30, paddingLeft: 0 }]}>
                  <Picker
                    style={{ color: 'white', marginTop: -10 }}
                    selectedValue={this.state.gender}
                    onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
                    <Picker.Item label="" value={null} />
                    <Picker.Item label="female" value="female" />
                    <Picker.Item label="male" value="male" />
                    <Picker.Item label="other" value="other" />
                  </Picker>
                </View>
                <Text style={styles.label}>Gender</Text>
              </View>
            </View>
            :null
          }
          
          {this.state.notes !== undefined
            ?<View>
              <TextInput
                style={styles.input}
                multiline={true}
                value={this.state.notes}
                onChangeText={(text) => this.handleChangeText(text, 'notes')}
                onFocus={() => {
                  this.changeFocus('focus', 'notes')
                  this.addMargin(-350)
                }}
                onBlur={() => {
                  this.changeFocus('blur', null)
                  this.addMargin(0)
                }} />

              <Text style={[styles.label, this.state.focusedOn === 'notes' ? styles.focused : null]}>Notes</Text>
            </View>
            :null
          }

          {this.state.phone !== undefined
            ? <View>
              <TextInput
                style={[styles.input, this.state.focusedOn === 'phone' ? styles.focused : null]}
                value={this.state.phone}
                keyboardType="number-pad"
                maxLength={11}
                onFocus={() => {
                  this.changeFocus('focus', 'phone')
                  this.addMargin(-375)
                }}
                onBlur={() => {
                  this.changeFocus('blur', null)
                  this.addMargin(0)
                }}
                placeholder={this.props.navigation.getParam('editing').phone}
                onChangeText={(text) => this.handleNumberChange(text, 'phone', 2, 6)}
              />
              <Text style={[styles.label, this.state.focusedOn === 'phone' ? styles.focused : null]}>Phone</Text>   
              </View>
            : null
          }
          
          {this.state.street !== undefined
            ? <View>
                <TextInput
                  value={this.state.street}
                  style={[styles.input, this.state.focusedOn === 'street' ? styles.focused : null]}
                  onChangeText={(text) => this.handleChangeText(text, 'street')}
                  onFocus={() => {
                    this.changeFocus('focus', 'street')
                    this.addMargin(-250)
                  }}
                  onBlur={() => {
                    this.changeFocus('blur', null)
                    this.addMargin(0)
                  }}
                />
                <Text style={[styles.label, this.state.focusedOn === 'street' ? styles.focused : null]}>Address</Text>

                <TextInput
                  value={this.state.city}
                  style={[styles.input, { width: 150 }, this.state.focusedOn === 'city' ? styles.focused : null]}
                  onChangeText={(text) => this.handleChangeText(text, 'city')}
                  onFocus={() => {
                    this.changeFocus('focus', 'city')
                    this.addMargin(-300)
                  }}
                  onBlur={() => {
                    this.changeFocus('blur', null)
                    this.addMargin(0)
                  }}
                />
                <Text style={[styles.label, this.state.focusedOn === 'city' ? styles.focused : null]}>City</Text>   
            </View>
            : null
          }

          {this.state.govt_id !== undefined
            ? <View>
              <View style={styles.passwordHolder}>
                <TextInput
                  keyboardType="number-pad"
                  onFocus={() => {
                    this.changeFocus('focus', 'govt_id')
                    this.addMargin(-425)
                  }}
                  onBlur={() => {
                    this.changeFocus('blur', null)
                    this.addMargin(0)
                  }}
                  style={[styles.input, { flex: 0.9, marginRight: 0 }, this.state.focusedOn === 'govt_id' ? styles.focused : null]}
                  maxLength={8}
                  value={this.state.showId ? this.state.govt_id : this.state.hiddenId}
                  onChangeText={(text) => this.handleId(text)}
                  placeHolder={this.state.hiddenId}
                />
                <View style={[styles.showButton, this.state.focusedOn === 'govt_id' ? styles.focused : null]}>
                  <TouchableOpacity onPress={this.showId}>
                    <Icon name={this.state.showId ? "visibility-off" : 'visibility'} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={[styles.label, this.state.focusedOn === 'govt_id' ? styles.focused : null]}>Government ID</Text> 
            </View>
            : null
          }

          <View style={styles.nameHolder}>
            <TouchableOpacity style={[styles.button, { marginRight: 5, marginLeft:10}]} onPress={this.changeMember}>
              <Text style={styles.btnText}>Add Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.button, {marginLeft: 5, marginRight:10 }]} 
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
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({accounts:state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({deleteMember, changeMember}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditMember)