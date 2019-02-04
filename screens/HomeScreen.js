import React, {Component} from 'react'
import {Text, View, Button, Image, TextInput, StyleSheet, AsyncStorage} from 'react-native'
import Header from '../components/Header/'
import DashBoard from './DashBoard'
import uuid from 'uuid'

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
    const accounts= [{
        children: [{
          img_uri: null,
          f_name: 'Bella',
          l_name: 'Brown',
          birthdate: '21-04-2009',
          gender: 'female',
          notes: null,
          id: uuid()
        },
        {
          img_uri: null,
          f_name: 'Bill',
          l_name: 'Brown',
          birthdate: '09-11-2012',
          gender: 'male',
          notes: null,
          id: uuid()
        }],
        guardians: [{
          f_name: 'Jackson',
          l_name: 'Brown',
          street: '123 Kenyatta Blvd.',
          city: 'Nairobi',
          phone: '55-555-5555',
          govt_id: '123-45-6789',
          id: uuid()
        }],
        e_contacts: [{
          f_name: 'Eric',
          l_name: 'Smith',
          phone: '12-345-6789',
          id:uuid()
        }],
        rate: 75,
        frequency: 'daily',
        balance: 1200,
        id: 'a50496b9-15c5-4542-bbdb-221b85ac8c4e'
      }]
    // try{
    //   await AsyncStorage.clear()
    // }catch(err){
    //   console.error(err)
    // }
    try{
      await AsyncStorage.setItem('_ACCOUNTS', JSON.stringify(accounts))
    }catch(err){
      console.error(err)
    }
    if (true) navigate('Accounts')
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
        <Button
       
          title="Login"
          onPress={ () => navigate('Dash')}
        />
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
    height:50,
    marginTop:20
  }
})