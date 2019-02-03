import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {Child, Guardian, EmergencyContact, Rate} from '../components/Forms'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ChildDetails from '../components/AccountDetails'
import Header from '../components/Header'

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
          l_Name: ' ',
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

  render(){
    return (
      <View style={{flex: 1}}>
        <Header navigation={this.props.navigation}/>
        <ChildDetails children={this.state.account.children} isOpen={this.state.openChild} openView={this.openView}/>
      </View>
    )
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(mapStateToProps)(Account)