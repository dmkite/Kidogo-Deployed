import React, {Component} from 'react'
import {View} from 'react-native'
import {FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements'
import { bindActionCreators } from 'redux';
import Header from '../components/Header'
import {connect} from 'react-redux' 
import { RNCamera } from 'react-native-camera'

class Enrollment extends Component{
  constructor(props){
    super(props)
  }

  takePicture = async () => {
    if(this.camera){
      const options = { quality:0.5, base64: true}
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri)
    }
  
  }

  render(){
    <View style={{flex:1}}>
      <RNCamera
        ref={ref => {this.camera = ref}}
        style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}
        type={RNCamera.Constants.Type.back}
        permissionDialogTitle={'Can we use your camera?'}
        permissionDialogMessage={'We need your permission to take a picture using your camera'}
      />
    </View>
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
// const mapDispatchToProps = dispatch => bindActionCreators()
export default connect(mapStateToProps)(Enrollment)