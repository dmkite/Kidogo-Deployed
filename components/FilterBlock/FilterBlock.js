import React from 'react'
import {View, Text, TouchableOpacity,TextInput} from 'react-native'
import {styles} from './styles'
import { styles as formStyles } from '../Forms/newStyles'
import {Icon} from 'react-native-elements'

export default function FilterBlock(props){
  return (
    <View style={styles.filterBlock}>
      {/* <TextInput style={styles.search} placeholder="search" onChangeText={(text) => {props.handleChangeText(text)}} /> */}
      <View style={{ flexDirection: 'row', marginHorizontal:10 }}>
          <View style={[formStyles.prefix, props.focusedOn === 'rate' ? formStyles.focused : null]}>
            <Icon  name="search" color="#ffffff80"/>
          </View>
          <TextInput
            style={[formStyles.input, { flex: .8, marginLeft: 0 }]}
            value={props.rate}
            onChangeText={(text) => props.handleChangeText(text)}
            />
        </View>
      
      <View style={styles.filterHolders}>
        
        <View style={styles.filterOption}>
          <TouchableOpacity style={[styles.radio, props.filter === 'balance' ? styles.selected : null]} onPress={()=>props.handlePress('balance')} />
          <Text style={styles.radioLabel}>Balance</Text>
        </View>
        <View style={styles.filterOption}>
          <TouchableOpacity style={[styles.radio, props.filter === 'alphabetical' ? styles.selected : null]} onPress={() => props.handlePress('alphabetical')}/>
          <Text style={styles.radioLabel}>Alphabetical</Text>
        </View>
      </View>
    
    </View>
  )
}

/**
 
        
 */