import React from 'react'
import {styles} from './styles'
import {View, Text, TouchableOpacity, Image} from 'react-native'

function hexify(x) {
  switch (12 - x) {
    case 12:
      return '#ccc'
    case 11:
      return '#bbb'
    case 10:
      return '#aaa'
    default:
      return `#${12 - x}${12 - x}${12 - x}`
  }
}

export default function AccountCard(props){
  return(
    <TouchableOpacity style={styles.card} onPress={() => props.navigate('Account', {id: props.id})}>
      
      <View style={styles.imgAndBalance}>
        <View style={styles.img}>
          {props.children.map((child, i) => {
              let hex = hexify(i)
              return child.img_uri
                ? <Image 
                    key={i}
                    source={'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'} 
                    style={[style.circle, {zIndex: (100 - i)}]}/>
                : <Text 
                    key={i}
                    style={[styles.circle, {zIndex:100 - i, backgroundColor: hex }]}>
                    {child.f_name[0].toUpperCase()}
                  </Text>})
          }
        </View>


        <Text style={[styles.balance, props.balance ? null : {color:'#ccc'}]}>K {props.balance || '0'}</Text>
      </View>
      <View style={styles.members}>
        <Text style={styles.childName}>
          {props.children.reduce((acc, child) => {
            acc.push(child.f_name + ' ' + child.l_name)
            return acc
          },[]).join(', ')}
        </Text>
        
        
        <Text style={styles.guardianName}>
          {props.guardians.reduce((acc, g) => {
            acc.push(g.f_name + ' ' + g.l_name)
            return acc
          }, []).join(', ')}
        </Text>

      </View>
    </TouchableOpacity>
  )
}