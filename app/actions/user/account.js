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

//FUNCTIONS
function accountUpdate(key, data){
  console.log("Updating . . . ");
  return{
    type: constants.UPDATE_ACCOUNT,
    data,
    key
  }
}