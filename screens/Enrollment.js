import React, {Component} from 'react'
import {ScrollView, View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { bindActionCreators } from 'redux';
import Header from '../components/Header'
import {connect} from 'react-redux' 
import {Expo} from 'expo'
import {Icon, Button} from 'react-native-elements'
import {Child, Guardian, EmergencyContact} from '../components/Forms'
import ErrorMessage from '../components/ErrorMessage'
import {styles} from '../components/Forms/styles'
import {addAccount} from '../actions/accounts'
import uuid from 'uuid'

class Enrollment extends Component{
  constructor(props){
    super(props)
    this.state ={
      child: {
        img_uri: null,
        f_name: null,
        l_Name: null,
        birthdate:0,
        gender: null,
        notes:null,
      },
      guardian: {
        f_name: null,
        l_name: null,
        street: null,
        city: null,
        phone: null,
        govt_id: null
      },
      e_contact: {
        f_name: null,
        l_name: null,
        phone: null
      },
      rate: 0,
      frequency: 'daily',
      message: null
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

  handlePress = (gender) => {
    this.setState({
      child:{
        ...child,
        gender
      }})
  }

  handleFrequency = (upOrDown) => {
    let frequency = this.state.frequency
    if (upOrDown === 'up'){
      if (frequency === 'daily') this.setState({ frequency: 'weekly' })
      if (frequency === 'weekly') this.setState({ frequency: 'termly' })
      if(frequency === 'termly') this.setState({frequency:'daily'})
    }
    else{
      if (frequency === 'daily') this.setState({ frequency: 'termly' })
      if (frequency === 'termly') this.setState({ frequency: 'weekly' })
      if (frequency === 'weekly') this.setState({ frequency: 'daily' }) 
    }
  }

  handleSubmit = () => {
    const message = []
    const child = this.state.child
    const guardian = this.state.guardian
    // if(!child.f_name || !child.l_name || !guardian.f_name || !guardian.l_name) message.push('Guardians and children need first and last names')
    // if(!guardian.phone) message.push('You need to add a phone number for guarians')
    // if(!this.state.rate) message.push('You need to include a rate')
    if(message.length){
      this.setState({
        message: message.join('<br>')
      })
      return
    }
    const account = {...this.state, id: uuid()}
    this.props.addAccount(account)
  }
  
  handleRate = (text) => {
    const charCode = text[text.length - 1].charCodeAt(0)
    if (charCode < 48 || charCode > 57) text = text.slice(0, (text.length - 1))
    this.setState({
      rate: text
    })
  }
  
  render(){
   return (
     <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={-500} behavior="padding" enabled>
      <Header navigation={this.props.navigation}/>
      <ScrollView style={{flex:1}}>
        <Child 
          navigation={this.props.navigation} 
          img_uri={this.props.accounts.newAccount.children.img_uri}
          handleChangeText={this.handleChangeText}
          handlePress={this.handlePress}
        />
        
        <View style={{height:2, backgroundColor:'#ccc', marginHorizontal:20, marginVertical: 40}}></View>

        <Guardian 
          handleChangeText={this.handleChangeText}
        />

        <View style={{ height: 2, backgroundColor: '#ccc', marginHorizontal: 20, marginVertical: 40 }}></View>

        <EmergencyContact
          handleChangeText={this.handleChangeText}
        />


        <View style={{ height: 2, backgroundColor: '#ccc', marginHorizontal: 20, marginVertical: 40 }}></View>
        
        <Text style={styles.h1}>Rate</Text>
        <View style={styles.ratePeriod}>

          <View style={styles.rateHolder}>
            <Image 
              source={require('../assets/kes.png')}
              style={{width:20, height:20, marginTop:15}}
              opacity={0.3}
            />
             <TextInput style={styles.rateInput} placeholder="100" keyboardType="decimal-pad" onChangeText={(text) => { this.handleRate(text) }}/>
          </View>

          <View style={styles.frequencyHolder}>
            <Text style={styles.rateLabel}>{this.state.frequency}</Text>

            <View style={styles.upDownHolder}>

              <TouchableOpacity style={styles.upBtn} onPress={() => this.handleFrequency('up')}>
                 <Icon name="expand-less" color="white"/>
               </TouchableOpacity>

               <TouchableOpacity style={styles.downBtn} onPress={() => this.handleFrequency('down')}>
                 <Icon name="expand-more" color="white"/>
               </TouchableOpacity>

            </View>

          </View>

        </View>

        {this.props.accounts.message || this.state.message
          ?  <ErrorMessage error={this.props.accounts.message || this.state.message}/>
          : null
        }
        <TouchableOpacity style={styles.submit} onPress={this.handleSubmit}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

      </ScrollView>
     </KeyboardAvoidingView>
   )
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({addAccount}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Enrollment)