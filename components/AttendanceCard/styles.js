export const styles = {
  attendanceHolder:{
    // flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    flexWrap: 'wrap',
    alignItems:'flex-start'
  },
  attendanceCard: {
    width:105,
    height:200,
    padding:10,
    position:'relative',
    borderRadius:5,
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom:15
  },
  present:{
    backgroundColor:'green',
    height:30,
    width:30,
    paddingTop:3,
    borderRadius:15,
    position:'absolute',
    top:-10,
    right:-10,
    borderWidth:2,
    borderColor:'white',
    zIndex:101
  },
  img:{
    flex:1,
  },
  text:{
    fontSize:18
  }
}