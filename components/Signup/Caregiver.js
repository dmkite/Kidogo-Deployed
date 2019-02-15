import React, {Component} from 'react'
import {View, Text, ScrollView, TextInput, Image, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {LinearGradient} from 'expo'
import {styles} from './styles'

export default class Caregiver extends Component{
  constructor(props){
    super(props)
    this.state = {
      focusedOn: null,
      showPassword: false,
    
    }
  }

  changeFocus = (action, type) => {
    if(action === 'focus') this.setState({ focusedOn: type })
    else this.setState({ focusedOn: null }) 
  }

  showPassword = () => {
    this.setState({showPassword: !this.state.showPassword})
  }


  render(){
    return (
      <ScrollView styles={styles.container}>
          <Image
            source={require('../../assets/CAREGIVER.png')}
          style={{
            height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50, marginBottom: 10}}
          />
          <TextInput
            onFocus={() => {
              this.changeFocus('focus', 'username')
              this.props.addMargin(-50)
              }}
            onBlur={() => {
              this.changeFocus('blur', null)
              this.props.addMargin(0)
              }}
            style={[styles.input, this.state.focusedOn === 'username' ? styles.focused : null]}
            value={this.props.username}
            onChangeText={(text) => this.props.handleChangeText(text, 'username')}
          />
          <Text style={[styles.label, this.state.focusedOn === 'username' ? styles.focused : null]}>Username </Text>
          
          <View style={styles.passwordHolder}>
            <TextInput
              onFocus={() => {
                this.changeFocus('focus', 'password')
                this.props.addMargin(-100)
                }}
              onBlur={() =>{
                 this.changeFocus('blur', null)
                 this.props.addMargin(0)
                 }}
              style={[styles.input, {flex:0.9, marginRight:0}, this.state.focusedOn === 'password' ? styles.focused : null]}
              value={this.state.showPassword ? this.props.password : this.props.hiddenPassword}
              onChangeText={(text) => this.props.handlePassword(text)}
            />
            <View style={[styles.showButton, this.state.focusedOn === 'password' ? styles.focused : null]}>
            <TouchableOpacity onPress={this.showPassword}>
              <Icon name={this.state.showPassword ? "visibility-off" : 'visibility'} color="white" />
            </TouchableOpacity> 
            </View>
          </View>
          <Text style={[styles.label, this.state.focusedOn === 'password' ? styles.focused : null]}>Password</Text>
          <View style={styles.nameHolder}>
            <View style={{flex:.5, marginRight:5}}>
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
                value={this.props.f_name}
                onChangeText={(text) => this.props.handleChangeText(text, 'f_name')}
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
                value={this.props.l_name}
                onChangeText={(text) => this.props.handleChangeText(text, 'l_name')}
              />
              <Text style={[styles.label, this.state.focusedOn === 'l_name' ? styles.focused : null]}>Surname</Text>
            </View>
          </View>
          <TouchableOpacity style={[{flexDirection:'row', justifyContent:'flex-end', marginTop:20},
          (!!this.props.f_name && !!this.props.l_name && !!this.props.password && !!this.props.username) 
            ? styles.ready  
            : styles.notReady]} 
            onPress={
            (!!this.props.f_name && !!this.props.l_name && !!this.props.password && !!this.props.username)
              ? this.props.changeQuestions
              : null}
          >
            <Text style={styles.nextText}>Next</Text>
            <Icon name="chevron-right" size={24} color='white' style={{flex:0.1, marginTop:13}}/>
          </TouchableOpacity>
      </ScrollView>
    )
  }
}

//style={[styles.next, (!!this.props.f_name && !!this.props.l_name && !!this.props.password && !!this.props.username) ? {opacity:1} : null ]}