import { CalendarAccessLevel } from "expo/build/Calendar";

export const styles = {
  inputWrapper: {
    height:40,
    flex: 1,
    flexDirection:'row'
  },
  label: {
    flex:.3,
    marginTop:10,
    marginLeft:10,
    fontSize: 18
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#ccc',
    paddingLeft: 10,
    margin:10
  },
  badgeHolder:{
    flex:1, 
    height:50,
    justifyContent:'space-between',
    flexDirection:'row',
    margin:10
  },
  badge:{
    height:50,
    flex:.3,
    borderRadius:5,
    borderColor:'#ccc',
    borderWidth: 2,
    textAlign:'center',
    lineHeight:50
  },
  camera:{
    alignSelf:'stretch',
    backgroundColor:'#aefaef',
    margin:10,
    height:100,
    paddingVertical: 25
  },
  smallCamera: {
    alignSelf:'stretch',
    backgroundColor:'#ccc',
    marginHorizontal:10,
    height:45,
    paddingVertical:10
  },
  image:{
    height:350,
    alignSelf:'stretch',
    marginHorizontal: 10,
    marginTop:10
  },
  selected:{
    backgroundColor:'#ccc',
    color:'white'
  },
  textarea: {
    height:100
  },
  dateInput: {
    width:120
  }
}