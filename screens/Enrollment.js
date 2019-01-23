import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import { bindActionCreators } from 'redux';
import Header from '../components/Header'
import {connect} from 'react-redux' 
import {Camera, Permissions} from 'expo'
import {Icon} from 'react-native-elements'

class Enrollment extends Component{
  constructor(props){
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

  render(){
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                
                <Icon name="camera-alt" color="white" size={50}/>
                
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({accounts: state.accounts})
// const mapDispatchToProps = dispatch => bindActionCreators()
export default connect(mapStateToProps)(Enrollment)