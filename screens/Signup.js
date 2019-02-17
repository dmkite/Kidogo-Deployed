import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import {Icon} from 'react-native-elements'
import { connect } from 'react-redux';
import {Caregiver, Centre, Confirm} from '../components/Signup'
import {LinearGradient, SecureStore} from 'expo'
import uuid from 'uuid'
import {signUp} from '../utilities/authentication'
import bcrypt from 'react-native-bcrypt'
import {styles} from '../components/Signup/styles'
import getAsync from '../utilities/getAsync'
import Loading from '../components/Loading'

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
      error:false,
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

  changeQuestions = (focusType) => {
    this.setState({questionFocus: focusType})
  }

  handlePassword = (text) => {
    let password = this.state.password
    
    
    text.length > this.state.password.length ? password += text[text.length - 1] : password = password.slice(0, password.length - 1)
    let hiddenPassword = ''
    for (let letter of password) {
      hiddenPassword += '*'
    }
    this.setState({
      password : password.trim(),
      hiddenPassword: hiddenPassword.trim()
    })
  }

  handleChangeText = (text, val) => {
    this.setState({
      [val]: text
    })
  }
  
  addMargin = (num) => this.setState({avoidView: num})

  getCode = () => {
    const {username, password} = this.state
    signUp(username.toLowerCase().trim(), password)
    this.setState({questionFocus: 'confirm'})
  }

  setError = (err) => {
    setTimeout(
      () => this.setState({ error: false }),
      5000
    )
    this.setState({ error: err })
  }

  storeAndNavigate = async () => {
    let { username, password, f_name, l_name, centre_address_1, centre_address_2 } = this.state
    username = username.toLowerCase()
    const caregiverId = uuid()
    const centreId = uuid()

    const centre = {
      id: centreId,
      centre_address_1,
      centre_address_2
    }
    
    try{
      const { newCaregivers, newCentres} = await getAsync(false, false, false, false, true, true)
      let centreFound = false
      newCentres.map(c => {
        if (c.centre_address_1 === centre.centre_address_1) centreFound = true
        return 
      })
      if(!centreFound) newCentres.push(centre)
      if(newCaregivers[username]) return Promise.all([this.setError(`Username ${username} is already taken`), this.setState({loading:false})])
      else {
        let hashedPW
        return bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if(err) return Promise.all([this.setError('Something went wrong when making your account'), this.setState({loading:false})])
            hashedPW = hash
            newCaregivers[username] = {
              password: hashedPW, 
              username: username.trim(),
              f_name: f_name.trim(),
              l_name: l_name.trim(),
              id: caregiverId
            }
            return Promise.all([
              SecureStore.setItemAsync('_CAREGIVERS', JSON.stringify(newCaregivers)),
              SecureStore.setItemAsync('_CENTRES', JSON.stringify(newCentres)),
              this.setState({loading:false}),
              this.props.navigation.navigate('Home')
            ])
          })
        })
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
              changeQuestions={this.changeQuestions}
              handleChangeText={this.handleChangeText}  
              setError={this.setError}
            />
          : this.state.questionFocus === 'centre' 
            ? <Centre 
                handleChangeText={this.handleChangeText} 
                addMargin={this.addMargin} 
                {...this.state} 
                changeQuestions={this.changeQuestions} 
                getCode={this.getCode}
              setError={this.setError}
              />
            :<Confirm 
                username={this.state.username.trim().toLowerCase()}
                handleChangeText={this.handleChangeText}
                navigation={this.props.navigation}
                setError={this.setError}
                storeAndNavigate={this.storeAndNavigate}
              />
        }
        { !!this.state.error
          ? <View style={styles.error}>
              <Text style={styles.errorText}>{this.state.error}</Text>  
              {console.log('error')}          
            </View>
          : null
          }
          {this.state.loading
            ? <Loading/>
            : null
          }
      </LinearGradient>
    )
  }
}

// const mapStateToProps = state

// export default connect(mapStateToProps)(Signup)
export default Signup