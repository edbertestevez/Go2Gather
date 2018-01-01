import React, { Component } from 'react';
import {Text, TextInput, Image, View, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import Icon from "react-native-vector-icons/Zocial";
import ResponsiveImage from 'react-native-responsive-image';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
//NAVIGATION
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation'
//STYLE
import styles from '../styles/style_login';
//COMPONENTS
import LoginOptions from '../components/login/loginOptions';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import * as firebase from 'firebase'

class LoginScreen extends Component {

componentDidMount(){
   //{this.checkLogged}
   firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("LOGGED IN KA NA BE");
    }else{
      console.log("WALA PA BE");
    }
  });
}

fb(){
    // const resetAction = NavigationActions.navigate({ 
    //   routeName: 'Sample'
    // });
    // this.props.navigation.dispatch(resetAction);

}



checkLogged = async () =>  {
  console.log("LLL");
  try {
    const value = await AsyncStorage.getItem('UID');
    if (value !== null){
      // We have data!!
        console.log(value);
      }
    } catch (error) {
      console.log(error);
      // Error retrieving data
    } 
}

saveData(){
  AsyncStorage.setItem("UID", "123")
}

render(){

  console.log(this.props);
  return(
		<View style={styles.mainContainer}>
	    	
        <ResponsiveImage source={require('../img/logo.png')} initWidth="400" initHeight="400"/>
 		  	<Text style={styles.logoname}>Go2Gather</Text>
 		  	 
        <LoginOptions
        	googleSignin = {()=>this.props.actions.func_googleSignin()}
        	fbSignin = {()=>this.props.actions.func_googleSignout()}
          //googleSignin = {()=>this.saveData()}
          //fbSignin = {this.checkLogged}
        />
        <Text style={{color: 'white'}}>

        </Text>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}> &#9400; All Rights Reserved</Text>
          <Text style={styles.footerText}> DecypherApps</Text>
        </View>
 		</View>
	)

	}
}

//PROPS
const mapStateToProps = state => ({
  state: state
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(LoginScreen);