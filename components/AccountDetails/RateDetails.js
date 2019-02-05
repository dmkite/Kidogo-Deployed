import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput} from 'react-native'
import {styles} from './styles'
import {Icon} from 'react-native-elements'
import {Rate} from '../Forms'

export default class RateDetails extends Component{
  constructor(props) {
    super(props)
    this.state={
      frequency: this.props.frequency,
      rate: this.props.rate
    }
  }



  render(){
    return (
      <View>
        <View style={styles.balanceDisplay}>
          {this.props.editBalance
            ? <View style={{flex:1}}>
                <View style={styles.balanceEdit}>
                  <Text style={styles.balance}>K</Text>
                  <TextInput 
                    style={[styles.balance, styles.balanceInput]} 
                    autofocus={true} 
                    keyboardType="number-pad" 
                    onChangeText={(text) => this.props.changeBalance(text)} 
                    placeholder={String(this.props.balance)}
                  />
  
                </View>
                
                <View style={styles.buttonBlock}>
                  
                  <TouchableOpacity style={[styles.rateBtn, { marginRight: 5 }]}>
                    <Text style={styles.btnText} onPress={() => this.props.changeField('balance', 'newBalance')}>Change</Text>
                  </TouchableOpacity>
  
                  <TouchableOpacity style={[styles.rateBtn, { marginLeft: 5 }]}>
                    <Text style={styles.btnText} onPress={() => this.props.openView('editBalance')}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            : <Text style={styles.balance}> K {this.props.balance}</Text>
          }
  
          <TouchableOpacity style={styles.editBtn} onPress={() => this.props.openView('editBalance')}>
            <Icon name="edit" size={24} color='red'/>
          </TouchableOpacity>
  
        </View>
          {this.props.editRate
            ? <View>
                <Rate
                  handleFrequency={this.props.handleFrequency}
                  frequency={this.props.newFrequency}
                  rate={this.props.rate}
                  handleRate ={this.props.handleRate}
                />
                <View style={styles.buttonBlock}>
              
                <TouchableOpacity style={[styles.rateBtn, { marginRight: 5 }]}>
                  <Text style={styles.btnText} onPress={async () => {
                    await this.props.changeField('rate', 'newRate')
                    await this.props.changeField('frequency', 'newFrequency')
                    this.props.openView('editRate')
                    }}>Change</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={[styles.rateBtn, { marginLeft: 5 }]}>
                  <Text style={styles.btnText} onPress={() => this.props.openView('editRate')}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          : <Text style={styles.rateFreq}>K {this.props.rate} {this.props.frequency}</Text>
          }
        
        <View style={styles.buttonBlock}>
          <TouchableOpacity style={[styles.rateBtn, {marginRight:5}]} onPress={() => this.props.navigation.navigate('Payments', {id:props.acctId})}>
            <Text style={styles.btnText}>Make Payment</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={[styles.rateBtn, { marginLeft: 5 }]} onPress={() => this.props.openView('editRate')}>
            <Text style={styles.btnText}>Change Rate</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    )

  }
}