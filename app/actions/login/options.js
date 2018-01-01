import * as constants from '../../constants';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import firebaseApp from '../../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';

export function func_googleSignin(){
  return (dispatch) => {
  GoogleSignin.configure({
      //iosClientId: "<FROM DEVELOPER CONSOLE>", // only for iOS
      webClientId: "206519716919-v93fl7b6pupffparflkjqpl7f77hpr4h.apps.googleusercontent.com",
    })
    .then(() => {
    GoogleSignin.signIn()
          .then((user) => {
            console.log(user);
            const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken, user.accessToken);
            console.log(credential)
            return firebase.auth().signInWithCredential(credential);

          })
          .then((currentUser)=>{
            alert("Hello");
            console.log(currentUser.uid);
          })
          //.then(dispatch(loginUser()))
          .catch((err) => {
            console.log('WRONG SIGNIN', err);
          })
          .done();
    });
    }

}


export function func_googleSignout(){
  return (dispatch) => {
   GoogleSignin.signOut()
    .then(() => {
      //this.setState({user: ''});
      firebase.auth().signOut().then(function() {
      console.log("Logged out successfully");
      dispatch(logoutUser()); //FUNCTION to reducer
      // Sign-out successful.
      console.log("OUT");
    }, function(error) {
      // An error happened.
    });
      console.log("Logged out successfully");
    })
    .catch((err) => {
      console.log(err);
    });

    }
}





//FUNCTIONS
function loginUser(){
  console.log("MA LOGIN KA TO");
  return{
    type: constants.LOGIN_USER
  }
}

function logoutUser(){
  return{
    type: constants.LOGOUT_USER
  }
}