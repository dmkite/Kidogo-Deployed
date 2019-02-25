import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { Camera, Permissions } from 'expo'
import { Icon } from 'react-native-elements'

class CameraScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
    }
  }

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = () => {
    return this.camera.takePictureAsync({quality:0.5})
      .then(pic => {
        const addURI = this.props.navigation.getParam('addURI')
        const userData = this.props.navigation.getParam('userData')
        userData.img_uri = pic.uri
        addURI(userData)
        this.props.navigation.goBack()
      })
      .catch(err => {
        const addMessage = this.props.navigation.getParam('addMessage')
        addMessage('Something went wrong, we couldnt take a picture.')
        console.error(err)
        this.props.navigation.goBack()
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
          <Header navigation={this.props.navigation}/>
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

export default connect(mapStateToProps)(CameraScreen)