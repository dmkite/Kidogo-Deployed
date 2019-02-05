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
        <TouchableOpacity style={styles.header} onPress={() => { this.props.openView('openGuardian') }}>
          <Text style={styles.h1}>Guardians</Text>
          <Icon name={this.props.isOpen ? "expand-less" : "expand-more"} size={36} />
        </TouchableOpacity>

        <View style={{ height: 2, backgroundColor: '#ccc', margin: 20 }}></View>

        {this.props.isOpen
          ? <View>
            {this.props.guardians.map((g, i) => {
            return (
              <View style={styles.childDetails} key={i}>

                <View style={styles.imgAndName}>
                  <Text style={[styles.topic, styles.name]}>{g.f_name + ' ' + g.l_name}</Text>
                  <TouchableOpacity style={styles.editBtn} onPress={() => this.props.navigation.navigate('EditMember', { editing: g, acctId: this.props.acctId, type: 'guardians' })}>
                    <Icon name="edit" color="#ccc" />
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
                    <View style={styles.idHolder}>
                      <Text style={styles.text}>{
                        this.state.showId 
                          ? g.govt_id
                          : 'XXX-XX-XXXX'
                        }</Text>
                        <TouchableOpacity style={styles.showId} onPress={this.showId}>
                          <Text style={{color:'white'}}>{this.state.showId ? 'hide' : 'show'}</Text>
                        </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          }
          )}
            <TouchableOpacity style={styles.addBtn} onPress={() => this.props.openAddMember('guardians')}>
              <Icon name="person-add" color="white" size={35} />
            </TouchableOpacity>
            </View>
          : null
        }
      </View>
    )

  }
}