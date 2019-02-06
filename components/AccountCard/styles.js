export const styles = {
  card:{
    height:150, 
    margin:10,
    padding:10,
    flex:1,
    borderWidth:2,
    borderColor:'#ccc',
    borderRadius:5
  },
  imgAndBalance:{
    flex:1,
    flexDirection:'row'
  },
  img:{
    flex:.5,
    flexDirection:'row'
  },
  balance:{
    fontSize:45,
    color:'#de6789',
    flex:.5,
    textAlign:'right',
    fontWeight:'100'
  },
  circle:{
    zIndex:101,
    overflow:'hidden',
    height:75, 
    width: 75, 
    marginRight: -25, 
    borderColor: 'white', 
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
    fontWeight:'bold'
  },
  guardianName:{
    fontSize:14
  }
}