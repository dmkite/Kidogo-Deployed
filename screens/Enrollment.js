import React, {Component} from 'react'
import {ScrollView, View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import { bindActionCreators } from 'redux';
import Header from '../components/Header'
import {connect} from 'react-redux' 
import {Camera, Permissions} from 'expo'
import {Icon, Button} from 'react-native-elements'
import {Child, Guardian} from '../components/Forms'
import ErrorMessage from '../components/ErrorMessage'


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
      }
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

          {this.props.accounts.message 
            ?  <ErrorMessage error={this.props.accounts.message}/>
            : null}
         <Button large title="Submit" />
      </ScrollView>
     </KeyboardAvoidingView>
   )
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
// const mapDispatchToProps = dispatch => bindActionCreators()
export default connect(mapStateToProps)(Enrollment)