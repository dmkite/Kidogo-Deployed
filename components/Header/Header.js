import React from 'react'
import {styles} from './styles'
import {View, Text} from 'react-native'
import {Icon} from 'react-native-elements'

function Header(props){
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.h1}>Kidogo</Text>
      </View>
      <View style={[styles.header, styles.buttons]}>
        <View style={styles.button}>
          <Icon name="people" color="white" size={30}/>
        </View>
        <View style={styles.button}>
          <Icon name="home" color="white" size={30}/>
        </View>
        <View style={styles.button}>
          <Icon name="cloud-upload" color="white" size={30}/>
        </View>
      </View>
    </View>
  )
}

export default Header