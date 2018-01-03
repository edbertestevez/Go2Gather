import {StyleSheet} from 'react-native';
module.exports = StyleSheet.create({
  container:{
  	flex: 1,
  	backgroundColor: '#fafafa'
  },
  header:{
    backgroundColor: "#1b5454",
    height: 170,
  },
  circleImage:{
  	width: 85,
  	height: 85,
  	borderRadius: 50,
  	zIndex:10,
  	margin: 15,
  },
  accountName:{
  	marginLeft:18,
  	color: '#fff',
  	fontSize: 14,
  	fontWeight:'bold'
  },
  accountEmail:{
  	marginLeft:18,
  	color: '#fff',
  	fontSize: 14,
  	fontWeight:'normal'
  }
});
