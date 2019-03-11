import React, {Component} from 'react'
import {Picker, View, Text, ScrollView, TextInput, Image, TouchableOpacity} from 'react-native'
import {ImagePicker} from 'expo'
import {Icon} from 'react-native-elements'
import {styles} from './newStyles'
import numberValidation from '../../utilities/numberValidation'

class Child extends Component{
  constructor (props){
    super(props)
    this.state = {
      focusedOn: null,
      img_uri:null,
      f_name:null,
      l_name: null,
      birthdate: null,
      gender: null,
      notes: null,
      soundObject: null,
      showHelp:false
    }
  }

  selectBadge = gender => {
    const newState = {...this.state}
    for(let key in newState.gender){
      if(key === gender) newState[key] = true
      else newState[key] = false
    }
    this.setState({...newState})
  }

  handleDate = text => {
    let length = 0
    if(this.state.birthdate && this.state.birthdate.length) length = this.state.birthdate.length 
    this.setState({
      birthdate: numberValidation(text, 'birthdate', length, 2, 5)
    })
  }

  changeFocus = (action, type) => {
    if (action === 'focus') this.setState({ focusedOn: type })
    else this.setState({ focusedOn: null })
  }

  handleChangeText = (text, field) => this.setState({[field]: text})

  addURI = userData => this.setState({ ...userData })

   playAudio = async () => {
    try{
      if(!this.state.soundObject){
        const soundObject = new Audio.Sound()
        await soundObject.loadAsync(require('../../assets/audio/children.mp3'))
        await soundObject.playAsync()
        this.setState({ soundObject })
      }
      else{   
        await this.state.soundObject.stopAsync()
        this.setState({soundObject: null})
      }
    }catch(err){
      console.error(err)
      this.setState({error:'We could not play the audio file'})
    }
  }  

  openImages = () => {
    ImagePicker.launchImageLibraryAsync()
    .then(pic => {
      return this.setState({img_uri:pic.uri})})
  }

  render(){
    return (
      <ScrollView style = {{ flex:1}} >
        {this.state.img_uri
          ? <Image source={{uri:this.state.img_uri}} style={styles.img}/>
          : <Image source={require('../../assets/CHILD.png')} style={styles.img}/>
        }

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{width:50,  margin:10}} onPress={() => this.props.navigation.navigate('Camera', {addURI: this.addURI, userData: this.state, addMessage:this.props.addMessage})}>
            <Icon name="camera-alt" size={36} color="#ffffff80"/>
          </TouchableOpacity>

          <TouchableOpacity style={{width:50,  margin:10}} onPress={this.openImages}>
            <Icon name="photo" size={36} color="#ffffff80"/>
          </TouchableOpacity>
        </View>

        <View style={styles.nameHolder}>
          <View style={{ flex: .5, marginRight: 5 }}>
            <TextInput
              onFocus={() => {
                this.changeFocus('focus', 'f_name')
                this.props.addMargin(-175)
              }}
              onBlur={() => {
                this.changeFocus('blur', null)
                this.props.addMargin(0)
              }}
              style={[styles.input, this.state.focusedOn === 'f_name' ? styles.focused : null]}
              value={this.state.f_name}
              onChangeText={(text) => this.handleChangeText(text, 'f_name')}
              blurOnSubmit={false}
              onSubmitEditing={() => this.l_nameInput.focus()}
            />
            <Text style={[styles.label, this.state.focusedOn === 'f_name' ? styles.focused : null]}>Jina ya Kwanza</Text>
          </View>

          <View style={{ flex: .5, marginLeft: 5 }}>
            <TextInput
              onFocus={() => {
                this.changeFocus('focus', 'l_name')
                this.props.addMargin(-175)
              }}
              onBlur={() => {
                this.changeFocus('blur', null)
                this.props.addMargin(0)
              }}
              style={[styles.input, this.state.focusedOn === 'l_name' ? styles.focused : null]}
              value={this.state.l_name}
              onChangeText={(text) => this.handleChangeText(text, 'l_name')}
              ref={(input) => this.l_nameInput = input}
              blurOnSubmit={false}
              onSubmitEditing={() => this.bDayInput.focus()}
              
            />
            <Text style={[styles.label, this.state.focusedOn === 'l_name' ? styles.focused : null]}>Jina ya Pili/Familia</Text>
          </View>
        </View>

        <View style={styles.nameHolder}>
          <View style={{ flex: .5, marginRight: 5 }}>
            <TextInput 
              style={[styles.input, styles.dateInput]}
              maxLength={10}
              keyboardType="number-pad" 
              value={this.state.birthdate} 
              onChangeText={(text) => this.handleDate(text)}
              onFocus={() => {
                this.changeFocus('focus', 'birthdate')
                this.props.addMargin(-250)
              }}
              onBlur={() => {
                this.changeFocus('blur', null)
                this.props.addMargin(0)
              }}
              ref={(input) => this.bDayInput = input}
              />
              <Text style={[styles.label, this.state.focusedOn === 'birthdate' ? styles.focused : null]}>Tarehe ya Kuzaliwa</Text>
          </View>
          <View style={{ flex: .5, marginLeft: 5}}>
            <View style={[styles.input, { height:30, paddingLeft:0}] }>
              <Picker
                style={{color:'white', marginTop:-10}}
                selectedValue={this.state.gender}
                onValueChange={(itemValue, itemIndex) => this.setState({ gender: itemValue })}>
                <Picker.Item label="" value={null}/>
                <Picker.Item label="female" value="female" />
                <Picker.Item label="male" value="male" />
                <Picker.Item label="other" value="other" />
              </Picker>
            </View>
            <Text style={styles.label}>Mvulana au Msichana</Text>
          </View>
        </View>
          
        <TextInput   
          style={styles.input} 
          multiline={true} 
          value={this.state.notes}
          onChangeText={(text) => this.handleChangeText(text, 'notes')}
          onFocus={() => {
            this.changeFocus('focus', 'notes')
            this.props.addMargin(-350)
          }}
          onBlur={() => {
            this.changeFocus('blur', null)
            this.props.addMargin(0)
          }} 
          />
      
        <Text style={[styles.label, this.state.focusedOn === 'notes' ? styles.focused : null]}>Kitu chochote unaweza elezea</Text>

          {this.props.accountAlreadyCreated
            ? <View style={styles.nameHolder}>
                <TouchableOpacity 
                  style={[{ flex: .5, marginTop: 20 }, styles.ready]}  
                  onPress={() => this.props.openForm('children')}>
                  <Text style={[styles.nextText, {textAlign:'left', marginLeft: 10}]}>Cancel</Text>
                </TouchableOpacity>
                {this.state.f_name && this.state.l_name
                  ? <TouchableOpacity style={[styles.button, { flex: .5, marginRight: 5 }]}
                      onPress={() => {
                      let child = {...this.state}
                      delete child.focusedOn
                      this.props.addMember('children', child)
                      }}>
                      <Text style={styles.nextText}>Add</Text>
                    </TouchableOpacity>
                  : null }
              </View>
            : this.state.f_name && this.state.l_name 
            ? <View style={{ flexDirection:'row', margin:10}}>
                <TouchableOpacity style={[styles.button, {flex: .5, marginRight:5}]}
                    onPress={ () => {
                      let child = { ...this.state }
                      delete child.focusedOn
                      this.props.addToAccount(child, 'children')
                      this.setState({
                        focusedOn: null,
                        img_uri: null,
                        f_name: null,
                        l_name: null,
                        birthdate: null,
                        gender: null,
                        notes: null
                      })
                    }}>
                  <Text style={styles.btnText}>Add Another</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {flex: .5, marginLeft:5}]}
                  onPress={ () => {
                        let child = {...this.state}
                        delete child.focusedOn
                        this.props.addToAccount(child, 'children')
                        this.props.changeQuestionFocus('guardian')
                      }}>
                  <Text style={styles.btnText}>Next</Text>
              </TouchableOpacity>
            </View>
            : null
          }
        </ScrollView > 
    )
  }
}

export default Child