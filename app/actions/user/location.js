import * as constants from '../../constants';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

export function closeDirection(){
	return (dispatch) => {
		dispatch(directionClose());
	}
}

export function toggleDirection(condition){
	return (dispatch) => {
		dispatch(directionToggle(condition));
	}
}

export function updateLocation(account,location){
	//alert("ACCOUNT "+JSON.stringify(account));
	firebase.database().ref('/users/'+account.uid+"/location").update({
			place: location.place,
			latitude: location.latitude,
			longitude: location.longitude
		});
	return (dispatch) => {
		dispatch(locationUpdate(location));
	}
}

export function changeMapType(data){
	return (dispatch) => {
		dispatch(mapTypeChange(data));
	}
}

export function searchGooglePlace(initialPosition){
	return (dispatch) => {
		RNGooglePlaces.openAutocompleteModal({
	      country: "PH",
	      latitude: initialPosition.latitude,
	      longitude: initialPosition.longitude,
	      radius: 50
	    })
	      .then((place) => {
	      	console.log(place)
	        //alert(JSON.stringify(place))
	        dispatch(setGooglePlaceSearch(place));
	      console.log(place);
	      })
	      .catch(error => {
	        alert("Direction not available");
	        console.log(error.message);
	      })
	}
}



//FUNCTIONS
function locationUpdate(data){
  //console.log("Getting location. . . ");
  return{
    type: constants.UPDATE_POSITION,
    data
  }
}

function setGooglePlaceSearch(data){
  //console.log("Opening Google Place Search . . . ");
  return{
    type: constants.SEARCH_GOOGLE_PLACE,
    data
  }
}



function mapTypeChange(data){
  return{
    type: constants.CHANGE_MAPTYPE,
    data
  }
}

function directionToggle(condition){
	return{
		type: constants.TOGGLE_DIRECTION,
		condition
	}
}

function directionClose(){
	return{
		type: constants.CLOSE_DIRECTION
	}
}