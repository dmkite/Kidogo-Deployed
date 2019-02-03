import React, {Component} from 'react'
import {ScrollView, View, Text, TouchableOpacity, AsyncStorage} from 'react-native'
import {Icon} from 'react-native-elements'
import {Child, Guardian, EmergencyContact, Rate} from '../components/Forms'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {ChildDetails, GuardianDetails, EmergencyContactDetails} from '../components/AccountDetails'
import Header from '../components/Header'
import {getOneAccount} from '../actions/accounts'

class Account extends Component {
  constructor(props){
    super(props)
    this.state = {
      addChild: false,
      addGuardian: false,
      addE_contact: false,
      openChild: false,
      openGuardian: false,
      openE_contact: false,
      account: {
        children: [{
          img_uri: null,
          f_name: ' ',
          l_name: ' ',
          birthdate: null,
          gender: null,
          notes: null,
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
      console.error(err,'!!!!!!!!!!!!!!')
    }
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation}/>
        <ScrollView>
          <ChildDetails children={this.state.account.children} isOpen={this.state.openChild} openView={this.openView}/>
          <GuardianDetails guardians={this.state.account.guardians} isOpen={this.state.openGuardian} openView={this.openView}/>
          <EmergencyContactDetails e_contacts={this.state.account.e_contacts} isOpen={this.state.openE_contact} openView={this.openView}/>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({getOneAccount}, dispatch)

export default connect(mapStateToProps)(Account)