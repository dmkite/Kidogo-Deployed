import React, {Component} from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default class Loading extends Component {
  render() {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#ffffff80" />
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    borderWidth:1,
    backgroundColor:'#00000080',
    zIndex:999
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})