import React from 'react'
import {View, Text} from 'react-native'
import {styles} from './styles'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

function DashView(props){
  const numChildren = props.accounts.children.length
  const net = props.finances.net
  return (
    <View style={styles.dash}>
      <View style={styles.container}>
        <Text style={styles.dashHeader}>{net}</Text>
        <Text>{net > 0 ? `You have earned ${net} Shillings` : `You lost ${net} Shillings` }</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.dashHeader}>{numChildren}</Text>
        <Text>You have helped {numChildren} children</Text>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({accounts:state.accounts, finances: state.finances})
export default connect(mapStateToProps)(DashView)