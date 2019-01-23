import React, {Component} from 'react'
import {ScrollView, View, Text, TouchableOpacity} from 'react-native'
import { bindActionCreators } from 'redux';
import Header from '../components/Header'
import {connect} from 'react-redux' 
import {Camera, Permissions} from 'expo'
import {Icon, Button} from 'react-native-elements'
import {Child } from '../components/Forms'
import ErrorMessage from '../components/ErrorMessage'
class Enrollment extends Component{
  constructor(props){
    super(props)
    this.state = {
      img_uri: null,
      f_name: null,
      l_Name: null,
      birthdate:0,
      gender: null,
      notes:null
    }
  }

  // async componentDidMount() {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({ hasCameraPermission: status === 'granted' });
  // }
  handleChangeText = (text, type) => {
    this.setState({
      [type]: text
    })
  }

  handlePress = (gender) => {
    this.setState({gender})
  }

  render(){
   return (
     <View style={{flex:1}}>
      <Header navigation={this.props.navigation}/>
      <ScrollView style={{flex:1}}>
        <Child 
          navigation={this.props.navigation} 
          img_uri={this.props.accounts.newAccount.children.img_uri}
          handleChangeText={this.handleChangeText}
          handlePress={this.handlePress}
        />
          {this.props.accounts.message 
            ?  <ErrorMessage error={this.props.accounts.message}/>
            : null}
         <Button large title="Submit" />
      </ScrollView>
     </View>
   )
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
// const mapDispatchToProps = dispatch => bindActionCreators()
export default connect(mapStateToProps)(Enrollment)