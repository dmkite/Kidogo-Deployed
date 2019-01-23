import React, {Component} from 'react'
import {Picker, View, Text, TouchableHighlight, Image} from 'react-native'
import {FormLabel, FormInput, Button, Icon} from 'react-native-elements'
import {styles} from './styles'


function Child(props){
  return (
      <View style = {{ flex:1}}>
        {console.log(props.img_uri)}
        {props.img_uri
          ? <Image
              style={styles.image}
              source={{uri:props.img_uri}}
            />
          : null
        } 

        <TouchableHighlight style={props.img_uri ? styles.smallCamera : styles.camera} onPress={() => props.navigation.navigate('Camera')}>
          <Icon name="camera-alt" size={props.img_uri ? 25 : 50} color="white"/>
        </TouchableHighlight>
        <FormLabel>First Name:</FormLabel>
        <FormInput placeholder="John" />
        <FormLabel>Surname:</FormLabel>
        <FormInput placeholder="Mwangi" />
        <Button large title="Submit" />
      </View > 
  )
}

export default Child