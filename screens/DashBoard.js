import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import Header from '../components/Header'
import DashView from '../components/DashView'
import ActionButtons from '../components/ActionButtons'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addFees} from '../actions/payments'
import {getAttendance} from '../actions/attendance'
import {LinearGradient, Font, SecureStore} from 'expo'

class DashBoard extends Component{ 
  constructor(props){
    super(props)
    this.state={
      fontLoaded: false
    }
  }
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  componentDidMount = async () => {
    this.getInfo()
    await Font.loadAsync({
      'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf')
    })
    this.setState({fontLoaded:true})
    this.props.addFees()
    }
    
  getInfo = async () => {
    console.log( await SecureStore.getItemAsync('_SIGNEDIN'))
  }

  render(){
    return(
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation}/>
        <ScrollView>
          <DashView navigation={this.props.navigation}/>
          <ActionButtons navigation={this.props.navigation} fontLoaded={this.state.fontLoaded}/>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({payments: state.payments})
const mapDispatchToProps = dispatch => bindActionCreators({addFees, getAttendance}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)