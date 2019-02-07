import React, {Component} from 'react'
import {View, Text, TouchableHighlight, Image} from 'react-native'
import {styles} from './styles'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class DashView extends Component{
  constructor(props){
    super(props)
    this.state = {
      time: null
    }
  }

  componentDidMount(){
    const time = new Date()
    const hours = time.getHours()
    this.setState({
      time: hours
    })
  }

  render(){
    // const numChildren = this.props.accounts.reduce((acc,acct) => {
    //   acc += acct.children.length
    //   return acc
    //  }, 0)
    const net = this.props.finances.net
    return (
      <TouchableHighlight
        onPress={ () => {
          this.state.time > 12 
            ? this.props.navigation.navigate('CheckOut') 
            : this.props.navigation.navigate('CheckIn')
          }
        }
      >
        <View style={styles.dash}>
          <Image 
            source={this.state.time < 12
            ? require('../../assets/sunrise.png')
            : require('../../assets/sunset.png')
            }
          />
          <Text style={styles.dashFont}>Who's here today?</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const mapStateToProps = (state) => ({accounts:state.accounts, finances: state.finances})
export default connect(mapStateToProps)(DashView)