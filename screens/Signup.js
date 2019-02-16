import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import {Icon} from 'react-native-elements'
import { connect } from 'react-redux';
import {Caregiver, Centre} from '../components/Signup'
import {LinearGradient, SecureStore} from 'expo'
import uuid from 'uuid'
import {register} from '../cognito-auth'

// import bcrypt from 'bcrypt'

class Signup extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: null,
      password: '',
      hiddenPassword: '',
      f_name: null,
      l_name: null,
      centre_address_1:null,
      centre_address_2: null,
      questionFocus: 'caregiver',
      avoidView: false,
      error:false
    }
  }


  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  changeQuestions = () => {
    if (this.state.questionFocus === 'caregiver') this.setState({questionFocus: 'centre'})
    else this.setState({questionFocus:'caregiver'})
  }

  handlePassword = (text) => {
    let password = this.state.password
    
    
    text.length > this.state.password.length ? password += text[text.length - 1] : password = password.slice(0, password.length - 1)
    let hiddenPassword = ''
    for (let letter of password) {
      hiddenPassword += '*'
    }
    this.setState({
      password,
      hiddenPassword
    })
  }

  handleChangeText = (text, val) => {
    this.setState({
      [val]: text
    })
  }
  
  addMargin = (num) => this.setState({avoidView: num})
  
  componentDidMount = async () => {

  }

  storeAndNavigate = async () => {
    const {username, password, f_name, l_name, centre_address_1, centre_address_2} = this.state
    const caregiverId = uuid()
    const centreId = uuid()
    const caregiver = {
      id: caregiverId,
      username,
      password,
      f_name,
      l_name
    }
    
    const centre = {
      id: centreId,
      centre_address_1,
      centre_address_2
    }
    //will make async server call here.
    try{
      let caregivers = await SecureStore.getItemAsync('_CAREGIVERS')
      if(!caregivers) caregivers = {}
      else caregivers = JSON.parse(caregivers)
      const newCaregivers = {...caregivers}
      if(newCaregivers[username]) return this.setState({error: `Username '${username}' is already taken`})
      else {
        newCaregivers[username] = {
          password, 
          f_name,
          l_name,
          id: caregiverId
        }
        await SecureStore.setItemAsync('_CAREGIVERS', JSON.stringify(newCaregivers))
        this.props.navigation.navigate('Home')
      }
    }catch(err){
      console.error(err)
      this.setState({error:'Something went wrong when making your account'})
    }
  }
  
  render(){
    return (
      <LinearGradient
        style={[{flex:1}, this.state.avoidView ? {marginTop:Number(this.state.avoidView)} : null]}
        colors={['#11011B', '#1A011B']}>
        {this.state.questionFocus === 'caregiver'
          ? <Caregiver 
              handlePassword={this.handlePassword} 
              handleChangeText={this.handleChangeText} 
              addMargin={this.addMargin} 
              {...this.state} 
              changeQuestions={this.changeQuestions}/>
          : <Centre 
              handleChangeText={this.handleChangeText} 
              addMargin={this.addMargin} 
              {...this.state} 
              changeQuestions={this.changeQuestions} 
              storeAndNavigate={this.storeAndNavigate}/>
        }
        { !!this.state.error
          ? <View style={{position:'absolute', top:10, right:10, width:150, height:75, padding:10,}}>
              <Text>{this.state.error}</Text>            
            </View>
          : null
          }
      </LinearGradient>
    )
  }
}

// const mapStateToProps = state

// export default connect(mapStateToProps)(Signup)
export default Signup