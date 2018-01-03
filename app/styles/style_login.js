import {StyleSheet} from 'react-native';
module.exports = StyleSheet.create({
  mainContainer:{
    flex: 1,
    backgroundColor: "#033031",
    alignItems: 'center',
  },
  logoname:{
  	fontSize: 40,
  	fontFamily: 'Impact',
  	color: '#d8f9fa',
  	textAlign: 'center',
  	marginTop: -40,
    marginBottom: 40
  },
  footerText:{
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  footerContainer:{
    position: 'absolute',
    bottom: 20
  },
  buttonText:{
    fontSize: 18,
    color: 'white',
    textAlign: 'center'
  },
  optionButton:{
    width: '75%', 
    height: 55, 
    flexDirection: 'row', 
    marginBottom: 15
  },
  optionIcon:{
    width: 50, 
    justifyContent: 'center'
  },
  buttonIcon:{
    width: 60, 
    color: 'white',
    marginLeft: 20
  },
  optionText:{
    width: '80%', 
    justifyContent: 'center'
  },
  bgRed:{
    backgroundColor: '#bf2409', 
  },
  bgBlue:{
    backgroundColor: '#435cd8',
  },
  subTitle:{
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    width: '65%'
  }
});
