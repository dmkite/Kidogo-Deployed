import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { styles } from './styles'

export default function EmergencyContactDetails(props) {
  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={() => { props.openDetails('e_contacts') }}>
        <Text style={styles.h2}>Contacts</Text>
        <Icon name={props.currentlyExpanded === 'e_contacts' ? "expand-less" : "expand-more"} size={36} color="#ffffff80"/>
      </TouchableOpacity>

      {props.currentlyExpanded === 'e_contacts'
        ? <View>
        {props.e_contacts.map((eC, i) => {
          return (
            <View style={styles.childDetails} key={i}>
              <View style={[styles.imgAndName, { height: 50 }]}>
                <Text style={[styles.name, { marginLeft: -5, lineHeight: 50 }]}>{eC.f_name + ' ' + eC.l_name}</Text>
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
          <TouchableOpacity style={styles.button} onPress={() => props.openForm('e_contacts')}>
            <View style={{flexDirection:'row'}}>
              <Icon name="person-add" color="#ffffff80" size={18} style={{marginRight:5}} />
              <Text style={[styles.btnText, {marginLeft:5}]}>Add contact</Text>
            </View>
          </TouchableOpacity>
        </View> 
        : null
      }
      {/* <View style={{ height: 2, backgroundColor: '#ffffff80', marginVertical: 20 }}></View> */}

    </View>
  )
}