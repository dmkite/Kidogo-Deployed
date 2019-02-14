import React, {Component} from 'react'
import {ScrollView, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { bindActionCreators } from 'redux'
import {LinearGradient} from 'expo'

import Header from '../components/Header'
import {connect} from 'react-redux' 
import {Child, Guardian, EmergencyContact, Rate} from '../components/Forms'
import ErrorMessage from '../components/ErrorMessage'
import {styles} from '../components/Forms/styles'
import {addAccount} from '../actions/accounts'
import {makePayment} from '../actions/payments'
import uuid from 'uuid'

class Enrollment extends Component{
  constructor(props){
    super(props)
    this.state ={
      questionFocus: 'child',
      avoidView:0,
      children: [],
      guardians: [],
      e_contacts: [],
      rate: 0,
      frequency: 'daily',
      balance: 0,
      message: null,
    } 
  }
  
   static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ff7e09',
      height:0
    }
  }

  handleChangeText = (text, type, entry) => {
    this.setState({
      [type]:{
        ...this.state[type],
        [entry]: text
      }
    })
  }

  addToAccount = (data, field) => {
    const newState = {...this.state}
    data.id = uuid()
    if(field === 'guardians'){
      newState.rate = data.rate,
      newState.frequency = data.frequency
      delete data.rate
      delete data.frequency
    }
    newState[field].push(data)
    this.setState({...newState})
  } 

  submitAccount = async () => {
    const message = []
    const children = this.state.children
    const guardians = this.state.guardians
    // if(!children.f_name || !children.l_name || !guardians.f_name || !guardians.l_name) message.push('Guardians and children need first and last names')
    // if(!guardians.phone) message.push('You need to add a phone number for guarians')
    // if(!this.state.rate) message.push('You need to include a rate')
    if(message.length){
      this.setState({
        message: message.join('<br>')
      })
      return
    }
    const id = uuid()
    const account = {
      children: [...this.state.children],
      guardians: [...this.state.guardians],
      e_contacts: [...this.state.e_contacts],
      rate: this.state.rate,
      frequency: this.state.frequency,
      id,
      balance: 0
    }

    //NOTE: for some reason the below doesn't work. it navigates, but the fee is not added
    await this.props.addAccount(account)
    
    if(this.state.frequency !== 'daily'){
      
      await this.props.makePayment(id, -Number(this.state.rate), 0) //negative payment will process as fee
      
    }
    
    await this.props.navigation.navigate('Account', {id})
  }
  
  handleRate = (text) => {
    const charCode = text[text.length - 1].charCodeAt(0)
    if (charCode < 48 || charCode > 57) text = text.slice(0, (text.length - 1))
    this.setState({
      rate: text
    })
  }

  addMessage = (message) => {
    this.setState({message})
  }

  changeQuestionFocus = (type) => {
    this.setState({questionFocus: type})
  }
  
  addMargin = (num) => this.setState({ avoidView: num })

  render(){
   return (
     <LinearGradient
       style={[{ flex: 1 }, this.state.avoidView ? { marginTop: Number(this.state.avoidView) } : null]}
       colors={['#11011B', '#1A011B']}>
       {console.log(this.state.children)}
      <Header navigation={this.props.navigation}/>
        {this.state.questionFocus === 'child'
           ? <Child
             navigation={this.props.navigation}
             changeQuestionFocus={this.changeQuestionFocus}
             addToAccount={this.addToAccount}
             addMessage={this.addMessage}
             addMargin={this.addMargin}
           />
           : this.state.questionFocus === 'guardian'
             ? <Guardian
                changeQuestionFocus={this.changeQuestionFocus}
                addMargin={this.addMargin}
                addToAccount={this.addToAccount}
             />
             : <EmergencyContact
               addMargin={this.addMargin}
               addToAccount={this.addToAccount}
               submitAccount={this.submitAccount}
             />
        }
        


        {this.state.message
          ?  <ErrorMessage error={this.state.message}/>
          : null
        }

     </LinearGradient>
   )
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({addAccount, makePayment}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Enrollment)