import React, {Component} from 'react'
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {getWeekBalances} from '../actions/finances'
import Header from '../components/Header'
import {FinancesDash, EnterFinances, FinanceHistory} from '../components/FinancesDash'
import { addExpense } from '../actions/finances'
import {LinearGradient} from 'expo'

class Finances extends Component{
  constructor(props){
    super(props)
    this.state = {
      celebrate: false,
      avoidView:0
    }
  }
  

  static navigationOptions = {
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#0C000E',
      height: 0
    }
  }

  componentDidMount = () => {
    this.props.getWeekBalances()
  }
  
  addMargin = (num) => this.setState({ avoidView: num })

  render(){
    return (
      <LinearGradient
        style={[{ flex: 1 }, this.state.avoidView ? { marginTop: Number(this.state.avoidView) } : null]}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation}/>
        <ScrollView>
          <FinancesDash/>
          <EnterFinances addExpense={this.props.addExpense} addMargin={this.addMargin}/>
          <View style={{ height: 2, backgroundColor: '#ccc', marginHorizontal: 20, marginVertical: 40 }}></View>
          <FinanceHistory history={this.props.finances.history}/>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({finances:state.finances})
const mapDispatchToProps = dispatch => bindActionCreators({getWeekBalances, addExpense}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Finances)