import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux';
import {addMessage, takeTempPic} from '../actions/accounts'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { Expo, Camera, Permissions } from 'expo'
import { Icon } from 'react-native-elements'

class CameraScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {
    return this.camera.takePictureAsync({quality:0.5})
      .then(pic => {
        this.props.takeTempPic(pic.uri)
        this.props.navigation.navigate('Enrollment')
      })
      .catch(err => {
        this.props.addMessage('Something went wrong, we couldnt take a picture.')
        this.props.navigation.navigate('Enrollment')
      })
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => {this.camera = ref}}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex:1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={this.takePicture}>

                <Icon name="camera-alt" color="white" size={50} />

              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({ accounts: state.accounts })
const mapDispatchToProps = dispatch => bindActionCreators({addMessage, takeTempPic}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)