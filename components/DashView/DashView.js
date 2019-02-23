import React, {Component} from 'react'
import {View, Text, TouchableHighlight, Image} from 'react-native'
import {styles} from './styles'
import {connect} from 'react-redux'

class DashView extends Component{
  constructor(props){
    super(props)
    this.state = {
      time: null,
      fontLoaded:false
    }
  }

  componentDidMount = async () =>{
    const time = new Date()
    const hours = time.getHours()
    this.setState({time: hours})
  }

  render(){
    return (
      <TouchableHighlight
        onPress={ () => {
          this.state.time < 12 
            ? this.props.navigation.navigate('CheckIn') 
            : this.state.time < 17
                ? this.props.navigation.navigate('CheckOut')
                : this.props.navigation.navigate('Finances')
      }}>
        <View style={styles.dash}>
          <Image 
            source={this.state.time < 12
            ? require('../../assets/MORNING.png')
            : this.state.time < 17
                ? require('../../assets/AFTERNOON.png')
                : require('../../assets/EVENING.png')
            }
          />
          <Text style={[styles.dashFont, this.state.fontLoaded ?  styles.raleway : null, this.state.time >= 17 ? {fontSize:24} : null]}>
            { this.state.time < 12
              ? "Nani hako Leo?"
              : this.state.time < 17
                ? "Kuna aliyetoka?"
                : "Uli nunua kitu chochote leo?"
            }
              </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const mapStateToProps = (state) => ({accounts:state.accounts, finances: state.finances, attendance: state.attendance})
export default connect(mapStateToProps)(DashView)