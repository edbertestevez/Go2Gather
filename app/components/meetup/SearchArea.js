import React, { Component } from 'react';
import {View, Text, Image,} from "react-native";
import { NavigationActions } from 'react-navigation';
//REDUX
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import {ActionCreators} from '../../actions'
import { BackHandler, ListView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
//FIREBASE
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import {List, ListItem,Container, Header, Spinner, Thumbnail, Content, Form, Input, Item, InputGroup, Label, Footer, StyleProvider, Left, Right, Button, Body, Title, Card, CardItem} from 'native-base';
import styles from '../../styles/styles_main'

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class SearchArea extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	
	  };
	}
	
	componentWillMount(){
	
	}

	render(){
		return(
				<GooglePlacesAutocomplete
        selectTextOnFocus={true}
          placeholder='Search'
          minLength={1} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed='auto'    // true/false/undefined
          fetchDetails={true}
          renderDescription={(row) => row.description} // custom description render
          onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data);
            console.log(details);
            //SET REDUX VALUES
            this.setState({data});
            this.setState({details});
            this.props.actions.setLocationSearch(data,details);
            
          }}
          getDefaultValue={() => {
            return ''; // text input default value
          }}
          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyD2AcRJkV3zokjx3oxmLJHBQOmRelqKPY0',
            language: 'en', // language of the results
            radius: 500,
            location:"10.678546,122.954418",
            //types: '(restaurant)'
            //types: '(cities)' // default: 'geocode'
          }}
          styles={{
            position:"absolute",
            top:0,
            alignSelf:"flex-start",
            zIndex:10,
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            },
            listView:{
            	backgroundColor:"white",
            	height: 300
            },
            textInput: {
              color: '#00539b',
              fontSize: 18,
              height: 55,
              marginTop:0
            },
            textInputContainer: {
      		    backgroundColor:"white",
      		    borderBottomWidth: 0,
              borderTopWidth: 0,
              height:55,
              borderWidth: 1,
              borderRadius: 2,
              borderColor: '#ddd',
              borderBottomWidth: 0,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 3,
              alignItems:"center"
            },
        		  description: {
        	     fontWeight: 'bold',
        	  },
            separator:{
              borderBottomWidth:2,
              borderColor: "#e8e8e8"
            }
            }}
       		textInputProps={{
      		    //onChangeText: (text) => { console.log(text) }
      		}}
        currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          //rankby: 'distance',
          types: 'restaurant',
          keyword: 'restaurant'
        }}
 
      //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      //predefinedPlaces={[homePlace, workPlace]}
 
      debounce={100} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      //renderLeftButton={() => <Icon name="location-on" />}
    />	

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

export default connect(mapStateToProps,mapDispatchToProps)(SearchArea);