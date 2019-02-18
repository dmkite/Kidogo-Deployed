import React, {Component} from 'react'
import {Text, View, TouchableOpacity, Image, TextInput, StyleSheet} from 'react-native'
import {Audio} from 'expo'
import {styles} from '../components/Signup/styles'
import {LinearGradient, SecureStore} from 'expo'
import {Icon} from 'react-native-elements'
import getAsync from '../utilities/getAsync'
import bcrypt from 'react-native-bcrypt'
import Loading from '../components/Loading'

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
      caregivers: {},
      showHelp: false,
      playing: false,
      loading:false
    }
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
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
      password: password.trim(),
      hiddenPassword: hiddenPassword.trim()
    })
  }

  handleChangeText = (text, val) => {
    this.setState({
      [val]: text.trim()
    })
  }

  addMargin = (num) => this.setState({ avoidView: num })
  
  handleSignIn = async () => {
    const {newCaregivers} = await getAsync(false, false, false, false, true)
    if (!newCaregivers[this.state.username.toLowerCase()]) return this.setState({ loading:false, error: `No username found for ${this.state.username}` })
    else{
      console.log(this.state.password, newCaregivers[this.state.username.toLowerCase()])

      return bcrypt.compare(this.state.password, newCaregivers[this.state.username.toLowerCase()].password, (err, res) => {
        console.log('error: ', err, 'response :', res)
        if(err || !res) return this.setState({ loading: false, error: 'Incorrect password' })
        else{
          SecureStore.setItemAsync('_SIGNEDIN', JSON.stringify({user: this.state.username, time: Date.now()}))
          .then(() => {
            this.setState({loading: false})
            this.props.navigation.navigate('Dash')
          })
        }
      })

    } 
  }

  componentDidMount = async () => {
    // return this.props.navigation.navigate('Payments', {
    //   id: '3c3737b7-2bae-46ea-a065-d4d334e9bb0f'})
    return this.props.navigation.navigate('Upload')
    let message = this.props.navigation.getParam('message')
    setTimeout( () => this.setState({ showHelp: !this.state.showHelp }), 15000)
    if(message) this.setState({error:message})
    let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
    if(signedIn) signedIn = JSON.parse(signedIn)

    if(signedIn) this.props.navigation.navigate('Dash')
  }

  
  playAudio = async () => {
    if (this.state.playing === true) return
    this.setState({ playing: true })
    setTimeout(
      () => this.setState({ playing: false }), 20000
    )
    const soundObject = new Audio.Sound()
    try{
      await soundObject.loadAsync(require('../assets/signin.mp3'))
      await soundObject.playAsync()
    }catch(err){
      console.error(err)
      this.setState({error:'We could not play the audio file'})
    }
  }  

  render(){
    const {navigate} = this.props.navigation
    return (
      <LinearGradient 
        style={[{flex:1}, this.state.avoidView ? {marginTop: Number(this.state.avoidView)} : null]}
        colors={['#11011B', '#3C233D']}>
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
        
        <View style={{flexDirection:'row', justifyContent:'space-between', height:50}}>
          <TouchableOpacity style={{margin:20, height:50, opacity:0.5}} onPress={() => navigate('Signup')}>
            <Text style={{fontSize:14, color:'white'}}>Sign up for an account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[{ flexDirection: 'row', justifyContent: 'flex-end' },
            (!!this.state.username && !!this.state.password)
              ? styles.ready
              : styles.notReady]} 
            onPress={() => {
              return Promise.all([this.setState({loading:true}), this.handleSignIn()])
              }}>
            <Text style={styles.nextText}>sign in</Text>
            <Icon name="chevron-right" size={24} color="white" style={{ flex: 0.1, marginTop:15 }}/>
          </TouchableOpacity>
        </View>

        {!!this.state.error
          ? <View style={styles.error}>
            <Text style={styles.errorText}>{this.state.error}</Text>
          </View>
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
          {this.state.loading
            ? <Loading />
            : null
          }
        

      </LinearGradient>
    )
  }
}

