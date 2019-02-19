import React, {Component} from 'react'
import {View, ScrollView, Text, TouchableOpacity, Button, TextInput, Image} from 'react-native'
import {Icon} from 'react-native-elements'
import axios from 'axios'
import {LinearGradient, SecureStore} from 'expo'
import Header from '../components/Header'
import Amplify, { API, Auth } from 'aws-amplify';
import awsmobile from '../aws-exports';
import {styles} from '../components/Signup/styles'
import {signIn} from '../utilities/authentication'
import Loading from '../components/Loading'
import {get, post} from '../utilities/requests'

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
      token: null,
      apiResponse: null,
      eventId: ''
    }
  }
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }
  handleChangeEventId = (event) => {
    this.setState({eventId: event})
  }

  componentDidMount = async () => {
    // await SecureStore.deleteItemAsync('_TOKEN')
    let token = await SecureStore.getItemAsync('_TOKEN')
    // console.log(token, '===============================')
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

  storeRespone = (apiResponse) => {
    this.setState({apiResponse})
  }

  addMargin = (num) => this.setState({ avoidView: num })
  // state = { apiResponse: null };

  getSample = async () => {
    const user = await Auth.currentAuthenticatedUser()
    const token = user.signInUserSession.idToken.jwtToken
    
    const request = {
      headers: {
        Authorization: token
      }
    };
    console.log(request.headers.Authorization)
    const path = "/centres"; // you can specify the path
    
    const apiResponse = await API.get("Kidogo", path,) //request) //replace the API name
    .catch(err => {
      console.error(err)
    })
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
          <Image
            source={require('../assets/UPLOAD.png')}
            style={{
              height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50
            }}
          />
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
            : <View>
                <TouchableOpacity style={[styles.button, {margin:10}]} onPress={() => post(this.storeResponse, this.setError)}>
                  <Text style={styles.btnText}>Upload</Text>
                </TouchableOpacity>

              <TouchableOpacity style={[styles.button, {margin:10}]} onPress={() => this.handleChangeText(true, 'warning')}>
                  <Text style={styles.btnText}>Download</Text>
                </TouchableOpacity>


                <Button title="Send Request" onPress={this.getSample} />
                <Text style={{ color: 'white', fontSize: 18 }}>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
            </View>
            }

        </ScrollView>
        {this.state.warning
          ? <View style={{position:'absolute', top:0, left:0, right:0, bottom:0, backgroundColor:'#000000bb',}}>
              <Text style={{fontSize:18, color:'#ffffff80', margin:10, marginTop:60}}> 
                <Text style={{fontSize:18, color:'#ffffff80', fontWeight:'bold'}}>WARNING: </Text>
                This will delete your Kidogo records and replace them. Do you wish to continue?
              </Text>
              <View style={{margin:10, marginTop:20, flexDirection:'row'}}>

              <TouchableOpacity style={[styles.button, {flex:0.5, marginRight:5}]} onPress={() => this.handleChangeText(false, 'warning')}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, {flex:0.5, marginLeft:5}]} onPress={() => this.handleChangeText(false, 'warning')}>
                <Text style={styles.btnText}>Download</Text>
              </TouchableOpacity>
              </View>

          </View>
          : null
        }
        
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