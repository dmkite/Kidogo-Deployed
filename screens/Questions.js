import React, {Component} from 'react'
import {TouchableOpacity} from 'react-native'
import { Icon} from 'react-native-elements'
import { MorningQuestions, AfternoonQuestions  } from '../components/Questions'
import { SecureStore, LinearGradient } from 'expo';
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

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
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
    let signedIn = await SecureStore.getItemAsync('_SIGNEDIN')
    const { user: { id } } = JSON.parse(signedIn)
  
    SecureStore.setItemAsync(`_QUESTIONS_${id}`, JSON.stringify(newQuestions))
    
    this.setState({
      [`${TOD}Question${this.state.onQuestion}Answer`]: answer,
      onQuestion: 2
    })
      
    if(onQ == 2) this.props.navigation.navigate('Dash')
  
  }

  render(){
    return (
      <LinearGradient
        style={{ flex: 1, flexDirection:'row' }}
        colors={['#11011B', '#3C233D']}>
        <TouchableOpacity style={{ flex: .15,paddingTop:126 }} onPress={this.moveBack}> 
          <Icon name="chevron-left" size={48} color='#ffffff80'/>
        </TouchableOpacity>

        {(this.state.date.getHours() < 15)
          ? <MorningQuestions onQuestion={this.state.onQuestion} answer={this.answer}/>
          : <AfternoonQuestions onQuestion={this.state.onQuestion} answer={this.answer} />
        }
        <TouchableOpacity style={{ flex: .15, paddingTop: 126}} onPress={this.moveForward}>
          <Icon name="chevron-right" size={48} color='#ffffff80'/>
        </TouchableOpacity>

      </LinearGradient>
    )
  }
}

export default Questions
