import React, {Component} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {Icon} from 'react-native-elements'
import { bindActionCreators } from 'redux'
import {LinearGradient, Audio} from 'expo'
import Header from '../components/Header'
import {connect} from 'react-redux' 
import {Child, Guardian, EmergencyContact} from '../components/Forms'
import ErrorMessage from '../components/ErrorMessage'
import {styles} from '../components/Forms/newStyles'
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
      soundObject:null
    } 
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
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

  addMessage = message => this.setState({message})

  changeQuestionFocus = type => this.setState({questionFocus: type})
  
  addMargin = num => this.setState({ avoidView: num })

   playAudio = async () => {
    try{
      if(!this.state.soundObject){
        const soundObject = new Audio.Sound()
        if (this.state.questionFocus === 'child') await soundObject.loadAsync(require('../assets/audio/children.mp3'))
        else if (this.state.questionFocus === 'guardian') await soundObject.loadAsync(require('../assets/audio/guardians.mp3'))
        else await soundObject.loadAsync(require('../assets/audio/contacts.mp3'))
        
        await soundObject.playAsync()
        this.setState({ soundObject })
      }
      else{   
        await this.state.soundObject.stopAsync()
        this.setState({soundObject: null})
      }
    }catch(err){
      console.error(err)
      this.setState({error:'We could not play the audio file'})
    }
  }  

  componentDidMount = async () => setTimeout(() => this.setState({ showHelp: !this.state.showHelp }), 15000)

  render(){
   return (
     <LinearGradient
       style={[{ flex: 1 }, this.state.avoidView ? { marginTop: Number(this.state.avoidView) } : null]}
       colors={['#11011B', '#3C233D']}>
      <Header navigation={this.props.navigation}/>
        <Text style={[styles.h1, styles.raleway]}>{this.state.questionFocus === 'child' ? 'Add a new child' : this.state.questionFocus === 'guardian' ? 'Add a guardian' : 'Add a contact'}</Text>      
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
        {this.state.showHelp 
            ? <TouchableOpacity style={{ backgroundColor: '#ffffff80', position: 'absolute', bottom: -75, left: -75, width: 150, height: 150, borderRadius: 75 }} onPress={this.playAudio}>
              <View style={{ position: 'absolute', bottom: 85, left: 80 }}>
                <Icon name="record-voice-over" color="#3C233D" size={36} />
              </View>
            </TouchableOpacity>
            : null
          }
     </LinearGradient>
   )
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({addAccount, makePayment}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Enrollment)