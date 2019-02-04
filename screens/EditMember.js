import React, {Component} from 'react'
import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {styles} from '../components/AccountDetails/styles'
import { connect } from 'net';
import { bindActionCreators } from 'redux';

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
    
  }

  componentDidMount = () => {
    const editing = this.props.navigation.getParam('editing')
    console.log(editing)
  }

  render(){
    return (
      <View style={{flex:1}}>
        <Text>Editing {this.props.f_name}'s Information</Text>

        
        
        <View style={styles.buttonBlock}>
          <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#02A676', marginRight: 5 }]}>
            <Text style={styles.btnText}>Add Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#FC3C3C', marginLeft: 5 }]}>
            <Text style={styles.btnText}>Delete {this.props.f_name}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({accounts:state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({deleteMember}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditMember)