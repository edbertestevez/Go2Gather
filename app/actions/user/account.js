import * as constants from '../../constants';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';

export function updateAccount(key, data){
	return (dispatch) => {
		dispatch(accountUpdate(key, data));
	}
}

export function updateFriendsLabel(array){
	return (dispatch) => {
		dispatch(func_updateFriendsLabel(array));
	}
}

//FUNCTIONS
function accountUpdate(key, data){
  console.log("Updating . . . ");
  return{
    type: constants.UPDATE_ACCOUNT,
    data,
    key
  }
}

//FUNCTIONS
function func_updateFriendsLabel(array){
  return{
    type: constants.UPDATE_FRIENDS_LABEL,
    array
  }
}