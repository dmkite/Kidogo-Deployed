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
    width:100,
    height:200,
    padding:10,
    position:'relative',
    borderRadius:5,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  present:{
    backgroundColor:'green',
    height:50,
    width:50,
    borderRadius:25,
    position:'absolute',
    top:-10,
    right:-10,
    borderWidth:2,
    borderColor:'white'
  },
  img:{
    flex:1,
  },
  text:{
    fontSize:18
  }
}