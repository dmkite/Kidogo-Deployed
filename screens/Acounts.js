import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableHighlight } from 'react-native'
import Header from '../components/Header'
import FilterBlock from '../components/FilterBlock'
import {connect} from 'react-redux'
import {Icon} from 'react-native-elements'
import AccountCard from '../components/AccountCard'
import {styles} from '../components/FilterBlock/styles'

class Accounts extends Component{
  constructor(props){
    super(props)
    this.state = {
      filter:null,
      filterOpen: false,
      searchTerm: ''
    }
  }
  
  handlePress = (filter) =>{
    this.setState({filter})
  }

  sortBy = (a, b) => {
    if(this.state.filter === 'balance'){
      return b.balance - a.balance
    }
    if(this.state.filter === 'alphabetical'){
      return b.children[0].l_name - a.children[0].l_name
    }
    
  }
  
  filterBy = (account) => {
    if(this.state.searchTerm.length > 0){
      const childVals = account.children.reduce((acc, child) => {

        delete child.birthdate 
        delete child.notes
        delete child.gender
        delete child.img_uri
        acc = acc.concat(Object.values(child))
        return acc
      }, [])
      const guardianVals = account.guardians.reduce((acc, guardian) => {
        delete guardian.phone
        delete guardian.city
        delete guardian.address_1
        delete guardian.govt_id
        acc = acc.concat(Object.values(guardian))
        return acc
      }, [])
      for(let val of guardianVals.concat(childVals)){
        if(val.toLowerCase().includes(this.state.searchTerm.toLowerCase())) return true
      }
      return false
    }
    return true
  }

  handleFilterOpen = () => {
    this.setState({
      filterOpen: !this.state.filterOpen})
  }

  handleChangeText = (text) => {
    this.setState({
      searchTerm: text
    })
  }

  render(){
    return(
      <View style={{flex:1}}>
        <Header navigation={this.props.navigation} />
        {this.state.filterOpen ? <FilterBlock filter={this.state.filter} handlePress={this.handlePress} handleChangeText={this.handleChangeText}/> :  null}
        <TouchableHighlight style={styles.filterBtn} onPress={this.handleFilterOpen}>
          <Icon name="search" size={30} color="white"/>
        </TouchableHighlight>
        <ScrollView style={{flex:1}}>
          {console.log('props from inside Account', props.accounts.accounts)}
          {this.props.accounts.accounts.length === 0 ? <View>
                <Text>You have not added an account yet.</Text>
                <Text>Add an account</Text>
              </View>
            : this.props.accounts.accounts
              .sort(this.sortBy)
              .filter(this.filterBy)
              .map((account, i) => <AccountCard key={i} {...account} />)
          }
        </ScrollView>
      </View>
    )
  }
}

mapStateToProps = state => ({accounts: state.accounts})

export default connect(mapStateToProps)(Accounts)