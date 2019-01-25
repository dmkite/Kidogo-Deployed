import React, {Component} from 'react'
import {ScrollView, View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { bindActionCreators } from 'redux';
import Header from '../components/Header'
import {connect} from 'react-redux' 
import {Camera, Permissions} from 'expo'
import {Icon, Button} from 'react-native-elements'
import {Child, Guardian, EmergencyContact} from '../components/Forms'
import ErrorMessage from '../components/ErrorMessage'
import {styles} from '../components/Forms/styles'

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
      message: null
    } 
  }

  handleChangeText = (text, type, entry) => {

    this.setState({
      [type]:{
        ...type,
        [entry]: text
      }
    })
  }

  handlePress = (gender) => {
    this.setState({gender})
  }

  hanldeSubmit = async () => {
    console.log('hitting handle submit')
    const message = []
    const child = this.state.child
    const guardian = this.state.guardian
    if(!child.f_name || !child.l_name || !guardian.f_name || !guardian.l_name) message.push('Guardians and children need first and last names')
    if(!guardian.phone) message.push('You need to add a phone number for guarians')
    if(!this.state.rate) message.push('You need to include a rate')
    console.log('message after ifs', message)
    if(message.length){
      //display error message
      this.setState({
        message: message.join('<br>')
      })
    }

    // try{

    // }catch(err){}
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

        {this.props.accounts.message || this.state.message
          ?  <ErrorMessage error={this.props.accounts.message || this.state.message}/>
          : null
        }

        <TouchableOpacity style={styles.submit} onPress={this.handleSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
     </KeyboardAvoidingView>
   )
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators()
export default connect(mapStateToProps)(Enrollment)