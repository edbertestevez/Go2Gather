import {StyleSheet} from 'react-native';
module.exports = StyleSheet.create({
  header:{
    backgroundColor: "#1b5454",
    zIndex:2
  },
  profileImage:{
  	width: 120,
  	height: 120,
  	borderRadius: 110,
  	zIndex:10,
  	marginTop: 10,
  },
  user_name:{
    fontSize:20,
    color: '#fff',
    //marginTop: 20,
    marginBottom: 5,
    fontWeight:'bold'
  },
  primaryColor:{
    backgroundColor: "#1b5454",
  },
  meetupTitle:{
    fontSize: 16,
    fontWeight:'bold',
    color: '#660000'
  },
  formCustIcon:{
    maxWidth:30,
    height:25
  },
  headerButtonRight:{
    color: 'white',
    marginLeft:7,
    marginRight:3
  },
  headerButton:{
    color: 'white',
  },
  directionButton:{
    color:'#086aaf',
  },
  directionButtonOff:{
    color:'#5b5d60',
  },
  viewMeetupTitle:{
    width:"100%",
    color:"white",
    fontSize:23,
    fontWeight:"bold",
    marginBottom:15
  },
  roundButtonNoBottomProfile:{
    paddingLeft:15, paddingRight:25,marginRight:8, marginTop:-5
  },
  roundButton:{
    paddingLeft:15, paddingRight:25, marginBottom:20,marginRight:8
  },
  selectRoundButton:{
    paddingLeft:30, paddingRight:30, marginRight:5
  },
  buttonWhiteText:{
    color:"white",
    fontSize:14
  },
  buttonBlackText:{
    color:"black",
    fontSize:14
  },
  roundImage70:{
    borderRadius:50
  },
  roundButtonNoIcon:{
    paddingLeft:25, paddingRight:25, marginBottom:20,marginRight:8
  },
  searchNearbyButton:{
    justifyContent:"center", alignItems:"center",
    shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.8,
    shadowRadius: 3,shadowColor:"#000",elevation:2, marginRight:12, width: 100, height: 110, backgroundColor:"#fff", borderRadius:15
  },
  

  
});
