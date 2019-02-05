import React, {Component} from 'react'
import {View, ScrollView, Text, TextInput, TouchableOpacity} from 'react-native'
import {styles} from '../components/AccountDetails/styles'
import {styles as formStyles} from '../components/Forms/styles'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {deleteMember, changeMember} from '../actions/accounts'

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

  selectBadge = (gender) => {
    this.setState({gender})
  }

  handleChangeText = (text, field) => {
    this.setState({
      [field]:text
    })
  }

  changeMember = () => {
    const changes = Object.keys(this.state).reduce((acc, field) => {
      if(this.state[field]) acc[field] = this.state[field]
      return acc
    }, {})
    const acctId = this.props.navigation.getParam('acctId')
    const memberId = this.props.navigation.getParam('editing').id
    const memberType = this.props.navigation.getParam('type')

    this.props.changeMember(changes, acctId, memberType, memberId)
    this.props.navigation.navigate('Account', { id: acctId })
  }

  render(){
    return (
      <ScrollView style={{flex:1}}>
        <Text style={formStyles.h1}>Editing {this.props.navigation.getParam('editing').f_name}'s Information</Text>
        
        <Text style={formStyles.label}>First Name:</Text>
        <TextInput 
          style={formStyles.input} 
          placeholder={this.props.navigation.getParam('editing').f_name}
          onChangeText={(text) => this.handleChangeText(text, 'f_name')}
        />

        <Text style={formStyles.label}>Surname:</Text>
        <TextInput 
          style={formStyles.input} 
          placeholder={this.props.navigation.getParam('editing').l_name} 
          onChangeText={(text) => this.handleChangeText(text, 'l_name')}  
        />
        
        {this.state.birthdate
          ? <View>
              <Text style={formStyles.label}>Birthdate:</Text>
              <TextInput 
                style={formStyles.input} 
                keyboardType="number-pad" 
                placeholder={this.props.navigation.getParam('editing').birthdate} 
                onChangeText={(text) => this.handleChangeText(text, 'birthdate')}
              />
          </View>
          : null
        }

        {this.state.gender
          ? <View>
            <Text style={formStyles.label}>Gender:</Text>
            <View style={formStyles.badgeHolder}>
              <Text
                onPress={ () => this.selectBadge('female') }
                style={[formStyles.badge, this.state.gender === 'female' ? formStyles.selected : null]}>
                Female
              </Text>
              <Text
                onPress={() => this.selectBadge('male')}
                style={[formStyles.badge, this.state.gender === 'male' ? formStyles.selected : null]}>
                Male
              </Text>
              <Text
                onPress={ () => this.selectBadge('other') }
                style={[formStyles.badge, this.state.gender === 'other' ? formStyles.selected : null]}>Other</Text>
            </View>
          </View>
          :null
        }
        
        {this.state.gender //using gender to determine if it is a student because notes may be a blank string/falsey
          ? <View>
              <Text style={formStyles.label}>Notes:</Text>
              <TextInput 
                style={formStyles.textarea} 
                onChangeText={(text) => this.handleChangeText(text, 'notes')}
              />
            </View>
          :null
        }
        <View style={styles.buttonBlock}>
          <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#02A676', marginRight: 5 }]} onPress={this.changeMember}>
            <Text style={styles.btnText}>Add Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.rateBtn, { backgroundColor: '#FC3C3C', marginLeft: 5 }]} onPress={this.deleteMember}>
            <Text style={styles.btnText}>Delete {this.props.navigation.getParam('editing').f_name}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => ({accounts:state.accounts})
const mapDispatchToProps = dispatch => bindActionCreators({deleteMember, changeMember}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(EditMember)