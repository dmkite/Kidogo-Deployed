import React, {Component} from 'react'
import {Picker, View, Text, TextInput, TouchableHighlight, Image} from 'react-native'
import {FormLabel, FormInput, Button, Icon} from 'react-native-elements'
import {styles} from './styles'


class Child extends Component{
  constructor (props){
    super(props)
    this.state = {
      female:false,
      male: false,
      other:false
    }
  }

  selectBadge = (gender) => {
    const newState = {...this.state}
    for(let key in newState){
      if(key === gender) newState[key] = true
      else newState[key] = false
    }
    this.setState({...newState})
  }

  render(){
    return (
        <View style = {{ flex:1}}>
          {this.props.img_uri
            ? <Image
                style={styles.image}
                source={{uri: this.props.img_uri}}
              />
            : null
          } 
  
          <TouchableHighlight 
            style={this.props.img_uri ? styles.smallCamera : styles.camera} 
            onPress={() => this.props.navigation.navigate('Camera')}>
            <Icon name="camera-alt" size={this.props.img_uri ? 25 : 50} color="white"/>
          </TouchableHighlight>
          <Text style={styles.label}>First Name:</Text>
          <TextInput style={styles.input} placeholder="John" onChangeText={(text) => this.props.handleChangeText(text, 'f_name')} />
        <Text style={styles.label}>Surname:</Text>
        <TextInput 
          style={styles.input} 
          onChangeText={(text) => this.props.handleChangeText(text, 'l_name')} placeholder="Mwangi" />
        <Text style={styles.label}>Birthdate:</Text>
        <TextInput style={styles.input} keyboardType="number-pad" placeholder="7" onChangeText={(text) => this.props.handleChangeText(text, 'birthdate')}/>
        <Text style={styles.label}>Gender:</Text>
          <View style={styles.badgeHolder}>
            <Text 
              onPress={() => { 
                this.props.handlePress('female') 
                this.selectBadge('female')
              }} 
              style={[styles.badge, this.state.female ? styles.selected : null]}>Female</Text>
          <Text 
            onPress={() => { 
              this.props.handlePress('male') 
              this.selectBadge('male')  
            }} 
            style={[styles.badge, this.state.male ? styles.selected : null]}>Male</Text>
          <Text 
            onPress={() => { 
              this.props.handlePress('other') 
              this.selectBadge('other')  
            }} 
            style={[styles.badge, this.state.other ? styles.selected : null]}>Other</Text>
          </View>
        <Text style={styles.label}>Notes:</Text>
        <TextInput style={styles.input} multiline={true} placeholder="Anything important can go here..."/>
        </View > 
    )
  }
}

export default Child