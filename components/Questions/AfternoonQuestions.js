import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import {styles} from './styles'
import numberValidation from '../../utilities/numberValidation'

class AfternoonQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      val: null
    }
  }
  render(){
    return (
      <View style={styles.questionHolder}>
        {console.log(this.props.onQuestion)}
        {this.props.onQuestion == 1
          ? <View>
            <Image
              source={require('../../assets/ADULTS.png')}
              style={{
                height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50
              }}
            />
            <Text style={styles.questionText}>How many adults/caregivers were in the centre today?</Text>
            <View style={styles.inputHolder}>
              <TextInput
                style={styles.numberInput}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={text => this.setState({val: numberValidation(text)})}
              />
              <TouchableOpacity style={styles.button} onPress={() => this.props.answer('aft', this.state.val)}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
          : <View>
            <Image
              source={require('../../assets/FOOD.png')}
              style={{
                height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50
              }}
            />
            <Text style={styles.questionText}>Did all children get enough food today?</Text>
            <View style={styles.buttonBlock}>
              <TouchableOpacity
                style={styles.button }
                onPress={() => this.props.answer('aft', 'yes')}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {marginRight: 0, marginLeft: 5 }]}
                onPress={() => this.props.answer('aft', 'no')}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    )
  }
}

export default AfternoonQuestions