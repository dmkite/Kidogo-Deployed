import React from 'react'
import {View, Text, TouchableOpacity,TextInput} from 'react-native'
import {styles} from './styles'


export default function FilterBlock(props){
  return (
    <View style={styles.filterBlock}>
      <TextInput style={styles.search} placeholder="search" onChangeText={(text) => {props.handleSearch(text)}}/>
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