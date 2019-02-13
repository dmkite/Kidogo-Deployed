import React, {Component} from 'react'
import {Text, View, TouchableOpacity, Image, TextInput, StyleSheet} from 'react-native'
import Header from '../components/Header/'
import DashBoard from './DashBoard'
import uuid from 'uuid'
import addData from '../seeds'
import {Notification, Notifications} from 'expo'
import {styles} from '../components/Signup/styles'
import {LinearGradient, SecureStore} from 'expo'
import {Icon} from 'react-native-elements'
import getAsync from '../utilities/getAsync'

export default class HomeScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      hiddenPassword:'',
      focusedOn: null,
      showPassword:false,
      avoidView: false,
      error: false,
      authorized:false,
      caregivers: {}
    }
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ff7e09',
      height: 0
    }
  }
  
  changeFocus = (action, type) => {
    if (action === 'focus') this.setState({ focusedOn: type })
    else this.setState({ focusedOn: null })
  }

  showPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
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

  addMargin = (num) => this.setState({ avoidView: num })
  
  handleSignIn = async () => {
    const {newCaregivers} = await getAsync(false, false, false, false, true)
    if (!newCaregivers[this.state.username]) return this.setState({ error: `No username found for ${this.state.username}` })
    else if (newCaregivers[this.state.username].password !== this.state.password) this.setState({ error: 'Incorrect password' })
    else{
      await SecureStore.setItemAsync('_SIGNEDIN', JSON.stringify({user: this.state.username, time: Date.now()}))
      this.props.navigation.navigate('Dash')

    } 
  }

  componentDidMount = async () => {
    const signedIn = SecureStore.getItemAsync('_SIGNEDIN')
    if(signedIn) this.props.navigation.navigate('Dash')
  }

  render(){
    const {navigate} = this.props.navigation
    return (
      <LinearGradient 
        style={[{flex:1}, this.state.avoidView ? {marginTop: Number(this.state.avoidView)} : null]}
        colors={['#11011B', '#1A011B']}>
        <View style={styles.imageHolder}>
          <Image 
            source={require('../assets/kidogo.png')}
            style={{width:180, height:180, margin:20}}
            />
        </View>

        <TextInput
          onFocus={() => {
            this.changeFocus('focus', 'username')
            this.addMargin(-50)
          }}
          onBlur={() => {
            this.changeFocus('blur', null)
            this.addMargin(0)
          }}
          style={[styles.input, this.state.focusedOn === 'username' ? styles.focused : null]}
          value={this.state.username}
          onChangeText={(text) => this.handleChangeText(text, 'username')}
        />
        <Text style={[styles.label, this.state.focusedOn === 'username' ? styles.focused : null]}>Username </Text>

        <View style={styles.passwordHolder}>
          <TextInput
            onFocus={() => {
              this.changeFocus('focus', 'password')
              this.addMargin(-100)
            }}
            onBlur={() => {
              this.changeFocus('blur', null)
              this.addMargin(0)
            }}
            style={[styles.input, { flex: 0.9, marginRight: 0 }, this.state.focusedOn === 'password' ? styles.focused : null]}
            value={this.state.showPassword ? this.state.password : this.state.hiddenPassword}
            onChangeText={(text) => this.handlePassword(text)}
          />
          <View style={[styles.showButton, this.state.focusedOn === 'password' ? styles.focused : null]}>
            <TouchableOpacity onPress={this.showPassword}>
              <Icon name={this.state.showPassword ? "visibility-off" : 'visibility'} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={[styles.label, this.state.focusedOn === 'password' ? styles.focused : null]}>Password</Text>
        
        <TouchableOpacity style={{margin:20, height:50, opacity:0.5}} onPress={() => navigate('Signup')}>
          <Text style={{fontSize:14, color:'white'}}>Sign up for an account</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 },
          (!!this.state.username && !!this.state.password)
            ? styles.ready
            : styles.notReady]} 
          onPress={this.handleSignIn}>
          <Text style={styles.nextText}>sign in</Text>
          <Icon name="chevron-right" size={24} color="white" style={{ flex: 0.1, marginTop: 13 }}/>
        </TouchableOpacity>

        {!!this.state.error
          ? <View style={styles.error}>
            <Text style={styles.errorText}>{this.state.error}</Text>
          </View>
          : null
        }
      </LinearGradient>
    )
  }
}

