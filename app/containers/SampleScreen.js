import React, { Component } from 'react';
import {View} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../actions'
import { BackHandler } from "react-native";


class SampleScreen extends Component {
	componentDidMount() {
	    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
	  }
	  componentWillUnmount() {
	    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
	  }

	static navigationOptions = () => ({
		title: "New Patient"
	});

	onBackPress = () => {
	    if (this.props.state.nav.index === 0) {
	      return false;
	    }
	    this.props.navigation.dispatch(NavigationActions.back());
	    return true;
	 };

	render(){
		return(
			<View style={{flex:1, backgroundColor: '#000'}}>
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