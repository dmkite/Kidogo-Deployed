import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { LinearGradient } from 'expo'
import { styles } from './styles'
import {signUp} from '../../utilities/authentication'

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
        <Image
          source={require('../../assets/CENTRE.png')}
          style={{ height: 200, width: 200, alignSelf: 'center', borderRadius: 100, marginTop: 50, marginBottom: 10 }}
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
        />
        <Text style={[styles.label, this.state.focusedOn === 'centre_address_1' ? styles.focused : null]}>Centre Address </Text>

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
        />
        <Text style={[styles.label, this.state.focusedOn === 'centre_address_2' ? styles.focused : null]}>City </Text>
        
        <View style={{marginVertical:20, marginHorizontal:10, flexDirection:'row', justifyContent:'space-between'}}>
          <TouchableOpacity style={[{ flexDirection: 'row', width:150 },
          (!!this.props.centre_address_1 && !!this.props.centre_address_2)
            ? styles.ready
            : styles.notReady]}
            onPress={() => this.props.changeQuestions('caregiver')}
          >
            <Icon name="chevron-left" size={24} color='white' style={{ flex: 0.1, marginTop: 13 }} />
            <Text style={styles.nextText}>back</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[{ flexDirection: 'row', justifyContent: 'flex-end', width:150 },
          (!!this.props.centre_address_1 && !!this.props.centre_address_2)
            ? styles.ready
            : styles.notReady]}
            onPress={() => {
              (!!this.props.centre_address_1 && !!this.props.centre_address_2)
                ? this.props.getCode()
                : this.props.setError('Make sure to enter a street address and city')
            }}
          >
            <Text style={styles.nextText}>get code</Text>
            {/* <Icon name="chevron-right" size={24} color='white' style={{ flex: 0.1, marginTop: 13 }} /> */}
          </TouchableOpacity>
        </View>
      
      </ScrollView>
    )
  }
}
