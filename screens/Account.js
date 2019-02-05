import React, {Component} from 'react'
import {ScrollView, View, Text, TouchableOpacity, AsyncStorage, Alert} from 'react-native'
import {Icon} from 'react-native-elements'
import {Child, Guardian, EmergencyContact, Rate} from '../components/Forms'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {ChildDetails, GuardianDetails, EmergencyContactDetails, RateDetails} from '../components/AccountDetails'
import Header from '../components/Header'
import {getOneAccount, addMemberToAccount, changeField, deleteAccount} from '../actions/accounts'
import {styles} from '../components/AccountDetails/styles'
import uuid from 'uuid'


class Account extends Component {
  constructor(props){
    super(props)
    this.state = {
      editBalance: false,
      newBalance:0,
      editRate: false,
      newFrequency: 'daily',
      newRate: 0,
      deleteMessage: false,
      account: {
        children: [{
          img_uri: null,
          f_name: ' ',
          l_name: ' ',
          birthdate: null,
          gender: null,
          notes: null,
          id: null
        }],
        guardians: [{
          f_name: null,
          l_name: null,
          street: null,
          city: null,
          phone: null,
          govt_id: null
        }],
        e_contacts: [{
          f_name: null,
          l_name: null,
          phone: null
        }],
        rate: 0,
        frequency: 'daily',
        balance: 0
      },
      children: {
        status: false,
        img_uri: null,
        f_name: ' ',
        l_name: ' ',
        birthdate: null,
        gender: null,
        notes: null,
        id: uuid()
      },
      guardians: {
        status:false,
        f_name: null,
        l_name: null,
        street: null,
        city: null,
        phone: null,
        govt_id: null,
        id: uuid()
      },
      e_contacts: {
        status:false,
        f_name: null,
        l_name: null,
        phone: null,
        id: uuid()
      }
    }
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ff7e09',
      height:0
    }
  }
  
  openView = (type) => {
    this.setState({
      [type]: !this.state[type]
    })
  }
  

  componentDidMount = async () => {
    const id = this.props.navigation.getParam('id')
    try{
      const accounts = await AsyncStorage.getItem('_ACCOUNTS')
      const [account] = JSON.parse(accounts).filter(acct => acct.id === id)
      this.setState({ account })

    }catch(err){
      console.error(err,'----------------------')
    }
  }

  openAddMember = (type) => {
    this.setState({
      [type]: {
        ...this.state[type],
        status: !this.state[type].status
      }
    })
  }

  handleChangeText = (text, type, field) => {
    this.setState({
      [type]: {
        ...this.state[type],
        [field]: text
      }
    })
  }

  changeBalance = (text) => {
    this.setState({
      newBalance: text
    })
  }
  
  changeField = (fieldname, newValue, fieldname2, newValue2) => {
    this.props.changeField(fieldname, this.state[newValue], this.props.navigation.getParam('id'))
    if (fieldname2 !== undefined && newValue2 !== undefined) this.props.changeField(fieldname2, this.state[newValue2], this.props.navigation.getParam('id'))
    this.setState({
      editBalance:false,
      account: {
        ...this.state.account,
        [fieldname]: this.state[newValue],
        [fieldname2]: this.state[fieldname2]
      }
    })
  }

  addMember = (type) => {
    const payload = {
      id: this.props.navigation.getParam('id'),
      content: null,
      type
    }

    if(type === 'children'){
      // validation goes here
      payload.content = this.state.children
    }
    else if(type === 'guardians'){
      // validation goes here
      payload.content = this.state.guardians
    }
    else{
      // validation goes here
      payload.content = this.state.e_contacts
    }

    this.props.addMemberToAccount(payload)
    this.componentDidMount() // NOTE: this is probably bad practice - follow up w/ Roger
  }

  handlePress = (gender) => {
    this.setState({
      children: {
        ...this.state.children,
        gender
      }
    })
  }

  handleFrequency = (upOrDown) => {
    let frequency = this.state.newFrequency
    if (upOrDown === 'up') {
      if (frequency === 'daily') this.setState({ newFrequency: 'weekly' })
      if (frequency === 'weekly') this.setState({ newFrequency: 'termly' })
      if (frequency === 'termly') this.setState({ newFrequency: 'daily' })
    }
    else {
      if (frequency === 'daily') this.setState({ newFrequency: 'termly' })
      if (frequency === 'termly') this.setState({ newFrequency: 'weekly' })
      if (frequency === 'weekly') this.setState({ newFrequency: 'daily' })
    }
  }

  handleRate = (text) => {
    if(text.length > 0){
      const charCode = text[text.length - 1].charCodeAt(0)
      if (charCode < 48 || charCode > 57) text = text.slice(0, (text.length - 1))
    }
    this.setState({
      newRate: text,
    })
  }

  deleteAccount = () => {
    const id = this.props.navigation.getParam('id')
    this.props.deleteAccount(id)
    this.props.navigation.navigate('Accounts')
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation}/>
        <ScrollView>

          <RateDetails 
            balance={this.state.account.balance} 
            rate={this.state.account.rate} 
            frequency={this.state.account.frequency} 
            newFrequency={this.state.newFrequency}
            openView={this.openView}
            changeBalance={this.changeBalance}
            editBalance={this.state.editBalance}
            editRate={this.state.editRate}
            changeField={this.changeField}
            navigation={this.props.navigation}
            acctId={this.props.navigation.getParam('id')}
            handleRate={this.handleRate}
            handleFrequency={this.handleFrequency}
          />

          <ChildDetails 
            acctId={this.props.navigation.getParam('id')}
            children={this.state.account.children} 
            isOpen={this.state.openChild} 
            openView={this.openView} 
            openAddMember={this.openAddMember} 
            navigation={this.props.navigation}
          />

          {this.state.children.status
            ? <View>
                <Child handleChangeText={this.handleChangeText} handlePress={this.handlePress}/>
                <View style={styles.buttonBlock}>
                  <TouchableOpacity style={[styles.rateBtn, {backgroundColor: '#02A676', marginRight:5}]} onPress={() => this.addMember('children')}>
                    <Text style={styles.btnText}>Add</Text>
                  </TouchableOpacity>

                <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#FC3C3C', marginLeft: 5 }]} onPress={() => this.openAddMember('children')}>
                    <Text style={styles.btnText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            : null
            }
          <GuardianDetails 
            acctId={this.props.navigation.getParam('id')}
            guardians={this.state.account.guardians} 
            isOpen={this.state.openGuardian} 
            openView={this.openView}
            openAddMember={this.openAddMember}  
            navigation={this.props.navigation}
          />
          {this.state.guardians.status
            ? <View>
              <Guardian handleChangeText={this.handleChangeText} handlePress={this.handlePress} />
              <View style={styles.buttonBlock}>
                <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#02A676', marginRight: 5 }]} onPress={() => this.addMember('guardians')}>
                  <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#FC3C3C', marginLeft: 5 }]} onPress={() => this.openAddMember('guardians')}>
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
            : null
          }
          <EmergencyContactDetails 
            acctId={this.props.navigation.getParam('id')}
            e_contacts={this.state.account.e_contacts} 
            isOpen={this.state.openE_contact} 
            openView={this.openView}
            openAddMember={this.openAddMember}  
            navigation={this.props.navigation}
          />
          {this.state.e_contacts.status
            ? <View>
              <EmergencyContact handleChangeText={this.handleChangeText} handlePress={this.handlePress} />
              <View style={styles.buttonBlock}>
                <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#02A676', marginRight: 5 }]} onPress={() => this.addMember('e_contacts')}>
                  <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#FC3C3C', marginLeft: 5 }]} onPress={() => this.openAddMember('e_contacts')}>
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
            : null
          }
          
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

          <TouchableOpacity 
            style={styles.deleteBtn} 
            onPress={() => {
              this.setState({deleteMessage: !this.state.deleteMessage})
              setTimeout(() => {
                this.setState({ deleteMessage: !this.state.deleteMessage })
              }, 3000)}}
            onLongPress={this.deleteAccount}
          >
            <Icon name="delete" color="white"/>
            <Text style={[styles.btnText, {lineHeight:100}]}>Delete</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({getOneAccount, addMemberToAccount, changeField, deleteAccount}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Account)