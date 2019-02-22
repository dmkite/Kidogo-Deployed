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
    height:300,
    paddingVertical: 125,
    borderRadius:5
  },
  smallCamera: {
    alignSelf:'stretch',
    backgroundColor:'#ccc',
    marginHorizontal:10,
    height:45,
    paddingVertical:10,
    borderBottomLeftRadius:5,
    borderBottomRightRadius: 5,
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
  },
  submit:{
    margin:10,
    height:100,
    flex:1,
    justifyContent:'center',
    backgroundColor:'#ccc',
    bordeRadius:5,
    textAlign:'center',
    marginVertical:50,
    borderRadius:5,
  },
  submitText:{
    textAlign:'center',
    fontSize: 36,
    color:'white'
  },
  h1:{
    fontSize:36,
    marginHorizontal:10,
    marginBottom:30
  },
  ratePeriod: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    height:50,
    margin: 10,
  },
  rateHolder:{
    height:50,
    flex:.6,
    paddingLeft:10,
    marginRight:10,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  prefix: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ccc',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRightWidth: 0,
  },
  rateInput:{
    flex:.9,
    paddingLeft:10,
    height:50,
    marginTop:0,
    borderWidth: 2,
    borderColor: '#ccc',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  frequencyHolder:{
    flex:.4,
    flexDirection:'row'
  },
  rateLabel: {
    flex:.6,
    fontSize:18,
    lineHeight:50,
  },
  upDownHolder: {
    flex: .4,
    flexDirection:'column',
    height:50
  },
  upBtn:{
    flex:.5,
    borderTopLeftRadius: 5,
    borderTopRightRadius:5,
    backgroundColor: '#ccc',
    height:20,
    marginBottom:5   
  },
  downBtn:{
    flex:.5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius:5,
    backgroundColor:'#ccc',
    height:20   
  }
}