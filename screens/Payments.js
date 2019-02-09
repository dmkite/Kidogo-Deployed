import React, {Component} from 'react'
import {View, Text, TouchableOpacity, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import Header from '../components/Header'
import {getAccounts, changeField} from '../actions/accounts'
import {PaymentSection, PaymentHistory} from '../components/Payments'
import{getPayments, makePayment} from '../actions/payments'


class Payments extends Component{
  constructor(props){
    super(props)
      
  }
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ff7e09',
      height: 0
    }
  }

  componentDidMount = () => {
    // if(!this.props.accounts.accounts[0].children.length) 
     
    // this.props.getPayments()
    // this.props.getAccounts()
    const promiseArray = [this.props.getAccounts(), this.props.getPayments()]

    Promise.all(promiseArray)
    // .then(() => console.log('worked?'))
  }
  
  findAccount = () => {
    const id = this.props.navigation.getParam('id')
    return this.props.accounts.accounts.filter(acct => acct.id === id)[0]
  }

  render(){
    return (
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>
        <ScrollView>
          <Text style={{fontSize:36, margin:10, marginBottom:20}}>Make a Payment</Text>
          <PaymentSection 
            balance={this.findAccount() ? this.findAccount().balance : 0} 
            id={this.props.navigation.getParam('id')} 
            makePayment={this.props.makePayment} 
            changeField={this.props.changeField}
          />
          <View style={{ height: 2, backgroundColor: '#ccc', marginHorizontal: 20, marginVertical: 40 }}></View>
          
          <PaymentHistory paymentHistory={this.props.payments ? this.props.payments[this.props.navigation.getParam('id')] : []}/>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({accounts: state.accounts, payments: state.payments})
const mapDispatchToProps = dispatch => bindActionCreators({getAccounts, changeField, getPayments, makePayment}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Payments)