import React from 'react'
import {TouchableOpacity, ImageBackground, Text, ScrollView, View} from 'react-native'
import {styles} from './styles'

function ActionButtons(props){
  const {navigate} = props.navigation
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={() => navigate('Enrollment')}>
          <ImageBackground
            style={styles.buttonImage}
            source={require('../../assets/ENROLLMENT.png')}>
          <Text style={styles.actionText}>Add a family</Text>

        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={() => navigate('Attendance')}>
          <ImageBackground
            style={styles.buttonImage} 
            source={require('../../assets/ATTENDANCE.png')}>
          <Text style={styles.actionText}>Attendance</Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={()=> navigate('Finances')}>
          <ImageBackground
            style={styles.buttonImage} 
            source={require('../../assets/FINANCES.png')}>
          <Text style={styles.actionText}>Finances</Text>
        </ImageBackground>
      </TouchableOpacity>
    <TouchableOpacity style={styles.actionButton} onPress={() => navigate('Questions')}>
          <ImageBackground
            source={require('../../assets/QUESTIONS.png')}
            style={styles.buttonImage} >
          <Text style={styles.actionText}>Daily Questions</Text>
          </ImageBackground>
      </TouchableOpacity>
    </View>
  )
}

export default ActionButtons
