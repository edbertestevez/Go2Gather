import React, { Component } from 'react';
import {View, TouchableHighlight, BackHandler} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {Container, Header, Root, Content, ActionSheet, Text, Footer, FooterTab, StyleProvider, Icon, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
//CONTENT
import HomeMap from './HomeMap';
import styles from '../../styles/styles_main'

//ACTION SHEET
var BUTTONS = [
{text:"Search By Name", icon: "search"}, 
{text:"Random Location", icon: "md-add"}, 
{text:"Restaurants", icon: "restaurant"}, 
{text:"Resorts and Pools", icon: "home"}, 
{text:"Mall and Recreation", icon: "ios-people"}, 
{text:"Cancel", icon: "close"}
];
var CANCEL_INDEX = 5;

class HomeMainScreen extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	
	  };
	}

	componentDidMount() {
		var that = this;
	 	BackHandler.addEventListener('hardwareBackPress', function() {
	 	that.props.navigation.goBack();return true;
	 });
	}

	componentWillMount(){
		GoogleSignin.configure({
	      //iosClientId: "<FROM DEVELOPER CONSOLE>", // only for iOS
	      webClientId: "206519716919-v93fl7b6pupffparflkjqpl7f77hpr4h.apps.googleusercontent.com",
	    })
	    console.log(this.props)
	}
	render(){
		console.log(this.props)
		return(
			<Container style={{flex:1}}>

	        <Header style={styles.header}>
	          <Left style={{ flex: 1 }}>
	            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
	              <Icon name='menu' />
	            </Button>
	          </Left>
	          <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
	            <Title>Go2Gather</Title>
	          </Body>
	          <Right style={{ flex: 1 }}>

	          	<Button transparent onPress={()=>
	          	ActionSheet.show(
	              {
	                options: BUTTONS,
	                cancelButtonIndex: CANCEL_INDEX,
	                title: "Search Location"
	              },
	              buttonIndex => {
	                switch(buttonIndex){
	                	case 0:{
	                		this.props.actions.searchGooglePlace(this.props.state.location);
	                	}break;
	                }
	              }
	            )
	          	}>
	              <Icon name='search' size={40}/>
	            </Button>
	            
	          </Right>
	        </Header>
	        
	       	
	        <HomeMap/>
		       	<Footer style={styles.header}>
		       	<FooterTab style={styles.header}>
		            <Button 
		            	onPress={()=>this.props.actions.changeMapType("standard")}
		            	active={this.props.state.location.mapType==='standard'} >
		              <Text>Standard</Text>
		            </Button>
		            
		            <Button 
		            	onPress={()=>this.props.actions.changeMapType("satellite")}
		            	active={this.props.state.location.mapType==='satellite'} >
		              <Text>Satellite</Text>
		            </Button>
		            
		            <Button 
		            	onPress={()=>this.props.actions.changeMapType("hybrid")}
		            	active={this.props.state.location.mapType==='hybrid'} >
		              <Text>Hybrid</Text>
		            </Button>
	          </FooterTab>
	       	</Footer>

	        </Container>
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

export default connect(mapStateToProps,mapDispatchToProps)(HomeMainScreen);