import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
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
      image: <Image
                source={require('../../assets/WATER.png')}
                style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50 }} />
    },
    2: {
      question: 'Is there enough play materials and books?',
      image: <Image
                source={require('../../assets/TOYS.png')}
                style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50 }} />
    },
    3: {
      question: 'Is the centre free of any obvious hazards?',
      image: <Image
                source={require('../../assets/HAZARDS.png')}
                style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50 }} />
    },
    4: {
      question: 'Does the centre have a hand washing station with soap?',
      image: <Image
                source={require('../../assets/HANDWASH.png')}
                style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50 }} />
    },
    5: {
      question: 'Have you tracked your attendance and finances this week?',
      image: <Image
                source={require('../../assets/DOCUMENTS.png')}
                style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50}}/>
    },
    6: {
      question: 'Were there any accidents or injuries at the centre this week?',
      image: <Image
                source={require('../../assets/INJURIES.png')}
                style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50 }} />
    },
  }

  render(){
    return (
      <View style={{flex:.7}}>
        <View style={styles.questionHolder}>
          {this.props.onQuestion === 1
            ? <View>
              <Image
                source={require('../../assets/CLEAN.png')}
                style={{
                  height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50
                }}
              />
              <Text style={styles.questionText}>Have you cleaned the centre and potties this morning?</Text>
            </View>
            : <View>
              {this.state.question2.image}
              <Text style={styles.questionText}>{this.state.question2.question}</Text>
            </View>
          }
        </View>

        <View style={styles.buttonBlock}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.answer('morn', 'yes')}
          >
            <Text style={styles.buttonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginRight: 0, marginLeft: 5 }]}
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