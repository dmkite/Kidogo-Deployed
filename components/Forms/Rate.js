import React from 'react'
import {styles} from './styles'
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native'
import {Icon} from 'react-native-elements'

export default function Rate(props){
  return (
    <View>
      <Text style={styles.h1}>Rate</Text>
        <View style={styles.ratePeriod}>

          <View style={styles.rateHolder}>
            <Text style={styles.prefix}>K</Text>
            <TextInput style={styles.rateInput} placeholder="100" keyboardType="decimal-pad" onChangeText={(text) => { props.handleRate(text) }} />
          </View>

          <View style={styles.frequencyHolder}>
            <Text style={styles.rateLabel}>{props.frequency}</Text>

            <View style={styles.upDownHolder}>

              <TouchableOpacity style={styles.upBtn} onPress={() => props.handleFrequency('up')}>
                <Icon name="expand-less" color="white" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.downBtn} onPress={() => props.handleFrequency('down')}>
                <Icon name="expand-more" color="white" />
              </TouchableOpacity>

            </View>

          </View>

        </View>
    </View>
  )
}