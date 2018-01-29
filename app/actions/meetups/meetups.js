import * as constants from '../../constants';
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';

export function setMeetupPlace(){
	return(dispatch, getState) => {
		const currentState = getState();
		var meetupLocation = [];
		meetupLocation ={
			address: currentState.location.locationSearchDetails.formatted_address,
			name: currentState.location.locationSearchDetails.name,
			longitude: currentState.location.locationSearchDetails.longitude,
			latitude: currentState.location.locationSearchDetails.latitude,

		}
		console.log(meetupLocation);
		dispatch(setGooglePlaceSearchMeetup(meetupLocation));
	}
}

export function enter_event_name(input){return (dispatch) => dispatch(event_name(input))}
export function enter_event_date(input){return (dispatch) => dispatch(event_date(input))}
export function enter_event_time(input){return (dispatch) => dispatch(event_time(input))}

export function clearMeetupForm(){return (dispatch) => dispatch(clearForm())}

export function updateFriendMeetups(data){
	return (dispatch) => {
		dispatch(updateMeetupFriends(data));
	}
}

export function searchGooglePlaceMeetup(initialPosition){
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
	        dispatch(setGooglePlaceSearchMeetup(place));
	      console.log(place);
	      })
	      .catch(error => {
	        alert("Direction not available");
	        console.log(error.message);
	      })
	}
}

//FUNCTIONS
function event_name(input){return{type: constants.MEETUP_NAME,input}}
function event_date(input){return{type: constants.MEETUP_DATE,input}}
function event_time(input){return{type: constants.MEETUP_TIME,input}}

function clearForm(){return{type: constants.MEETUP_CLEAR_FORM,input}}


function updateMeetupFriends(data){
  console.log("Updating Friends to request. . . ");
  return{
    type: constants.UPDATE_MEETUP_FRIENDS,
    data,
  }
}

function setGooglePlaceSearchMeetup(data){
	console.log(data)
  //console.log("Opening Google Place Search For Meetup. . . ");
  return{
    type: constants.SEARCH_GOOGLE_PLACE_MEETUP,
    data
  }
}

