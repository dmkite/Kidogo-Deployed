import React, {Component} from 'react'
import {ScrollView, View, Text, TouchableOpacity} from 'react-native'
import { bindActionCreators } from 'redux';
import Header from '../components/Header'
import {connect} from 'react-redux' 
import {Camera, Permissions} from 'expo'
import {Icon} from 'react-native-elements'
import {Child } from '../components/Forms'
import ErrorMessage from '../components/ErrorMessage'
class Enrollment extends Component{
  constructor(props){
    super(props)
    this.state = {
   
    }
  }

  // async componentDidMount() {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({ hasCameraPermission: status === 'granted' });
  // }

  render(){
   return (
     <View style={{flex:1}}>
      <Header navigation={this.props.navigation}/>
      <ScrollView style={{flex:1}}>
        <Child navigation={this.props.navigation} img_uri={this.props.accounts.newAccount.children.img_uri}/>
          {this.props.accounts.message 
            ?  <ErrorMessage error={this.props.accounts.message}/>
            : null}
      </ScrollView>
     </View>
   )
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
// const mapDispatchToProps = dispatch => bindActionCreators()
export default connect(mapStateToProps)(Enrollment)