import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import { styles } from './styles'
import { styles as cardStyles} from '../AccountCard/styles'

export default function ChildDetails(props){
  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={() => {props.openDetails('children')}}> 
        <Text style={styles.h2}>Children</Text>
        <Icon name={props.currentlyExpanded === 'children' ? "expand-less" : "expand-more"} size={36} color="#ffffff80"/>
      </TouchableOpacity>
      
      
      {props.currentlyExpanded === 'children'
       ? <View>
          {props.children.map((child, i) => {
            return (
              <View style={[styles.childDetails, {borderWidth:1, borderColor:'green'}]} key={i}>
                <View style={[styles.imgAndName, { borderWidth: 1, borderColor: 'red' }]}>
                  {child.img_uri 
                    ? <View key={i} style={[cardStyles.circle, {marginRight:10}]}>
                        <Image
                          source={{ uri: child.img_uri }}
                          style={{
                            flex: 1,
                            width: 75,
                            height: null,
                            resizeMode: 'cover'
                          }}
                        />
                      </View>
                    : <Text style={[cardStyles.circle, {backgroundColor:'#ccc', marginRight: 10, marginTop: 0, marginLeft: 0}]}>{child.f_name[0].toUpperCase()}</Text>}
                  <Text style={ styles.name}>{child.f_name + ' ' + child.l_name}</Text>
                  <TouchableOpacity style={styles.editBtn} onPress={() => props.navigation.navigate('EditMember', {editing: child, acctId: props.acctId, type:'children', updateAccount: props.updateAccount})}>
                    <Icon name="edit" color="#ffffff80" />
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

          <TouchableOpacity style={styles.addBtn} onPress={() => props.openForm('children')}>
            <Icon name="person-add" color="white" size={35}/>
          </TouchableOpacity>
       </View>
        
      : null
      }
    </View>
  )
}