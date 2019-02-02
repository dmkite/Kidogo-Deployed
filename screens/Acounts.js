import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Header from '../components/Header'
import FilterBlock from '../components/FilterBlock'
import {connect} from 'react-redux'
import {Icon} from 'react-native-elements'
import AccountCard from '../components/AccountCard'

class Accounts extends Component{
  constructor(props){
    super(props)
    this.state = {
      filter:null
    }
  }
  
  handlePress = (filter) =>{
    this.setState({filter})
  }

  sortBy = (a, b) => {
    if(this.state.filter === 'balance'){
      return a.balance - b.balance
    }
    if(this.state.filter === 'alphabetical'){
      return a.children[0].l_name - b.children[0].l_name
    }
    
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation} />
        <FilterBlock filter={this.state.filter} handlePress={this.handlePress}/>
        <ScrollView>
       
          {this.props.accounts.accounts.length === 0 ? <View>
                <Text>You have not added an account yet.</Text>
                <Text>Add an account</Text>
              </View>
            : this.props.accounts.accounts.sort().map((account, i) => <AccountCard key={i} {...account} />)
          }
        </ScrollView>

      </View>
    )
  }
}

mapStateToProps = state => ({accounts: state.accounts})

export default connect(mapStateToProps)(Accounts)