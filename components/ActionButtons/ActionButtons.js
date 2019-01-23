import React from 'react'
import {TouchableHighlight, Image, Text, ScrollView, View} from 'react-native'
import {styles} from './styles'

function ActionButtons(){
  return (
    <ScrollView style={styles.actionsContainer}>
      <TouchableHighlight style={styles.actionButton}>
        <View>
          <Image style={styles.buttonImage}/>
          <Text style={styles.actionText}>Enrollment</Text>
        </View>
      </TouchableHighlight>
    </ScrollView>
  )
}

export default ActionButtons
