import React, {Component} from 'react'
import {View, ScrollView, TouchableOpacity, Text} from 'react-native'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux'
import {getWeekBalances} from '../actions/finances'
import Header from '../components/Header'
import {FinancesDash, EnterFinances, FinanceHistory} from '../components/FinancesDash'
import { addExpense } from '../actions/finances'
import {LinearGradient} from 'expo'
import {styles} from '../components/FinancesDash/styles'

class Finances extends Component{
  constructor(props){
    super(props)
    this.state = {
      celebrate: false,
      avoidView:0,
      openView: false
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
  
  changeView = () => this.setState({openView: !this.state.openView})

  render(){
    return (
      <LinearGradient
        style={[{ flex: 1 }, this.state.avoidView ? { marginTop: Number(this.state.avoidView) } : null]}
        colors={['#11011B', '#3C233D']}>
        <Header navigation={this.props.navigation}/>
        <ScrollView>
          <FinancesDash/>
          {this.state.openView 
            ? <EnterFinances addExpense={this.props.addExpense} addMargin={this.addMargin} changeView={this.changeView}/>
            : <TouchableOpacity style={styles.button} onPress={this.changeView}>
                <Text style={styles.btnText}>Add Expense</Text>
              </TouchableOpacity>
          
          }
          
          <FinanceHistory history={this.props.finances.history}/>
        </ScrollView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({finances:state.finances})
const mapDispatchToProps = dispatch => bindActionCreators({getWeekBalances, addExpense}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Finances)