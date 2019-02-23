import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import { styles } from './styles'

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
              <View style={styles.childDetails} key={i}>
                <View style={styles.imgAndName}>
                 <View style={{flexDirection:'row'}}>
                  {child.img_uri 
                    ? <View key={i} style={styles.circle}>
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
                    : <Text style={styles.circle}>{child.f_name[0].toUpperCase()}</Text>}
                  <Text style={ [styles.name, ]}>{child.f_name + ' ' + child.l_name}</Text>
                 </View>
                  
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
          <TouchableOpacity style={styles.button} onPress={() => props.openForm('children')}>
            <View style={{flexDirection:'row'}}>
              <Icon name="person-add" color="#ffffff80" size={18}/>
              <Text style={styles.btnText}>Add child</Text>
            </View>
          </TouchableOpacity>
       </View>
      : null
      }
    </View>
  )
}