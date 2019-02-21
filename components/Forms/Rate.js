import React from 'react'
import {styles} from './newStyles'
import {View, Text, TextInput, TouchableOpacity, Image, Picker} from 'react-native'
import {Icon} from 'react-native-elements'

export default function Rate(props){
  return (
    <View style={styles.nameHolder}>
      <View style={{ flex: .5, marginRight: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.prefix, props.focusedOn === 'rate' ? styles.focused : null]}>K</Text>
          <TextInput
            style={[styles.input, { flex: .8, marginLeft: 0 }]}
            keyboardType="number-pad"
            value={props.rate}
            onChangeText={(text) => props.handleNumberChange(text, 'rate')}
            onFocus={() => {
              props.changeFocus('focus', 'rate')
              props.addMargin(-425)
            }}
            onBlur={() => {
              props.changeFocus('blur', null)
              props.addMargin(0)
            }} />
        </View>
        <Text style={[styles.label, props.focusedOn === 'rate' ? styles.focused : null]}>Rate</Text>
      </View>
      <View style={{ flex: .5, marginLeft: 5 }}>
        <View style={[styles.input, props.focusedOn === 'rate' ? styles.focused : null, { height: 30, paddingLeft: 0 }]}>
          <Picker
            style={{ color: 'white', marginTop: -10 }}
            selectedValue={props.frequency}
            onValueChange={(itemValue, itemIndex) => props.pickerChange(itemValue)}>
            <Picker.Item label="daily" value="daily" />
            <Picker.Item label="weekly" value="weekly" />
            <Picker.Item label="termly" value="termly" />
          </Picker>
        </View>
        <Text style={styles.label}>frequency</Text>
      </View>
    </View>
  )
}