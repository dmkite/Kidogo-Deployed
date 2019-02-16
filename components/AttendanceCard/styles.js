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
    height:150,
    padding:10,
    position:'relative',
    borderWidth: 1,
    borderColor: '#ffffff80',
    marginBottom:15,
    opacity:1
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
    borderColor:'#ffffff80',
    zIndex:101
  },
  img:{
    flex:1,
  },
  text:{
    fontSize:18,
    color:'white'
  },
  selected:{
    // opacity:.3,
    scaleX: .7,
    scaleY: .7
  },
  imgNameHolder:{
    height:80,
    width:80,
    zIndex:100,
    overflow:'hidden'
  },
  letter:{
    fontSize:36,
    color:'white',
    lineHeight:80,
    textAlign:'center'
  }

}