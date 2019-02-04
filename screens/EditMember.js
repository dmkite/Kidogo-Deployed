import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {styles} from '../components/AccountDetails/styles'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteMember} from '../actions/accounts'

class EditMember extends Component{
  constructor(props){
    super(props)
    this.state = {
      f_name: '',
      l_name:'',
      birthdate: '',
      gender: '',
      notes:'',
      street: '',
      govt_id: null
    }
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ff7e09',
      height: 0
    }
  }

  deleteMember = () => {
    const acctId = this.props.navigation.getParam('acctId')
    const memberId = this.props.navigation.getParam('editing').id
    const memberType = this.props.navigation.getParam('type')
    this.props.deleteMember(acctId, memberType, memberId)
    this.props.navigation.navigate('Account', {id: acctId})
  }

  componentDidMount = () => {
    const editing = this.props.navigation.getParam('editing')
    this.setState({...editing})
  }

  render(){
    return (
      <View style={{flex:1}}>
        <Text>Editing {this.state.f_name}'s Information</Text>
        {this.state.birthdate 
        ?<Text>Birthday</Text>
        :<Text>Not birthday</Text>
        }
        {this.state.govt_id
          ? <Text>govtId</Text>
          : <Text>No govt id</Text>
        }
        
        <View style={styles.buttonBlock}>
          <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#02A676', marginRight: 5 }]}>
            <Text style={styles.btnText}>Add Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#FC3C3C', marginLeft: 5 }]} onPress={this.deleteMember}>
            <Text style={styles.btnText}>Delete {this.state.f_name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({accounts:state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({deleteMember}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditMember)