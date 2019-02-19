import React from 'react'
import {styles} from './styles'
import {View, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {SecureStore} from 'expo'

function Header(props){
  const { navigate } = props.navigation
  return (
    <View style={{height:50}}>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={() => navigate('Dash')} style={styles.button}>
          <Icon name="home" color="white" size={30}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Upload')} style={styles.button}>
          <Icon name="cloud-upload" color="white" size={30}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Accounts')} style={styles.button} >
          <Icon name="people" color="white" size={30}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={async () => {
            await SecureStore.setItemAsync('_SIGNEDIN', JSON.stringify(null))
            navigate('Home')
        }} style={styles.button}>

          <Icon name="exit-to-app" color="white" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header