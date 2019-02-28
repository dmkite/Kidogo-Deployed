import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import { styles } from './styles'

export default class Caregiver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focusedOn: null,
    }
  }

  changeFocus = (action, type) => {
    if (action === 'focus') this.setState({ focusedOn: type })
    else this.setState({ focusedOn: null })
  }

  render(){
    return (
      <ScrollView>

        <Text style={styles.h1}>Add centre address</Text>

        <Image
          source={require('../../assets/CENTRE.png')}
          style={styles.img}
        />

        <TextInput
          onFocus={() => {
            this.changeFocus('focus', 'centre_address_1')
            this.props.addMargin(-50)
            }}
          onBlur={() => {
            this.changeFocus('blur', null)
            this.props.addMargin(0)
            }}
          style={[styles.input, this.state.focusedOn === 'centre_address_1' ? styles.focused : null]}
          value={this.props.centre_address_1}
          onChangeText={(text) => this.props.handleChangeText(text, 'centre_address_1')}
          blurOnSubmit={false}
          onSubmitEditing={() => this.cityInput.focus()}
        />

        <Text style={[styles.label, this.state.focusedOn === 'centre_address_1' ? styles.focused : null]}>Centre Address</Text>

        <TextInput
          onFocus={() => {
            this.changeFocus('focus', 'centre_address_2')
            this.props.addMargin(-150)
            }}
          onBlur={() => {
            this.changeFocus('blur', null)
            this.props.addMargin(0)
            }}
          style={[styles.input, {width:150}, this.state.focusedOn === 'centre_address_2' ? styles.focused : null]}
          value={this.props.centre_address_2}
          onChangeText={(text) => this.props.handleChangeText(text, 'centre_address_2')}
          ref={(input) => this.cityInput = input}
          blurOnSubmit={false}
          onSubmitEditing={this.props.getCode}
        />

        <Text style={[styles.label, this.state.focusedOn === 'centre_address_2' ? styles.focused : null]}>City</Text>

        {this.props.centre_address_1 && this.props.centre_address_2
          ? <View style={{marginVertical:20, marginHorizontal:10, flexDirection:'row', justifyContent:'space-between'}}> 
              <TouchableOpacity style={[styles.button, { flex:0.5, marginRight:5}]} onPress={() => this.props.changeQuestions('caregiver')}>
                <Text style={styles.btnText}>back</Text>
              </TouchableOpacity>

        
              <TouchableOpacity style={[styles.button, { flex: 0.5, marginLeft: 5 }]} onPress={this.props.getCode}>
                <Text style={styles.btnText}>get code</Text>
              {/* <TouchableOpacity style={[styles.button, {flex:0.5, marginLeft:5}]} onPress={this.props.storeAndNavigate}>
                <Text style={styles.btnText}>sign in</Text> */}
              </TouchableOpacity>
            
            </View>
          : null
        }

        <View style={{height:75}}></View>
      
      </ScrollView> 
    )
  }
}
