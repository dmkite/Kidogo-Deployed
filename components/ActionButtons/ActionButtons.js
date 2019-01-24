import React from 'react'
import {TouchableHighlight, Image, Text, ScrollView, View} from 'react-native'
import {styles} from './styles'

function ActionButtons(props){
  const {navigate} = props.navigation
  return (
    <View style={styles.actionsContainer}>
      <TouchableHighlight style={styles.actionButton} onPress={() => navigate('Enrollment')}>
        <View>
          <Image style={styles.buttonImage}/>
          <Text style={styles.actionText}>Enrollment</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.actionButton}>
        <View>
          <Image style={styles.buttonImage} />
          <Text style={styles.actionText}>Attendance</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.actionButton}>
        <View>
          <Image style={styles.buttonImage} />
          <Text style={styles.actionText}>Finances</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight style={styles.actionButton}>
        <View>
          <Image style={styles.buttonImage} />
          <Text style={styles.actionText}>Daily Questions</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

export default ActionButtons
