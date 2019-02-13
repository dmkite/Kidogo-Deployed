import React, {Component} from 'react'
import {Picker, View, Text, ScrollView, TextInput, TouchableHighlight, Image, TouchableOpacity} from 'react-native'
import {FormLabel, FormInput, Button, Icon} from 'react-native-elements'
import {styles} from './newStyles'
import numberValidation from '../../utilities/numberValidation'
import {LinearGradient} from 'expo'
import { WHEN_PASSCODE_SET_THIS_DEVICE_ONLY } from 'expo/build/SecureStore/SecureStore';

class Child extends Component{
  constructor (props){
    super(props)
    this.state = {
      focusedOn: null,
      img_uri:null,
      f_name:null,
      l_name: null,
      birthdate: null,
      gender: null,
      notes: null
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

  handleDate = (text) => {
    let length = 0
    if(this.state.birthdate && this.state.birthdate.length) length = this.state.birthdate.length 
    this.setState({
      birthdate: numberValidation(text, 'birthdate', length, 2, 5)
    })
  }

  changeFocus = (action, type) => {
    if (action === 'focus') this.setState({ focusedOn: type })
    else this.setState({ focusedOn: null })
  }

  handleChangeText = (text, field) => {
    this.setState({[field]: text})
  }


  addURI = (userData) => { //adding uri reverted state
    this.setState({ ...userData })
  }

  render(){
    return (
      <ScrollView style = {{ flex:1}} >
        {this.state.img_uri
          ? <Image
            source={{uri:this.state.img_uri}}
            style={{
              height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50
            }}
          />
          : <Image
            source={require('../../assets/CHILD.png')}
            style={{
              height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50
            }}
          />
        }
            
           
  
          <TouchableOpacity style={{width:50, opacity:0.5, margin:10}} onPress={() => this.props.navigation.navigate('Camera', {addURI: this.addURI, userData: this.state, addMessage:this.props.addMessage})}>
            <Icon name="camera-alt" size={36} color="white"/>
          </TouchableOpacity>

          <View style={styles.nameHolder}>
            <View style={{ flex: .5, marginRight: 5 }}>
              <TextInput
                onFocus={() => {
                  this.changeFocus('focus', 'f_name')
                  this.props.addMargin(-175)
                }}
                onBlur={() => {
                  this.changeFocus('blur', null)
                  this.props.addMargin(0)
                }}
                style={[styles.input, this.state.focusedOn === 'f_name' ? styles.focused : null]}
                value={this.state.f_name}
                onChangeText={(text) => this.handleChangeText(text, 'f_name')}
              />
              <Text style={[styles.label, this.state.focusedOn === 'f_name' ? styles.focused : null]}>Name</Text>
            </View>

            <View style={{ flex: .5, marginLeft: 5 }}>
              <TextInput
                onFocus={() => {
                  this.changeFocus('focus', 'l_name')
                  this.props.addMargin(-175)
                }}
                onBlur={() => {
                  this.changeFocus('blur', null)
                  this.props.addMargin(0)
                }}
                style={[styles.input, this.state.focusedOn === 'l_name' ? styles.focused : null]}
                value={this.state.l_name}
                onChangeText={(text) => this.handleChangeText(text, 'l_name')}
              />
              <Text style={[styles.label, this.state.focusedOn === 'l_name' ? styles.focused : null]}>Surname</Text>
            </View>
          </View>

        <View style={styles.nameHolder}>
          <View style={{ flex: .5, marginRight: 5 }}>
            <TextInput 
              style={[styles.input, styles.dateInput]}
              maxLength={10}
              keyboardType="number-pad" 
              value={this.state.birthdate} 
              onChangeText={(text) => this.handleDate(text)}
              onFocus={() => {
                this.changeFocus('focus', 'birthdate')
                this.props.addMargin(-250)
              }}
              onBlur={() => {
                this.changeFocus('blur', null)
                this.props.addMargin(0)
              }}/>
              <Text style={[styles.label, this.state.focusedOn === 'birthdate' ? styles.focused : null]}>Birthday <Text style={{fontSize:10}}>(DD-MM-YYYY)</Text></Text>
          </View>
          <View style={{ flex: .5, marginLeft: 5}}>
            <View style={[styles.input, { height:30, paddingLeft:0}] }>
              <Picker
                style={{color:'white', marginTop:-10}}
                selectedValue={this.state.gender}
                onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
                <Picker.Item label="" value={null}/>
                <Picker.Item label="female" value="female" />
                <Picker.Item label="male" value="male" />
                <Picker.Item label="other" value="other" />
              </Picker>
            </View>
            <Text style={styles.label}>Gender</Text>
          </View>
        </View>
          
        <TextInput   
          style={styles.input} 
          multiline={true} 
          value={this.state.notes}
          onChangeText={(text) => this.handleChangeText(text, 'notes')}
          onFocus={() => {
            this.changeFocus('focus', 'notes')
            this.props.addMargin(-350)
          }}
          onBlur={() => {
            this.changeFocus('blur', null)
            this.props.addMargin(0)
          }} />
      
        <Text style={[styles.label, this.state.focusedOn === 'notes' ? styles.focused : null]}>Notes</Text>
   
          <View style={{ flexDirection:'row'}}>
            <TouchableOpacity style={[{flex: .5, marginTop:20}, (!!this.state.f_name && !!this.state.l_name)
                            ? styles.ready
                            : styles.notReady]}
                onPress={
              (!!this.state.f_name && !!this.state.l_name)
                ? () => {
                  this.state
                  let child = { ...this.state }
                  delete child.focusedOn
                  this.props.addToAccount(child, 'children')
                  this.setState({
                    focusedOn: null,
                    img_uri: null,
                    f_name: null,
                    l_name: null,
                    birthdate: null,
                    gender: null,
                    notes: null
                  })
                }
                : null}
            >
                <Text style={styles.nextText}>Add Another</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{ flex: .5,  flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 },
              (!!this.state.f_name && !!this.state.l_name)
                ? styles.ready
                : styles.notReady]}
                onPress={ () => {
                      this.state
                      let child = {...this.state}
                      delete child.focusedOn
                      this.props.addToAccount(child, 'children')
                      this.props.changeQuestionFocus('guardian')
                    }}
              >
                <Text style={styles.nextText}>Next</Text>
              <Icon name="chevron-right" size={24} color='white' style={{ flex: 0.1, marginTop: 13 }} />
            </TouchableOpacity>
          </View>
        </ScrollView > 
    )
  }
}

/**
 onPress={
                  (!!this.state.f_name && !!this.state.l_name)
                    ? () => {
                      this.state
                      let child = {...this.state}
                      delete child.focusedOn
                      this.props.addToAccount(child, 'children')
                      this.props.changeQuestionFocus('guardian')
                    }
                    : null}

                    ADD THIS BACK TO TOUCHABLEOPACITY
 */

export default Child