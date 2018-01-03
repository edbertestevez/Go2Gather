import React, { Component } from 'react';
import {Text, TextInput, Image, View, StyleSheet, TouchableOpacity, AsyncStorage, BackHandler} from 'react-native';
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

componentDidMount() {
    var that = this;
    BackHandler.addEventListener('hardwareBackPress', function() {
    that.props.navigation.goBack();return true;
   });
  }

render(){

  console.log(this.props);
  return(
		<View style={styles.mainContainer}>
	    	
        <ResponsiveImage source={require('../img/logo.png')} initWidth="380" initHeight="380"/>
 		  	<Text style={styles.logoname}>Go2Gather</Text>
 		  	 
        <LoginOptions
          googleSignin = {()=>this.props.navigation.navigate("Drawer")}
        	//googleSignin = {()=>this.props.actions.func_googleSignin()}
        	fbSignin = {()=>this.props.actions.func_googleSignout()}
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