import React, {Component} from 'react'
import {Picker, View, Text, TextInput, TouchableHighlight, Image, TouchableOpacity} from 'react-native'
import {FormLabel, FormInput, Button, Icon} from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import {styles} from './styles'



class Child extends Component{
  constructor (props){
    super(props)
    this.state = {
      female:false,
      male: false,
      other:false
    }
  }

  selectBadge = (gender) => {
    const newState = {...this.state}
    for(let key in newState){
      if(key === gender) newState[key] = true
      else newState[key] = false
    }
    this.setState({...newState})
  }

  handlePress(){
    try{
      const {action, year, month, day} = DatePickerAndroid.open({
        date: new date()
      })
      if(action !== DtaePickerAndroid.dismissedAction){
        console.log('x')
      }
    } catch({code, message}){
      console.warn('cannot open date picker', message)
    }
  }

  render(){
    const today = new Date()
    const dd = today.getDate()
    const mm = today.getMonth() + 1
    const yyyy = today.getFullYear()
    if (dd < 10) dd = '0' + dd;
    if (dd < 10)  mm = '0' + mm;
    const date = `${dd}-${mm}-${yyyy}`
    return (
        <View style = {{ flex:1}} >
          {this.props.img_uri
            ? <Image
                style={styles.image}
                source={{uri: this.props.img_uri}}
              />
            : null
          } 
  
          <TouchableHighlight 
            style={this.props.img_uri ? styles.smallCamera : styles.camera} 
            onPress={() => this.props.navigation.navigate('Camera')}>
            <Icon name="camera-alt" size={this.props.img_uri ? 25 : 50} color="white"/>
          </TouchableHighlight>
          <Text style={styles.label}>First Name:</Text>
          <TextInput style={styles.input} placeholder="John" onChangeText={(text) => this.props.handleChangeText(text, 'f_name')} />
        <Text style={styles.label}>Surname:</Text>
        <TextInput 
          style={styles.input} 
          onChangeText={(text) => this.props.handleChangeText(text, 'l_name')} placeholder="Mwangi" />
        <Text style={styles.label}>Birthdate:</Text>
        <DatePicker
          style={{margin:10, borderColor:'#ccc', borderWidth:2, borderRadius:5}}
          format="DD-MM-YYYY"
          date={date} //sets default date to today
          placeholder="select birthdate"
          maxDate={date} //users can't enter birthday after today
          minDate="01-01-1990"
          onDateChange={(date) => this.props.handleChangeText(date, 'birthdate')}
        />
      
        <TouchableOpacity onPress={this.handlePress}><Text>Hello</Text></TouchableOpacity>
        {/* <TextInput style={styles.input} keyboardType="number-pad" placeholder="7" onChangeText={(text) => this.props.handleChangeText(text, 'birthdate')}/> */}
        <Text style={styles.label}>Gender:</Text>
          <View style={styles.badgeHolder}>
            <Text 
              onPress={() => { 
                this.props.handlePress('female') 
                this.selectBadge('female')
              }} 
              style={[styles.badge, this.state.female ? styles.selected : null]}>Female</Text>
          <Text 
            onPress={() => { 
              this.props.handlePress('male') 
              this.selectBadge('male')  
            }} 
            style={[styles.badge, this.state.male ? styles.selected : null]}>Male</Text>
          <Text 
            onPress={() => { 
              this.props.handlePress('other') 
              this.selectBadge('other')  
            }} 
            style={[styles.badge, this.state.other ? styles.selected : null]}>Other</Text>
          </View>
        <Text style={styles.label}>Notes:</Text>
        <TextInput style={[styles.input, styles.textarea]} multiline={true} placeholder="Anything important can go here..."/>
        </View > 
    )
  }
}

export default Child