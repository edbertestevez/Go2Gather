import React, { Component } from 'react';
import {View, TouchableHighlight, StyleSheet, Text} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler } from "react-native";
import MapViewDirections from 'react-native-maps-directions';
import {Container, Header, Content, Footer, StyleProvider, Icon, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
//MAPS
import MapView, {Marker, Callout} from 'react-native-maps';
//import GeocoderAPI from '../../config/geocoder';
import RNGooglePlaces from 'react-native-google-places';
import Geocoder from 'react-native-geocoding';
//CONTENT
import mapStyles from '../../styles/styles_map';

const defaultAPIKey = "AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0";
Geocoder.setApiKey(defaultAPIKey);

class HomeMap extends Component {
	componentDidMount(){
		//CHANGE THIS TO GEOCODER FOR EXACT LONG AND LAT
		console.log("Getting Initial Position . . .");
		RNGooglePlaces.getCurrentPlace()
        .then((results) => {
          console.log(results);
          var initialPosition = {
            latitude: results[0].latitude,
            longitude: results[0].longitude,
            place: results[0].name
          }
          this.props.actions.updateLocation(initialPosition);
          })
        .catch((error) => console.log(error.message));
	}
	
	componentWillUnmount() {
	    navigator.geolocation.clearWatch(this.watchId);
	}
	render(){
		return(
			<View style={{flex:1}}>
			<MapView
				style={StyleSheet.absoluteFill}
				mapType={this.props.state.location.mapType}
	        	region={{
		            latitude: this.props.state.location.latitude,
		            longitude: this.props.state.location.longitude,
		            latitudeDelta: this.props.state.location.latitudeDelta,
		            longitudeDelta: this.props.state.location.longitudeDelta,
		          }}>   

		        <MapView.Marker
			    	coordinate={{
			    		latitude: this.props.state.location.latitude,
			            longitude: this.props.state.location.longitude,
			    	}}
			    	pinColor="green"/>


			    {this.props.state.location.searchPlace.isActive ?	
			    	<MapView.Marker 
			    		coordinate={{
			    			latitude: this.props.state.location.searchPlace.latitude,
	                		longitude: this.props.state.location.searchPlace.longitude,
			    	}}/> : null}

			    {this.props.state.location.searchPlace.isActive ?	
			    <MapViewDirections
	              origin={{
	              	//users location
	                latitude: this.props.state.location.latitude,
	                longitude: this.props.state.location.longitude,
	              }}
	              destination={{
	              	//destination search location
	                latitude: this.props.state.location.searchPlace.latitude,
	                longitude: this.props.state.location.searchPlace.longitude,
	              }}
	              apikey={"AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0"}
	              strokeWidth={8}
	              strokeColor="blue"
	            /> 
	            :null}
	        </MapView>
	          
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