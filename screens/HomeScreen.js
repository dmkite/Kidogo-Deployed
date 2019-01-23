import React, {Component} from 'react'
import {Text, View, Button, Image, TextInput, StyleSheet} from 'react-native'
import Header from '../components/Header/'
import DashBoard from './DashBoard'

export default class HomeScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
      balance: 0,
      childrenEnrolled: 0
    }
  }
  
  componentDidMount = () => {
    const { navigate } = this.props.navigation
    if (true) navigate('Dash')
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