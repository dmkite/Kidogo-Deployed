import React from 'react'
import {View, Text} from 'react-native'
import {styles} from './styles'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

function DashView(props){
  return (
    <View style={styles.dash}>
      <View style={styles.container}>
        <Text>You have a balance of x</Text>
      </View>
      <View style={styles.container}>
        <Text>You have helped {props.accounts.children.length} children</Text>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({accounts:state.accounts})
export default connect(mapStateToProps)(DashView)