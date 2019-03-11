import React, {Component} from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { styles } from './styles'

export default class GuardianDetails extends Component{
  constructor(props) {
    super(props)
    this.state = {
      showId: false
    }
  }

  showId = () => {
    this.setState({
      showId: !this.state.showId
    })
  }

  render(){
    return (
      <View>
        <TouchableOpacity style={styles.header} onPress={() => { this.props.openDetails('guardians') }}>
          <Text style={styles.h2}>Guardians</Text>
          <Icon name={this.props.currentlyExpanded === 'guardians' ? "expand-less" : "expand-more"} size={36} color="#ffffff80"/>
        </TouchableOpacity>
        {this.props.currentlyExpanded === 'guardians'
          ? <View>
            {this.props.guardians.map((g, i) => {
            return (
              <View style={styles.childDetails} key={i}>

                <View style={[styles.imgAndName, {height:50}]}>
                  <Text style={[styles.name, { marginLeft: -5, lineHeight: 50 }]}>{g.f_name + ' ' + g.l_name} {g.isPrimary ? '(PRIMARY)' : null}</Text>
                    
                  <TouchableOpacity 
                    style={styles.editBtn} 
                    onPress={() => this.props.navigation.navigate('EditMember', { editing: g, acctId: this.props.acctId, type: 'guardians' })}
                  >
                    <Icon name="edit" color="#ffffff80" />
                  </TouchableOpacity>
                </View>

                <View style={styles.generalDetails}>
                  <View style={styles.row}>
                    <Text style={styles.topic}>Phone:</Text>
                    <Text style={styles.text}>{g.phone || 'unknown'}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.topic}>Address:</Text>
                    <Text style={styles.text}>{g.street + ', ' + g.city || 'unknown'}</Text>
                  </View>

                  <View style={styles.row}>
                    <Text style={styles.topic}>ID:</Text>
                    <View style={[styles.idHolder, {flex:0.7}]}>
                      <Text style={[styles.text, {width:150}]}>{
                        this.state.showId 
                          ? g.govt_id
                          : '*********'
                        }</Text>
                        <TouchableOpacity style={{opacity:0.5, marginLeft:20}} onPress={this.showId}>
                          <Icon name={this.state.showId ? "visibility-off" : "visibility"} color="white"/>
                        </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }
          )}
            <TouchableOpacity style={styles.button} onPress={() => this.props.openForm('guardians')}>
              <View style={{flexDirection:'row'}}>
                <Icon name="person-add" color="#ffffff80" size={18} style={{marginRight:5}}/>
                <Text style={[styles.btnText, {fontSize:18, marginLeft:5}]}>Add Guardian</Text>
              </View>
            </TouchableOpacity>
            </View>
          : null
        }
      </View>
    )
  }
}