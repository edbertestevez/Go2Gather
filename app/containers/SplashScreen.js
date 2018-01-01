import React, { Component } from 'react';
import {View} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import { BackHandler } from "react-native";
//FIREBASE
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';

class SampleScreen extends Component {

	_navigateTo(){
		let route;
		if (this.props.state.account.isLogged==true) {
	    	route = "Sample";
		}else{
			route = "Login";
		}	
		

	  const actionToDispatch = NavigationActions.reset({
	    index: 0,
	    actions: [NavigationActions.navigate({ routeName: route })]
	  })
	  this.props.navigation.dispatch(actionToDispatch)
	}

	check(){
		console.log("OK");
		 firebase.auth().onAuthStateChanged(function(user) {
		 	console.log("Heello");
			  if (user) {
			   console.log('user logged')
		      }else{
		      	console.log('alangs')
		      }
			});
	}

	/*componentWillMount(){
		setTimeout(()=>this.check(), 1000);
	}*/
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

	render(){
		return(
			<View style={{flex:1, backgroundColor: '#660000'}}>
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