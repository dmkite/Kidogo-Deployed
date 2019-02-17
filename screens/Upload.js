import React, {Component} from 'react'
import {View, ScrollView, Text, TouchableOpacity, Button, TextInput} from 'react-native'
import {Icon} from 'react-native-elements'
import axios from 'axios'
import {LinearGradient, SecureStore} from 'expo'
import Header from '../components/Header'
import Amplify, { API } from 'aws-amplify';
import awsmobile from '../aws-exports';
import {styles} from '../components/Signup/styles'
import {signIn} from '../utilities/authentication'
import Loading from '../components/Loading'

Amplify.configure(awsmobile);

class Upload extends Component{
  constructor(props){
    super(props)
    this.state={
      username: '',
      password: '',
      hiddenPassword: '',
      focusedOn: null,
      showPassword: false,
      avoidView: false,
      error: false,
      authorized: false,
      playing: false,
      loading: false,
      needSignIn: false,
      token: null
    }
  }
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  componentDidMount = async () => {
    // await SecureStore.deleteItemAsync('_TOKEN')
    let token = await SecureStore.getItemAsync('_TOKEN')
    if(!token) this.setState({needSignIn: true})
    else this.setState({token: JSON.parse(token)})

  }

  setError = (err) => {
    setTimeout(
      () => this.setState({ error: false }),
      5000
    )
    this.setState({ error: err })
  }

  addMargin = (num) => this.setState({ avoidView: num })
  // state = { apiResponse: null };

  getSample = async () => {
    const path = "/centres"; // you can specify the path
    const apiResponse = await API.get("Kidogo", path); //replace the API name
    console.log('response:' + apiResponse);
    this.setState({ apiResponse });
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
      password: password.trim(),
      hiddenPassword: hiddenPassword.trim()
    })
  }

  handleChangeText = (text, val) => {
    this.setState({
      [val]: text
    })
  }

  render(){
    return (
      <LinearGradient
        style={[{ flex: 1 }, this.state.avoidView ? { marginTop: Number(this.state.avoidView) } : null]}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation} />
        <ScrollView>
          {this.state.needSignIn
            ? <View style={{marginTop: 10}}>
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
                
                <TouchableOpacity style={[styles.button, {margin:10}]} onPress={ () => {
                  (this.state.password && this.state.username)
                    ? Promise.all([this.setState({loading: true}), signIn(this.state.username.toLowerCase(), this.state.password, this.handleChangeText, this.setError)])
                    : this.setError('Enter username and password')
                  }}>
                  <Text style={styles.btnText}>sign in</Text>
                </TouchableOpacity>
              </View>
            : null
            }

        </ScrollView>
        {/* <View>
          <Button title="Send Request" onPress={this.getSample} />
          <Text style={{color:'white', fontSize:18}}>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
        </View> */}
        {!!this.state.error
          ? <View style={styles.error}>
              <Text style={styles.errorText}>{this.state.error}</Text>
          </View>
          : null
        }
        {this.state.loading
          ? <Loading />
          : null
        }
      </LinearGradient>
      )
  }
}

export default Upload