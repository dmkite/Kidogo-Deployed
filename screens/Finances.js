import React, {Component} from 'react'
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {getWeekBalances} from '../actions/finances'
import Header from '../components/Header'
import {FinancesDash, EnterFinances, FinanceHistory} from '../components/FinancesDash'
import { addExpense } from '../actions/finances'

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
        <ScrollView>
          <FinancesDash/>
          <EnterFinances addExpense={this.props.addExpense}/>
          <View style={{ height: 2, backgroundColor: '#ccc', marginHorizontal: 20, marginVertical: 40 }}></View>
          <FinanceHistory history={this.props.finances.history}/>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = state => ({finances:state.finances})
const mapDispatchToProps = dispatch => bindActionCreators({getWeekBalances, addExpense}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Finances)