import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
import {SecureStore} from 'expo'
import { Auth } from 'aws-amplify';

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
        <TouchableOpacity onPress={() => {
          return Promise.all([
            SecureStore.setItemAsync('_SIGNEDIN', JSON.stringify(null)),
            SecureStore.deleteItemAsync('_TOKEN'),
            Auth.signOut(),
            navigate('Home')
          ]).catch(err => console.error(err));
        }} style={styles.button}>

          <Icon name="exit-to-app" color="white" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    height: 50,
    backgroundColor: '#0C000E',
    flexDirection: 'row',
    flexWrap: 'nowrap'
  },
  button: {
    flex: .25,
    paddingTop: 10
  }
})

export default Header