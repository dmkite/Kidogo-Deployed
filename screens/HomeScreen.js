import React, {Component} from 'react'
import {Text, View, TouchableOpacity, Image, TextInput, StyleSheet} from 'react-native'
import Header from '../components/Header/'
import DashBoard from './DashBoard'
import uuid from 'uuid'
import addData from '../seeds'
import {Notification, Notifications} from 'expo'

export default class HomeScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      balance: 0,
      childrenEnrolled: 0
    }
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ff7e09',
      height: 0
    }
  }
  
  componentDidMount = async () => {
    const { navigate } = this.props.navigation
      // await addData()
      navigate('Questions')
    // if (true) navigate('Payments', {id:"67da9144-e9dc-404f-b4ab-213ee8d1eb69"})
    
  }
  
  render(){
    const {navigate} = this.props.navigation
    return (
      <View style={{flex: 1, padding:10}}>
        <View style={styles.imageHolder}>
          <Image 
            source={require('../assets/kidogo.png')}
            style={[{width:200, height:200}, styles.image]}
            />
        </View>
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input}/>
        <Text style={styles.label}>Password:</Text>
        <TextInput style={[styles.input, {marginBottom:20}]}/>
        <TouchableOpacity style={styles.button} onPress={() => navigate('Dash')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  imageHolder: {
    justifyContent:'center',
    alignItems:'center',
    height:200,
    marginVertical:20
  },
  input: {
    height:50,
    borderWidth:2,
    borderRadius:5,
    borderColor:'#ccc',
    paddingLeft:10
  },
  label: {
    fontSize:24
  },
  button:{
    height:75,
    marginTop:20,
    borderRadius:5,
    backgroundColor:'#ccc',
    marginHorizontal:10
  },
  buttonText: {
    fontSize: 36,
    textAlign:'center',
    color:'white'
  }
})