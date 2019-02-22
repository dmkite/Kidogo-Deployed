import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import Header from '../components/Header'
import {getAccounts, changeField} from '../actions/accounts'
import {PaymentSection, PaymentHistory} from '../components/Payments'
import{getPayments, makePayment} from '../actions/payments'
import {LinearGradient} from 'expo'


class Payments extends Component{
  constructor(props){
    super(props)
    this.state={
      avoidView:0
    }   
  }
  

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }
  componentDidMount = () => {
    const promiseArray = [this.props.getAccounts(), this.props.getPayments()]

    Promise.all(promiseArray)
  }
  
  findAccount = () => {
    const id = this.props.navigation.getParam('id')
    return this.props.accounts.filter(acct => acct.id === id)[0]
  }

  addMargin = (num) => this.setState({ avoidView: num })

  

  render(){
    return (
      <LinearGradient
        style={[{ flex: 1,  }, this.state.avoidView ? { marginTop: Number(this.state.avoidView) } : null]}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation}/>
        <ScrollView>
          <Text style={{fontSize:36, margin:10, marginBottom:20, color:'#ffffff80'}}>Make a Payment</Text>
          <PaymentSection 
            balance={this.findAccount() ? this.findAccount().balance : 0} 
            id={this.props.navigation.getParam('id')} 
            makePayment={this.props.makePayment} 
            changeField={this.props.changeField}
            addMargin={this.addMargin}
          />
          
          <PaymentHistory paymentHistory={this.props.payments ? this.props.payments[this.props.navigation.getParam('id')] : []}/>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({accounts: state.accounts, payments: state.payments})
const mapDispatchToProps = dispatch => bindActionCreators({getAccounts, changeField, getPayments, makePayment}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Payments)