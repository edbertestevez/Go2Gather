import React, { Component } from 'react';
import {View, TouchableHighlight, BackHandler, Alert} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import {Container, Header, Root, Content, ActionSheet, Text, Footer, FooterTab, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
//CONTENT
import HomeMap from './HomeMap';
import styles from '../../styles/styles_main'
import * as firebase from 'firebase'
//import GeocoderAPI from '../../config/geocoder';
import RNGooglePlaces from 'react-native-google-places';
import Geocoder from 'react-native-geocoding';
import RNExitApp from 'react-native-exit-app';

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
		 	//that.props.navigation.goBack();
		 	//alert("Exit");
		 	//()=>this.exitApp();
		 	Alert.alert(
			  'Exit App',
			  'Are you sure you want to exit the app?',
			  [
			    {text: 'Cancel',  style: 'cancel'},
			    {text: 'Exit', onPress: () => RNExitApp.exitApp()},
			  ],
			  { cancelable: false }
			)
		 	return true;
	 	});
	}

	exitApp(){
		Alert.alert(
		  'Go2Gather',
		  'Are you sure you want to exit the app?',
		  [
		    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
		    {text: 'Yes', onPress: () => BackHandler.exitApp()},
		  ],
		  { cancelable: false }
		)
	}

	componentWillMount(){
		console.log("HOME NA KO", this.props.state.nav)

		GoogleSignin.configure({
	      webClientId: "206519716919-v93fl7b6pupffparflkjqpl7f77hpr4h.apps.googleusercontent.com",
	    })
	    
		//CHANGE THIS TO GEOCODER FOR EXACT LONG AND LAT
		//console.log("Getting Initial Position . . .");
		RNGooglePlaces.getCurrentPlace()
        .then((results) => {
          var initialPosition = {
            latitude: results[0].latitude,
            longitude: results[0].longitude,
            place: results[0].name
          }
          this.props.actions.updateLocation(this.props.state.account, initialPosition);
          })
        .catch((error) => console.log(error.message));
		
		//UPDATE HERE!!!!!!!!!
        //pre-fetch all user's data
        this.props.actions.loadMeetupData(this.props.state.account.uid); //meetups
        this.props.actions.loadFriendsData(this.props.state.account.uid); //friends
        this.props.actions.loadMeetupRequestData(this.props.state.account.uid); //friends
	}

	componentWillUnmount() {
	    navigator.geolocation.clearWatch(this.watchId);
	}

	render(){
		return(
			<Container style={{flex:1}}>

	        <Header style={styles.header}>
	          <Left style={{ flex: 1 }}>
	            <Button transparent onPress={() => this.props.navigation.navigate('DrawerOpen')}>
	              <Icon style={styles.headerButton} name='menu' size={25}/>
	            </Button>
	          </Left>
	          <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
	            <Title>Go2Gather</Title>
	          </Body>
	          <Right style={{ flex: 1 }}>
	              <Icon name='search'  style={styles.headerButtonRight} size={28}
	              onPress={()=>
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
		          	}/>
	          </Right>
	        </Header>

	        {this.props.state.location.searchPlace.isActive ?
	        <View style={{flexDirection:"row", width:'100%', height:60, paddingLeft:20, paddingTop:8, backgroundColor:'rgba(255,255,255,0.9)', position:'absolute', top:55,zIndex:5}}>
	        	<View style={{width:'80%', maxWidth:'80%'}}>
	        		<Text style={{color:'#660000', fontSize:12, fontWeight:'bold'}}>Searched Location:</Text>
	        		<Text numberOfLines={1} style={{color:'#606060',  fontSize:18, fontWeight:'bold'}}>
	        			{this.props.state.location.searchPlace.place}
	        		</Text>
	        	</View>
	        	<View style={{flexDirection:'row', paddingTop:10, width:'20%'}}>
	        		{this.props.state.location.searchPlaceStatus?
	        		<Icon 
	        			name='directions' 
	        			style={styles.directionButton} 
	        			size={30}
	        			onPress={()=>this.props.actions.toggleDirection(false)}
	        		/>:
	        		<Icon 
	        			name='directions' 
	        			style={styles.directionButtonOff} 
	        			size={30}
	        			onPress={()=>this.props.actions.toggleDirection(true)}
	        		/>
	        		}

	        		<Icon 
	        			name='close' 
	        			style={{color:'#282828', marginLeft:10}} 
	        			size={30}
	        			onPress={()=>this.props.actions.closeDirection()}
	        		/>
	        	</View>
	        </View>
	    	:null}
	       	
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
		            	//onPress={()=>this.props.navigation.navigate('Sample')} 
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