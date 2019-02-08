import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Header from '../components/Header'
import DashView from '../components/DashView'
import ActionButtons from '../components/ActionButtons'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {addFees} from '../actions/payments'

class DashBoard extends Component{ //can definitely be a functional component
  constructor(props){
    super(props)
  }
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ff7e09',
      height: 0
    }
  }

  componentDidMount = () => {
    this.props.addFees()
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation}/>
        <ScrollView>
          <DashView navigation={this.props.navigation}/>
          <ActionButtons navigation={this.props.navigation}/>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({payments: state.payments})
const mapDispatchToProps = dispatch => bindActionCreators({addFees}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)