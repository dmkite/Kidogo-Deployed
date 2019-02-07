import React, {Component} from 'react'
import {Picker, View, Text, TextInput, TouchableHighlight, Image, TouchableOpacity} from 'react-native'
import {FormLabel, FormInput, Button, Icon} from 'react-native-elements'
import {styles} from './styles'

class Child extends Component{
  constructor (props){
    super(props)
    this.state = {
      gender:{
        female:false,
        male: false,
        other:false
      },
      date:''
    }
  }

  selectBadge = (gender) => {
    const newState = {...this.state}
    for(let key in newState.gender){
      if(key === gender) newState[key] = true
      else newState[key] = false
    }
    this.setState({...newState})
  }

  handlePhoneNumber = (text, num1, num2) => {
    const charCode = text[text.length -1].charCodeAt(0)
    if(charCode < 48 || charCode > 57) text = text.slice(0, (text.length - 1))
    if(text.length === num1 || text.length === num2) text += '-'
    this.setState({
      date: text
    })
  }

  render(){
    return (
        <View style = {{ flex:1}} >
          <Text style={[styles.h1, {marginTop:50}]}>Child</Text>
            
          {this.props.img_uri
            ? <Image
                style={styles.image}
                source={{uri: this.props.img_uri}}
              />
            : null
          } 
  
          <TouchableHighlight 
            style={this.props.img_uri ? styles.smallCamera : styles.camera} 
            onPress={() => this.props.navigation.navigate('Camera', {addURI: this.props.addURI, addMessage:this.props.addMessage})}>
            <Icon name="camera-alt" size={this.props.img_uri ? 25 : 50} color="white"/>
          </TouchableHighlight>

          <Text style={styles.label}>First Name:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="John" 
            onChangeText={(text) => this.props.handleChangeText(text, 'children', 'f_name')} 
          />
        
          <Text style={styles.label}>Surname:</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={(text) => this.props.handleChangeText(text, 'children', 'l_name')} placeholder="Mwangi" 
          />
          
          <Text style={styles.label}>Birthdate:</Text>
          <TextInput 
            style={[styles.input, styles.dateInput]}
            maxLength={10}
            keyboardType="number-pad" 
            placeholder="DD-MM-YYYY" 
            value={this.state.date} 
            onChangeText={(text) => {
              this.handlePhoneNumber(text, 2, 5)
              this.props.handleChangeText(text, 'children', 'birthdate')
            }}/>
          
          <Text style={styles.label}>Gender:</Text>
          <View style={styles.badgeHolder}>
            <Text 
              onPress={() => { 
                this.props.handlePress('female') 
                this.selectBadge('female')
              }} 
              style={[styles.badge, this.state.female ? styles.selected : null]}>
              Female
            </Text>
            <Text 
              onPress={() => { 
                this.props.handlePress('male') 
                this.selectBadge('male')  
              }} 
              style={[styles.badge, this.state.male ? styles.selected : null]}>
              Male
            </Text>
          <Text 
            onPress={() => { 
              this.props.handlePress('other') 
              this.selectBadge('other')  
            }} 
            style={[styles.badge, this.state.other ? styles.selected : null]}>Other</Text>
          </View>
        <Text style={styles.label}>Notes:</Text>
        <TextInput   
          style={[styles.input, styles.textarea]} 
          multiline={true} 
          placeholder="Anything important can go here..."
          onChangeText={(text) => this.props.handleChangeText(text, 'children', 'notes')}
        />
        </View > 
    )
  }
}

export default Child