import React, { Component } from 'react';
import {View, Text} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import { BackHandler } from "react-native";
//STYLE
import styles from '../styles/style_login';
//FIREBASE
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import ResponsiveImage from 'react-native-responsive-image';

class SampleScreen extends Component {

	checkLogged(action){
		const { navigate } = this.props.navigation;
		console.log("Checking if logged in . . .");
		let route;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				firebase.database().ref("/users/"+user.uid).on('value', (snapshot) => {
					if(snapshot.exists()){
						action.updateAccount(snapshot.key,snapshot.val());
					}
				});

				console.log('user logged');
				//DRAWER INSTEAD OF HOME KAY AMO MANA ANG IYA DEFAULT STACK SA DRAWER ANG HOME
				route="Drawer";
				navigate(route);
		    }else{
		      	console.log('not logged');
		      	route="Login";
		      	navigate(route);
		    }
		});
	}
	componentWillMount(){
		setTimeout(()=>this.checkLogged(this.props.actions), 2000);
		
		GoogleSignin.configure({
	      //iosClientId: "<FROM DEVELOPER CONSOLE>", // only for iOS
	      webClientId: "206519716919-v93fl7b6pupffparflkjqpl7f77hpr4h.apps.googleusercontent.com",
	    })
	}
	

	render(){
		return(
			<View style={{flex:1, backgroundColor: '#033031', alignItems:'center'}}>
				<ResponsiveImage source={require('../img/logo.png')} style={{marginTop: 50}} initWidth="350" initHeight="350"/>
				<Text style={styles.logoname}>Go2Gather</Text>
				<Text style={styles.subTitle}>Gather and meetup with others and know their current location.</Text>
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

export default connect(mapStateToProps,mapDispatchToProps)(SampleScreen);