import React, { Component } from 'react';
import {View, TouchableHighlight, StyleSheet,Image, Text} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler } from "react-native";
import MapViewDirections from 'react-native-maps-directions';
import {Container, Header, Content, Footer, StyleProvider, ActionSheet, Left, Right, Fab, Button, Body, Title, Card, CardItem} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
//MAPS
import MapView, {Marker, Callout} from 'react-native-maps';
//import GeocoderAPI from '../../config/geocoder';
import RNGooglePlaces from 'react-native-google-places';
import Geocoder from 'react-native-geocoding';
//CONTENT
import mapStyles from '../../styles/styles_map';
import mapstyles from '../../styles/styles_map';
import * as firebase from 'firebase';

const defaultAPIKey = "AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0";
Geocoder.setApiKey(defaultAPIKey);

class HomeMap extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	//edit this to actual props
	  	meetup:{
			longitude: 122.95862659999999,
			latitude: 10.6910308,
			longitudeDelta:0.004,
			latitudeDelta:0.004,
			place: "",
			address:"",
			
		},
		info:{
			duration: '',
			distance: '',
		},

		usersPoints:[
			// {
			// 	//name: "GayleDuron",

			// 	latitude: 10.681225,
			// 	longitude:  122.956101,
			// 	//icon:'search'
			// },
			// {
			// 	latitude: 10.68597,
			// 	longitude:  122.957238,
			// 	//name: "Meagan Hofilena",
			// 	//icon:'search'
			// },
		],
		userButtons:[
			{
				text: "Close",
				icon:'close'
			},
			// {
			// 	text: "Meagan Hofilena",
			// 	icon:'search'
			// }
		],
		usersInfo:[
			// {
			// 	name:"edbert"
			// }
		]
	  };
	}

	componentWillMount(){
		this.setState({
			meetup:{
				longitude: 122.95862659999999,
				latitude: 10.6910308,
				longitudeDelta:0.004,
				latitudeDelta:0.004,
				place: "ROBINSONS PLACE BACOLOD",
				address:"2nd Floor, Robinsons Place Bacolod, Lacson Street, Bacolod, Negros Occidental, Philippines",
			},
			myLocation:{
				latitude: 10.68597,
				longitude:  122.957238,
			},
			regionPoint:{
				longitude: 122.95862659999999,
				latitude: 10.6910308,
				longitudeDelta:0.004,
				latitudeDelta:0.004,
			}
		})

		firebase.database().ref("/meetups/-L1zFRUl0_7Ah4Bl6Rso/users").once('value', (snapshot) =>{
			console.log("NUM RECORDS: "+snapshot.numChildren());
			snapshot.forEach((child)=>{
				if(child.key != this.props.state.account.uid){
					firebase.database().ref("/users/"+child.key).on('value', (dataSnapshot) =>{
						listinfo = {uid:child.key,name: dataSnapshot.child("name").val(),photo: dataSnapshot.child("photo").val()};
						this.setState(prevState =>({
							usersInfo:[
								...prevState.usersInfo,
								listinfo,	
							]
						}));
						list = {text: dataSnapshot.child("name").val(),icon:'search'};
						console.log(dataSnapshot.child("name").val())
						this.setState(prevState =>({
							userButtons:[
								...prevState.userButtons,
								list,	
							]
						}));

						listpoint = {longitude: dataSnapshot.child("longitude").val(),latitude: dataSnapshot.child("latitude").val()};
						this.setState(prevState =>({
							usersPoints:[
								...prevState.usersPoints,
								listpoint,	
							]
						}));

						
						console.log(this.state.usersInfo)
					});		
				}
			});
		});
	}

	componentDidMount() {
	    var that = this;
	    BackHandler.addEventListener('hardwareBackPress', function() {
	    this.props.navigation.goBack();return true;
	   });
	    //console.log(this.state);
	}


	gotoMyLocation(){
		var that = this;
		this.setState({
			regionPoint:{
				latitude: that.props.state.account.latitude,
				longitude: that.props.state.account.longitude,	
				longitudeDelta:0.004,
				latitudeDelta:0.004,
			}
		})
	}

	gotoSelectedLocation(num){
		
		//console.log("EDEODKEoJDE");
		var that = this;
		
		this.setState({
			regionPoint:{
				latitude: that.state.usersPoints[num].latitude,
				longitude: that.state.usersPoints[num].longitude,	
				longitudeDelta:0.004,
				latitudeDelta:0.004,
			}
		})
	}

	setInfo(result){
		this.setState({
		    info:{
		    duration: result.duration,
		    distance: result.distance
		}});
		console.log("MAPS")
	}

	showFriendsList(){
		var that = this;
		var BUTTONS = that.state.userButtons;
		var CANCEL_INDEX = 0;

		ActionSheet.show(
	        {
	            options: BUTTONS,
	            cancelButtonIndex: CANCEL_INDEX,
	            title: "Go to User's Location"
	        },
	        buttonIndex => {
	            that.gotoSelectedLocation(buttonIndex-1);
	            //alert(buttonIndex);
	            //alert(that.state.usersPoints[0])
	            // switch(buttonIndex){
	            //     case 0:{
	            //     	this.props.actions.searchGooglePlace(this.props.state.location);
	            //     }break;
	            // }
	        }
	    )
	}

	render(){
	//let points = this.state.usersPoints.length;
		return(
			<View style={{flex:1,zIndex:1}}>
			
			<View style={mapstyles.infoMap}>
		        <Text style={{fontSize:17,fontWeight:'bold', color:'#660000',marginBottom:5}}>Time: 6:30PM (1 hr from now)</Text>
		        <Text style={{fontSize:15,fontWeight:'bold'}}>Travel Time: {this.state.info.duration}4min</Text>
		        <Text style={{fontSize:15,fontWeight:'bold'}}>Distance: {this.state.info.distance}800m</Text>
	        </View>

			<MapView
				style={StyleSheet.absoluteFill}
				mapType={this.props.state.location.mapType}
	        	region={{
		            latitude: this.state.regionPoint.latitude,
		            longitude: this.state.regionPoint.longitude,
		            latitudeDelta: this.state.regionPoint.latitudeDelta,
		            longitudeDelta: this.state.regionPoint.longitudeDelta,
		          }}>   

		        <Marker coordinate={{latitude: this.state.meetup.latitude,longitude: this.state.meetup.longitude,}}>
			    <View><Image style={{width: 60, height:60}}source={require('../../img/maplogo.png')}/></View>
			    </Marker>

			   	{
			   		this.state.usersPoints.map((record,index)=>{		
			   		console.log("PHOTO", this.state.usersInfo[index].photo)
					let userphoto = this.state.usersInfo[index].photo;
					return(
					    <Marker coordinate={this.state.usersPoints[index]} key={index}>
					    <View>
					    <Image style={{width: 60, height:60}}source={require('../../img/usermarker2.png')}/>
					    <Image
				          style={{width: 38, height: 38, position:'absolute', borderRadius:19, marginLeft:11, marginTop:2}}
				          source={{uri: userphoto}}
				        />
					    </View>
					    </Marker>			
			   		);
			   		})
			   	}
			    
			    {/*}
			    <Marker coordinate={this.state.usersPoints[1]}>
			    <View><Image style={{width: 60, height:60}}source={require('../../img/usermarker2.png')}/></View>
			    </Marker>

			    <Marker coordinate={this.state.usersPoints[0]}>
			    <View><Image style={{width: 60, height:60}}source={require('../../img/usermarker3.png')}/></View>
			    </Marker>
				{*/}

			    <MapView.Marker coordinate={{latitude: this.props.state.account.latitude,longitude: this.props.state.account.longitude,}}>
			    <View><Image style={{width: 50, height:50}}source={require('../../img/usermarker.png')}/></View>
			    </MapView.Marker>
	        
	        	<MapViewDirections
	              origin={{
	              	//users location
	                latitude: this.props.state.account.latitude,
			            longitude: this.props.state.account.longitude,
	              }}
	              destination={{
	              	//destination search location
	                latitude: this.state.meetup.latitude,
			            longitude: this.state.meetup.longitude,
	              }}
	              apikey={"AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0"}
	              strokeWidth={8}
	              strokeColor="blue"
	              onReady={(result)=>{console.log("MAP")}}
	              //onReady={(result) => this.setInfo(result)}
		            onError={(errorMessage) => {
		              // console.log('GOT AN ERROR');
		            }}
	            /> 
	        </MapView>


		        <Fab
		            style={{backgroundColor:"#f2f2f2",zIndex:5,marginBottom:65}}
		            position="bottomRight"
		            onPress={()=>this.gotoMyLocation()}>
		            
		            <Icon name="my-location" style={{ color:"#4f4f4f"}}/>
		        </Fab>


	            <Fab
		            style={{backgroundColor:"#1b5454",zIndex:5}}
		            position="bottomRight"
		            onPress={()=>this.showFriendsList()}>
		            <Icon name="people" />
		        </Fab>
	        </View>
		);
	}
}

//PROPS
const mapStateToProps = state => ({
  state: state
});
 
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(HomeMap);