import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native'
import { Icon} from 'react-native-elements'
import { MorningQuestions  } from '../components/Questions'
import { SecureStore } from 'expo';
import Dates from '../utilities/dates';

class Questions extends Component{
  constructor(props){
    super(props)
    this.state = {
      date: new Date(),
      onQuestion: 1,
      mornQuestion1Answer: null,
      mornQuestion2Answer: null,
      aftQuestion1Answer: null,
      aftQuestion2Answer: null
    }
  }

  moveBack = () => {
    this.state.onQuestion == 1
      ? null
      : this.setState({ onQuestion: 1 })
  }

  moveForward = () => {
      this.state.onQuestion == 1
        ? this.setState({ onQuestion: 2 })
        : null
  }

  answer = async (TOD, answer) => {
    const today = new Dates().getToday()
    const onQ = this.state.onQuestion
    
    let questions = await SecureStore.getItemAsync('_QUESTIONS')
    
    if(!questions) questions = {}
    else questions = JSON.parse(questions)
    const newQuestions = {...questions}
    if(!newQuestions[today]) newQuestions[today] = {morning: {}, afternoon:{}}
    TOD === 'morn' 
      ? newQuestions[today].morning = {question1: this.state.mornQuestion1Answer, question2: this.state.mornQuestion2Answer}
      : newQuestions[today].afternoon = { question1: this.state.aftQuestion1Answer, question2: this.state.aftQuestion2Answer }
    SecureStore.setItemAsync('_QUESTIONS', JSON.stringify(newQuestions))
    
    this.setState({
      [`${TOD}Question${this.state.onQuestion}Answer`]: answer,
      onQuestion: 2
    })
      
    if(onQ == 2) this.props.navigation.navigate('Dash')
  
  }

  render(){
    return (
      <View style={{flex:1, flexDirection:'row'}}>
        {console.log(this.state)}
        <TouchableOpacity style={{ flex: .15 }} onPress={this.moveBack}> 
          <Icon name="chevron-left" size={48}/>
        </TouchableOpacity>

        {this.state.date.getHours() < 15
          ? <MorningQuestions onQuestion={this.state.onQuestion} answer={this.answer}/>
         : null
        }
        <TouchableOpacity style={{flex:.15}} onPress={this.moveForward}>
          <Icon name="chevron-right" size={48}/>
        </TouchableOpacity>

      </View>
    )
  }
}

export default Questions
