import React, {Component} from 'react'
import {Text, View, Button} from 'react-native'
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

  }

  render(){
    const {navigate} = this.props.navigation
    return (
      <View style={{flex: 1}}>
        <Header/>
        <Text>Hello</Text>
        <Button
          title="Login"
          onPress={ () => navigate('Home')}
        />
      </View>
    )
  }
}