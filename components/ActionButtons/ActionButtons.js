import React from 'react'
import {TouchableOpacity, Image, Text, ScrollView, View} from 'react-native'
import {styles} from './styles'

function ActionButtons(props){
  const {navigate} = props.navigation
  return (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={styles.actionButton} onPress={() => navigate('Enrollment')}>
        <View>
          <Image 
            style={styles.buttonImage}
            source={require('../../assets/ENROLLMENT.png')}
          />
          <Text style={styles.actionText}>Enrollment</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={() => navigate('Attendance')}>
        <View>
          <Image 
            style={styles.buttonImage} 
            source={require('../../assets/ATTENDANCE.png')}
          />
          <Text style={styles.actionText}>Attendance</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} onPress={()=> navigate('Finances')}>
        <View>
          <Image style={styles.buttonImage} />
          <Text style={styles.actionText}>Finances</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <View>
          <Image style={styles.buttonImage} />
          <Text style={styles.actionText}>Daily Questions</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default ActionButtons
