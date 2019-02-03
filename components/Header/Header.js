import React from 'react'
import {styles} from './styles'
import {View, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

function Header(props){
  const { navigate } = props.navigation
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.h1}>Kidogo</Text>
      </View>
      <View style={[styles.header, styles.buttons]}>
        <TouchableOpacity onPress={() => navigate('Accounts')} style={styles.button} >
          <Icon name="people" color="white" size={30}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Dash')} style={styles.button}>
          <Icon name="home" color="white" size={30}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="cloud-upload" color="white" size={30}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header