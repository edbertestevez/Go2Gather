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

class HomeMap extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	regionPoint:{
				latitude: 0,
				longitude: 0 ,	
				longitudeDelta:0.004,
				latitudeDelta:0.004,
			}
	  };
	}

	componentDidMount(){
		this.setState({
			regionPoint:{
				latitude: this.props.state.account.latitude,
				longitude: this.props.state.account.longitude,	
				longitudeDelta:0.004,
				latitudeDelta:0.004,
			}
		})
		//console.log(this.props);
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

		this._map.animateToRegion({
			latitude: that.props.state.account.latitude,
			longitude: that.props.state.account.longitude,	
			longitudeDelta:0.004,
			latitudeDelta:0.004,
		}, 500)
	}

	gotoMeetupLocation(){
		var that = this;
		this.setState({
			regionPoint:{
				latitude: that.props.state.location.searchPlace.latitude,
				longitude: that.props.state.location.searchPlace.longitude,	
				longitudeDelta:0.004,
				latitudeDelta:0.004,
			}
		})
		this._map.animateToRegion({
			latitude: that.props.state.location.searchPlace.latitude,
			longitude: that.props.state.location.searchPlace.longitude,	
			longitudeDelta:0.004,
			latitudeDelta:0.004,
		}, 500)
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


			    {this.props.state.location.searchPlace.isActive ?	
			    	<MapView.Marker 
			    		coordinate={{
			    			latitude: this.props.state.location.searchPlace.latitude,
	                		longitude: this.props.state.location.searchPlace.longitude,
			    	}}>

			    	<View><Image style={{width: 60, height:60}}source={require('../../img/maplogo.png')}/></View>
			    
			    	</MapView.Marker> 

			    	: null}

			    {this.props.state.location.searchPlaceStatus ?	
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
	              strokeWidth={6}
	              strokeColor="green"
	              /*onReady={(result) => {
		              console.log("DIRECTION",result);
		            }}
		            onError={(errorMessage) => {
		              // console.log('GOT AN ERROR');
		            }}*/
	            /> 
	            :null}
	        </MapView>
	        
	         	
	        
	        {this.props.state.location.searchPlace.place!="" ? 
	          <Fab
		            style={{backgroundColor:"#1b5454",zIndex:5}}
		            position="bottomRight"
		            onPress={()=>this.gotoMeetupLocation()}>
		            
		            <Thumbnail source={require('../../img/logo.png')} style={{width:40, height:40}}/>
		        </Fab>
		    :
		    	 <Fab
		            style={{backgroundColor:"#f2f2f2",zIndex:5}}
		            position="bottomRight"
		            onPress={()=>this.gotoMyLocation()}>
		            
		            <Icon name="my-location" style={{ color:"#4f4f4f"}}/>
		        </Fab>
			}
			{this.props.state.location.searchPlace.place!="" ? 
				<Fab
		            style={{backgroundColor:"#f2f2f2",zIndex:5, marginBottom:65}}
		            position="bottomRight"
		            onPress={()=>this.gotoMyLocation()}>
		            
		            <Icon name="my-location" style={{ color:"#4f4f4f"}}/>
		    	</Fab>
		    :null}

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