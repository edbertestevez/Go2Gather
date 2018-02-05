import React, { Component } from 'react';
import {View, TouchableHighlight, StyleSheet, Text,Image} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapViewDirections from 'react-native-maps-directions';
import {Container, Header, Fab, Thumbnail, Content, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
//MAPS
import MapView, {Marker, Callout} from 'react-native-maps';
//import GeocoderAPI from '../../config/geocoder';
import RNGooglePlaces from 'react-native-google-places';
import Geocoder from 'react-native-geocoding';
//CONTENT
import mapStyles from '../../styles/styles_map';

const defaultAPIKey = "AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0";
Geocoder.setApiKey(defaultAPIKey);

class SearchMap extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	regionPoint:{
				latitude: 10.5966796,
				longitude: 122.9033423,	
				longitudeDelta:0.004,
				latitudeDelta:0.004,
		}
	  };
	}

	componentDidMount(){
		// this.setState({
		// 	regionPoint:{
		// 		latitude: this.props.state.account.latitude,
		// 		longitude: this.props.state.account.longitude,	
		// 		longitudeDelta:0.004,
		// 		latitudeDelta:0.004,
		// 	}
		// })
		//console.log(this.props);
	}

	render(){
		return(
			<View style={{flex:1}}>
			<MapView
				ref={component => {this._map = component;}}
				style={StyleSheet.absoluteFill}
				mapType={this.props.state.location.mapType}
	        	initialRegion={{
		            latitude: this.state.regionPoint.latitude,
		            longitude: this.state.regionPoint.longitude,
		            latitudeDelta: this.state.regionPoint.latitudeDelta,
		            longitudeDelta: this.state.regionPoint.longitudeDelta,
		          }}>   

		        <MapView.Marker
			    	coordinate={{
			    		latitude: this.props.state.location.latitude,
			            longitude: this.props.state.location.longitude,
			    	}}
			    >
			    <View>
			    	<Image style={{width: 60, height:60}}source={require('../../img/usermarker.png')}/>
			    	<Image
				        style={{width: 38, height: 38, position:'absolute', borderRadius:19, marginLeft:11, marginTop:4}}
				        source={{uri: this.props.state.account.photo}}
				    />
			    </View>
			    	
			    </MapView.Marker>

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

export default connect(mapStateToProps,mapDispatchToProps)(SearchMap);