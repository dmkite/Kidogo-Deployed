import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import { styles } from './styles'
import { styles as cardStyles} from '../AccountCard/styles'

export default function ChildDetails(props){
  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={() => {props.openView('openChild')}}> 
        <Text style={styles.h1}>Children</Text>
        <Icon name={props.isOpen ? "expand-less" : "expand-more"} size={36}/>
      </TouchableOpacity>
      
      <View style={{ height: 2, backgroundColor: '#ccc', margin:20 }}></View>
      
      {props.isOpen 
       ? <View>
          {props.children.map((child, i) => {
            return (
              <View style={styles.childDetails} key={i}>
                

                <View style={styles.imgAndName}>
                  {child.img_uri 
                    ? <Image style={[cardStyles.circle, cardStyles.img]} source={require('../../assets/kes.png')}/>
                    : <Text style={[cardStyles.circle, {backgroundColor:'#ccc', marginRight: 10, marginTop: 0, marginLeft: 0}]}>{child.f_name[0].toUpperCase()}</Text>}
                  <Text style={[styles.topic, styles.name]}>{child.f_name + ' ' + child.l_name}</Text>
                
                  <TouchableOpacity style={styles.editBtn} onPress={() => props.navigation.navigate('EditMember', {editing: child, acctId: props.acctId, type:'children'})}>
                    <Icon name="edit" color="#ccc" />
                  </TouchableOpacity>
                
                </View>

                <View style={styles.generalDetails}>
                  <View style={styles.row}>
                    <Text style={styles.topic}>Birthdate:</Text>  
                    <Text style={styles.text}>{child.birthdate || 'unknown'}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.topic}>Gender:</Text>
                    <Text style={styles.text}>{child.gender || 'unknown'}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.topic}>Notes:</Text>
                    <Text style={styles.text}>{child.notes || 'none' }</Text>
                  </View>
              </View>
              
              </View>
              )
            })}

          <TouchableOpacity style={styles.addBtn} onPress={() => props.openAddMember('children')}>
            <Icon name="person-add" color="white" size={35}/>
          </TouchableOpacity>
       </View>
        
      : null
      }
    </View>
  )
}