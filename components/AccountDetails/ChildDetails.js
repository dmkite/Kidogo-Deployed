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
       ? props.children.map((child, i) => {
        return (
          <View style={styles.childDetails} key={i}>
            <TouchableOpacity style={styles.editBtn}>
              <Icon name="edit"/>
            </TouchableOpacity>

            <View style={styles.imgAndName}>
              {child.img_uri 
                ? <Image style={[cardStyles.circle, cardStyles.img]} source={require('../../assets/kes.png')}/>
                : <Text style={cardStyles.circle}>{child.f_name[0].toUpperCase()}</Text>}
              <Text>{child.f_name + ' ' + child.l_name}</Text>
            </View>

            <View style={styles.generalDetails}>
              <View style={styles.row}>
                <Text style={styles.topic}>Birthdate:</Text>  
                <Text>{child.birthdate || 'unknown'}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.topic}>Gender:</Text>
                <Text>{child.gender || 'unknown'}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.topic}>Notes:</Text>
                <Text>{child.notes || 'none' }</Text>
              </View>
           </View>
          </View>
          )}
        )
      : null
      }
    </View>
  )
}