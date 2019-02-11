import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import {styles} from './styles'


class MorningQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question2: this.questionList[new Date().getDay()]
    }
  }

  questionList = {
    1: {
      question: 'Does the centre have clean drinking water for kids?',
      image: <Image source={require('../../assets/kes.png')}/>,
    },
    2: {
      question: 'Is there enough play materials and books?',
      image: 'kes.png',
    },
    3: {
      question: 'Is the centre free of any obvious hazards?',
      image: 'kes.png',
    },
    4: {
      question: 'Does the centre have a hand washing station with soap?',
      image: 'kes.png',
    },
    5: {
      question: 'Have you tracked your aHolderttendance and finances this week?',
      image: 'kes.png',
    },
    6: {
      question: 'Were there any accidents or injuries at the centre this week?',
      image: 'kes.png',
    },
  }

  render(){
    return (
      <View style={{flex:.7}}>
        <View style={styles.questionHolder}>
          {this.props.onQuestion === 1
            ? <View>
              <Image source={require('../../assets/kes.png')} style={{ alignSelf: 'center', marginTop: 50 }} />
              <Text style={{ fontSize: 18, marginVertical: 10 }}>Have you cleaned the centre and potties this morning?</Text>
            </View>
            : <View>
              {console.log('hitting')}
              {this.state.question2.image}
              <Text style={{ fontSize: 18, marginVertical: 10 }}>{this.state.question2.question}</Text>
            </View>
          }
        </View>

        <View style={styles.buttonBlock}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'green' }]}
            onPress={() => this.props.answer('morn', 'yes')}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: 'red', marginRight: 0, marginLeft: 5 }]}
            onPress={() => this.props.answer('morn', 'no')}
          >
            <Text style={styles.buttonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

    )
  }
}

export default MorningQuestions