import * as constants from '../../constants';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

export function setLocationSearch(data, details){
	return (dispatch) => {
		if("opening_hours" in details){
			dispatch(locationSearchSelected(data, details, details.opening_hours.open_now))
		}else{
			dispatch(locationSearchSelected(data, details, null))
		}
	}
}

export function clearLocationSearch(){
	return (dispatch) => {
		dispatch(locationSearchClear())
	}
}

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
		RNGooglePlaces.openPlacePickerModal({
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

function locationSearchSelected(data, details, open_now){
	return{
		type: "SET_LOCATION_SEARCH_DATA",
		data,
		details,
		open_now
	}
}

function locationSearchClear(){
	return{
		type: "CLEAR_LOCATION_SEARCH_DATA"
	}
}
