import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { styles } from './styles'

export default function EmergencyContactDetails(props) {
  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={() => { props.openDetails('e_contacts') }}>
        <Text style={styles.h1}>Contacts</Text>
        <Icon name={props.currentlyExpanded === 'e_contacts' ? "expand-less" : "expand-more"} size={36} color="white"/>
      </TouchableOpacity>

      <View style={{ height: 2, backgroundColor: '#ccc', margin: 20 }}></View>

      {props.currentlyExpanded === 'e_contacts'
        ? <View>
        {props.e_contacts.map((eC, i) => {
          return (
            <View style={styles.childDetails} key={i}>
              <View style={styles.imgAndName}>
                <Text style={[styles.topic, styles.name]}>{eC.f_name + ' ' + eC.l_name}</Text>
                <TouchableOpacity style={styles.editBtn} onPress={ () => props.navigation.navigate('EditMember', {editing: eC, acctId: props.acctId, type:'e_contacts'})}>
                  <Icon name="edit" color="#ccc" />
                </TouchableOpacity>
              </View>

              <View style={styles.generalDetails}>
                <View style={styles.row}>
                  <Text style={styles.topic}>Phone:</Text>
                  <Text style={styles.text}>{eC.phone || 'unknown'}</Text>
                </View>
              </View>
            </View>
          )})
        }
          <TouchableOpacity style={styles.addBtn} onPress={() => props.openForm('e_contacts')}>
            <Icon name="person-add" color="white" size={35} />
          </TouchableOpacity>
        </View> 
        : null
      }

    </View>
  )
}