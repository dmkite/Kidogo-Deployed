import { withNativeAd } from "expo/build/facebook-ads";

export const styles = {
  dateHolder:{
    flexDirection:'row',
    justifyContent: 'space-between',
    margin:10,
    marginTop:20,
    marginBottom: 10,
    height:40,
  },
  h1:{
    fontSize:36,
    lineHeight:40,
    color:'white'
  },
  dates:{
    flexDirection:'row',
    alignItem:'flex-end',
    marginBottom:10
  },
  date:{
    flex:.1,
    margin:5,
  },
  dateText:{
    width:50,
    transform: [{ rotate: '-66deg' }],
    fontSize:16,
    color:'white'
  },
  child:{
    flex:.3
  },

  name:{
    fontSize:14,
    marginLeft:5,
    color:'white'
  },
  dateStatusHolder:{
    flex:.1,
    margin:5,
  },
  dateStatus:{
    height:30,
    width:30,
    borderRadius:15,
    marginTop:18
  },
  attendanceRow:{
    flexDirection:'row',
    padding: 5
  }
}