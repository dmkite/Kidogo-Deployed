export const styles = {
  card:{
    minHeight:150, 
    margin:10,
    padding:10,
    flex:1,
    backgroundColor:'#635066',
    borderWidth:1,
    borderColor:'#ffffff80'
  },
  h1:{
    color:'#ffffff80',
    fontSize:36
  },
  imgAndBalance:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:-20
  },
  img:{
    // flex:.5,
    marginRight:20,
    flexDirection:'row',
  },
  balance:{
    fontSize:36,
    color:'#ffffff80',
    lineHeight:70,
    fontWeight:'100',
  },
  circle:{
    zIndex:101,
    overflow:'hidden',
    height:75, 
    width: 75, 
    marginRight: -25, 
    borderColor: '#635066', 
    borderRadius: 37.5, 
    borderWidth: 5, 
    textAlign:'center',
    lineHeight:75,
    fontSize:24, 
    color:'white',
    marginTop: -5,
    marginLeft: -5
  },
  members:{
    flex:.5,
    borderColor:'red',
    marginTop:20,
    marginBottom:20
  },
  childName:{
    fontSize:18,
    fontWeight:'bold',
    color: '#ffffff80'
  },
  guardianName:{
    fontSize:14,
    color:'#ffffff80'
  }
}