import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Header from '../components/Header'
import DashView from '../components/DashView'
import ActionButtons from '../components/ActionButtons'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addFees} from '../actions/payments'
import {getAttendance} from '../actions/attendance'
import {LinearGradient} from 'expo'
class DashBoard extends Component{ //can definitely be a functional component
  constructor(props){
    super(props)
  }
  

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  componentDidMount = () => {
    return Promise.all([this.props.addFees()])
    //removed this.props.getAttendance() on 2/13
  }

  render(){
    return(
      <LinearGradient
        style={{ flex: 1 }}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation}/>
        <ScrollView>
          <DashView navigation={this.props.navigation}/>
          <ActionButtons navigation={this.props.navigation}/>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({payments: state.payments})
const mapDispatchToProps = dispatch => bindActionCreators({addFees, getAttendance}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)