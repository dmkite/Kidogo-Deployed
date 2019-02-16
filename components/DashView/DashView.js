import React, {Component} from 'react'
import {View, Text, TouchableHighlight, Image} from 'react-native'
import {styles} from './styles'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class DashView extends Component{
  constructor(props){
    super(props)
    this.state = {
      time: null,
    }
  }

  componentDidMount = async () =>{
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
          this.state.time < 12 
            ? this.props.navigation.navigate('CheckIn') 
            : this.state.time < 17
                ? this.props.navigation.navigate('CheckOut')
                : this.props.navigation.navigate('Finances')
          }
        }
      >
        <View style={styles.dash}>
          <Image 
            source={this.state.time < 12
            ? require('../../assets/sunrise.png')
            : this.state.time < 17
                ? require('../../assets/sunset.png')
                : require('../../assets/nighttime.png')
            }
          />
          <Text style={[styles.dashFont, this.state.time >= 17 ? {color:'white'} : null]}>
            { this.state.time < 12
              ? "Who's here today?"
              : this.state.time < 17
                ? "Has anyone left?"
                : "Did you buy anything today?"
            }
              </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const mapStateToProps = (state) => ({accounts:state.accounts, finances: state.finances, attendance: state.attendance})
export default connect(mapStateToProps)(DashView)