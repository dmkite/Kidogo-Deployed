import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {getWeekBalances} from '../actions/finances'
import Header from '../components/Header'
import {FinancesDash, EnterFinances} from '../components/FinancesDash'


class Finances extends Component{
  constructor(props){
    super(props)
    this.state = {
      celebrate: false
    }
  }
  
  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#ff7e09',
      height: 0
    }
  }

  componentDidMount = () => {
    this.props.getWeekBalances()
  }

  render(){
    return (
      <View style={{flex:1}}> 
        <Header navigation={this.props.navigation}/>
        <FinancesDash {...this.props.finances.net}/>
        <EnterFinances/>
      </View>
    )
  }
}

const mapStateToProps = state => ({finances:state.finances})
const mapDispatchToProps = dispatch => bindActionCreators({getWeekBalances}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Finances)