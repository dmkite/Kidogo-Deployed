import React, {Component} from 'react'
import {View, Text, ScrollView, TextInput, Image, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import {styles} from './styles'

export default class Caregiver extends Component{
  constructor(props){
    super(props)
    this.state = {
      focusedOn: null,
      showPassword: false
    }
  }

  changeFocus = (action, type) => {
    if(action === 'focus') this.setState({ focusedOn: type })
    else this.setState({ focusedOn: null }) 
  }

  showPassword = () => this.setState({showPassword: !this.state.showPassword})

  render(){
    return (
      <ScrollView styles={styles.container}>
        <Text style={[styles.h1, {fontSize: 35}, styles.raleway]}>Add your information</Text>
        <Image source={require('../../assets/CAREGIVER.png')} style={styles.img}/>
        <TextInput
          onFocus={() => {
            this.changeFocus('focus', 'username')
            this.props.addMargin(-75)
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
              this.props.addMargin(-125)
              }}
            onBlur={() => Promise.all([
                this.changeFocus('blur', null),
                this.props.addMargin(0),
                this.props.password.length < 8
                  ? this.props.setError('Password must be at least 8 characters long')
                  : null
              ])}
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
                this.props.addMargin(-250)
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
                this.props.addMargin(-250)
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
        <TextInput
          style={[styles.input, this.state.focusedOn === 'phone' ? styles.focused : null]}
          value={this.props.phone}
          keyboardType="number-pad"
          maxLength={11}
          onFocus={() => {
            this.changeFocus('focus', 'phone')
            this.props.addMargin(-375)
          }}
          onBlur={() => {
              this.changeFocus('blur', null)
              this.props.addMargin(0)
          }}
          onChangeText={(text) => this.props.handleNumberChange(text, 'phone', 3, 7)}
        />
        <Text style={[styles.label, this.state.focusedOn === 'phone' ? styles.focused : null]}>Phone</Text>   
        {(!!this.props.f_name && !!this.props.l_name && this.props.password.length >= 8 && !!this.props.username && this.props.phone.length === 11)
          ? <View style={{flexDirection:'row', height:50, margin:10}} >
              <View style={{flex:0.5}}></View>
              <TouchableOpacity style={[ styles.button, {marginVertical:20, flex:0.5, alignSelf:'flex-end'}]} onPress={ () => this.props.changeQuestions('centre')}>
                <Text style={styles.btnText}>next</Text>
              </TouchableOpacity>
          </View>
          :null
          }
          <View style={{height:75}}></View>
      </ScrollView>
    )
  }
}
