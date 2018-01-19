import {StyleSheet} from 'react-native';
module.exports = StyleSheet.create({
  header:{
    backgroundColor: "#1b5454",
    zIndex:2
  },
  profileImage:{
  	width: 150,
  	height: 150,
  	borderRadius: 110,
  	zIndex:10,
  	marginTop: 10,
  },
  user_name:{
    fontSize:20,
    color: '#fff',
    marginTop: 20,
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
  }
});
