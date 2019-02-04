import React from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import {styles} from './styles'
import {Icon} from 'react-native-elements'

export default function RateDetails(props) {
  return (
    <View>
      <View style={styles.balanceDisplay}>
        {props.editBalance
          ? <View style={{flex:1}}>
              <View style={styles.balanceEdit}>
                <Text style={styles.balance}>K</Text>
                <TextInput 
                  style={[styles.balance, styles.balanceInput]} 
                  autofocus={true} 
                  keyboardType="number-pad" 
                  onChangeText={(text) => props.changeBalance(text)} 
                  placeholder={String(props.balance)}
                />

              </View>
              
              <View style={styles.buttonBlock}>
                
                <TouchableOpacity style={[styles.rateBtn, { marginRight: 5 }]}>
                  <Text style={styles.btnText} onPress={() => props.changeField('balance', 'newBalance')}>Change</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.rateBtn, { marginLeft: 5 }]}>
                  <Text style={styles.btnText} onPress={() => props.openView('editBalance')}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          : <Text style={styles.balance}> K {props.balance}</Text>
        }

        <TouchableOpacity style={styles.editBtn} onPress={() => props.openView('editBalance')}>
          <Icon name="edit" size={24} color='red'/>
        </TouchableOpacity>

      </View>
      <Text style={styles.rateFreq}>K {props.rate} {props.frequency}</Text>
      <View style={styles.buttonBlock}>
        <TouchableOpacity style={[styles.rateBtn, {marginRight:5}]}>
          <Text style={styles.btnText}>Make Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.rateBtn, { marginLeft: 5 }]}>
          <Text style={styles.btnText}>Change Rate</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}