import React, {Component} from 'react'
import {View, ScrollView, Text, TouchableOpacity, TextInput, Image} from 'react-native'
import {Icon} from 'react-native-elements'
import {LinearGradient, SecureStore} from 'expo'
import Header from '../components/Header'
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';
import {styles} from '../components/Signup/styles'
import Modal from '../components/Upload/Modal'
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
      eventId: '',
      newData: null,
      showDif: false,
    }
  }
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  handleChangeEventId = event => this.setState({eventId: event})

  componentDidMount = async () => {
    let token = await SecureStore.getItemAsync('_TOKEN')
    if(!token) this.setState({needSignIn: true})
    else this.setState({token: JSON.parse(token)})

  }

  setError = (err) => {
    setTimeout( () => this.setState({ error: false }), 5000 )
    this.setState({ error: err })
  }

  addMargin = num => this.setState({ avoidView: num })

  changeFocus = (action, type) => {
    if (action === 'focus') this.setState({ focusedOn: type })
    else this.setState({ focusedOn: null })
  }

  showPassword = () => this.setState({ showPassword: !this.state.showPassword })

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

  changeLoading = (val) => {
    if(!val) this.setState({loading: !this.state.loading})
    else this.setState({loading: val})
  }

  handleChangeText = (text, val) => this.setState({[val]: text})

  addPrompt = (dif, data) => {
    this.setState({
      dif, 
      newData: data, 
      showDif: true
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
                    ? Promise.all([this.setState({loading: true}), signIn(this.state.username.toLowerCase(), this.state.password, this.handleChangeText, this.setError), this.setState({loading:false})])
                    : this.setError('Enter username and password')
                  }}>
                  <Text style={styles.btnText}>sign in</Text>
                </TouchableOpacity>
              </View>
            : <View style={{marginTop:10}}>
                <TouchableOpacity style={[styles.button, {marginHorizontal:10}]} onPress={() => Promise.all([this.changeLoading(), post(this.setError, this.changeLoading)])}>
                  <Text style={styles.btnText}>Upload</Text>
                </TouchableOpacity>

              <TouchableOpacity style={[styles.button, {margin:10}]} onPress={() => this.handleChangeText(true, 'warning')}>
                  <Text style={styles.btnText}>Download</Text>
                </TouchableOpacity>
            </View>
            }

        </ScrollView>
        {this.state.warning
          ? <View style={styles.modal}>
              <Text style={{fontSize:18, color:'#ffffff80', margin:10, marginTop:60}}> 
                <Text style={{fontSize:18, color:'#ffffff80', fontWeight:'bold'}}>WARNING: </Text>
                This will delete your Kidogo records and replace them. Do you wish to continue?
              </Text>
              <View style={{margin:10, marginTop:20, flexDirection:'row'}}>

              <TouchableOpacity style={[styles.button, {flex:0.5, marginRight:5}]} onPress={() => this.handleChangeText(false, 'warning')}>
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.button, {flex:0.5, marginLeft:5}]} onPress={() => Promise.all([this.changeLoading(), get(this.setError, this.changeLoading, this.addPrompt), this.handleChangeText(false, 'warning')])}>
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
        {this.state.showDif
          ? <Modal
              handleChangeText={this.handleChangeText}
              dif={this.state.dif}
              changeLoading={this.changeLoading}
              setError={this.setError}
              newData={this.state.newData}
          />
          : null
        }
      </LinearGradient>
      )
  }
}

export default Upload