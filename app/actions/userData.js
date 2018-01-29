import * as constants from '../constants';
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';


export function loadAllUsers(){
	const allUsersList = [];
	return (dispatch, getState) => {
		firebase.database().ref("/users/").on("child_added", (snapshot)=>{
			var key = snapshot.key;
			var name = snapshot.child("name").val();
			var photo = snapshot.child("photo").val();
			var phone = snapshot.child("phone").val();
			var email = snapshot.child("email").val();
			var longitude = snapshot.child("location").child("longitude").val();
			var latitude = snapshot.child("location").child("latitude").val();
			var location = {latitude:latitude,longitude:longitude}
			allUsersList.push({
				key:key,
				name:name,
				email:email,
				phone:phone,
				photo:photo,
				location:location
			})

			dispatch(updateAllUsers(allUsersList))
		});
	}
}

export function loadMeetupData(user_uid){
	//return(dispatch, state, middleWare)
	return (dispatch, getState) => {
		const currentState = getState();
		const meetupList = [];

	{/*CONTINUE WORKING HERE. FINISH EVERYTHING SA FIREBASE RELATED*/}
		console.log(currentState)
		//GET IDS OF MEETUPS OF USER
		firebase.database().ref("/meetups_users/"+user_uid).on('child_added', (snapshot) =>{
			if(snapshot.exists()){
				var meetup_key = snapshot.key;
				//GET MEETUP DATA
				firebase.database().ref("/meetups/"+meetup_key).on('child_added', (dataSnap) =>{
					if(dataSnap.key=="data"){
						var creator = dataSnap.child("creator").val()
						var event_name = dataSnap.child("event_name").val();
						var event_location = dataSnap.child("event_location").val();
						var event_address = dataSnap.child("event_address").val();
						var event_date = dataSnap.child("event_date").val();
						var event_time = dataSnap.child("event_time").val();
						var longitude = dataSnap.child("longitude").val();
						var latitude = dataSnap.child("latitude").val();
						meetupList.push({
							key: meetup_key,
							creator: creator,
							event_name:event_name,
							event_location:event_location,
							event_address:event_address,
							event_date:event_date,
							event_time:event_time,
							longitude:longitude,	
							latitude:latitude,	
						})
						dispatch(updateMeetupList(meetupList));
					}
				});

				firebase.database().ref("/meetups/"+meetup_key).on('child_changed', (dataSnap) =>{
					console.log("UPDATED",meetup_key)
					if(dataSnap.key=="data"){
						var creator = dataSnap.child("creator").val()
						var event_name = dataSnap.child("event_name").val();
						var event_location = dataSnap.child("event_location").val();
						var event_address = dataSnap.child("event_address").val();
						var event_date = dataSnap.child("event_date").val();
						var event_time = dataSnap.child("event_time").val();
						var longitude = dataSnap.child("longitude").val();
						var latitude = dataSnap.child("latitude").val();
						
						let meetups = meetupList;
						//search for record index
						var indexUpdate = meetupList.findIndex((value)=>value.key==meetup_key);
						console.log(indexUpdate);
						//updatedValue
						meetups[indexUpdate].creator = creator;
						meetups[indexUpdate].event_name = event_name;
						meetups[indexUpdate].event_location = event_location;
						meetups[indexUpdate].event_address = event_address;
						meetups[indexUpdate].event_date = event_date;
						meetups[indexUpdate].event_time = event_time;
						meetups[indexUpdate].longitude = longitude;
						meetups[indexUpdate].latitude = latitude;
						dispatch(updateMeetupList(meetups));
					}
				});

				
				firebase.database().ref("/meetups/"+meetup_key+"/users").on('child_removed', (dataSnap) =>{
					console.log("REMOVED USER", dataSnap.key)
					if(user_uid==dataSnap.key){
						var indexRemove = meetupList.findIndex((value)=>value.key==meetup_key);
						console.log("Index removed from list", indexRemove)
				
						if(indexRemove!=-1){
							var newMeetupList = meetupList;
							newMeetupList.splice(indexRemove,1)	
							dispatch(updateMeetupList(newMeetupList));
						}
					}
				})

				firebase.database().ref("/meetups/"+meetup_key).on('child_removed', (dataSnap) =>{
					console.log("REMOVED",meetup_key);
					var indexRemove = meetupList.findIndex((value)=>value.key==meetup_key);
					console.log("Index removed from list", indexRemove)
				
					if(indexRemove!=-1){
						var newMeetupList = meetupList;
						newMeetupList.splice(indexRemove,1)	
						dispatch(updateMeetupList(newMeetupList));
					}
				});
			}
		});

		//Remove data
		firebase.database().ref("/meetups_users/"+user_uid).on('child_removed', (snapshot) =>{
			console.log("REMOVED",snapshot.key);
			// console.log(currentState.meetups)
			var indexRemove = meetupList.findIndex((value)=>value.key==snapshot.key);
			console.log("Index from list", indexRemove)
			
			if(indexRemove!=-1){
				//New List of STATE
				var newMeetupList = meetupList;
				newMeetupList.splice(indexRemove,1)
				dispatch(updateMeetupList(newMeetupList))
			}
		});
	}
}


export function loadFriendsData(user_uid){
	const friendsLabel = [];
	return(dispatch) =>{
		firebase.database().ref("/users_friends/"+user_uid).on("child_added",(snapshot)=>{
			firebase.database().ref("/users/"+snapshot.key).on("value",(dataSnap)=>{
				//console.log(dataSnap.child("name").val());
				friendsLabel.push({
					value: snapshot.key,
					label: dataSnap.child("name").val()
				})
				
				dispatch(updateFriendsLabel(friendsLabel))
			});
			
		});
		firebase.database().ref("/users_friends/"+user_uid).on("child_removed",(snapshot)=>{
			var indexRemove = friendsLabel.findIndex((value)=>value.value==snapshot.key);
			console.log("Index from list", indexRemove)
			
			if(indexRemove!=-1){
				//New List of STATE
				var newList = friendsLabel;
				newList.splice(indexRemove,1)
				dispatch(updateFriendsLabel(newList))
			}
		});
	}
}

//UPDATE THIS ONE
export function loadFriendRequests(user_uid){
	const friendRequestList = [];
	return(dispatch) =>{
		firebase.database().ref("/friend_requests/"+user_uid).on("child_added",(snapshot)=>{
			console.log("FRIEND REQUEST: "+snapshot.key)
			if(snapshot.val()==true){
				firebase.database().ref("/users/"+snapshot.key).once("value",(userSnap)=>{
					requestor_key = snapshot.key;
					requestor_email = userSnap.child("email").val();
					requestor_name = userSnap.child("name").val();
					requestor_photo = userSnap.child("photo").val();

					friendRequestList.push({
						requestor_key:requestor_key,
						requestor_email:requestor_email,
						requestor_name:requestor_name,
						requestor_photo:requestor_photo
					})

					dispatch(updateFriendRequestList(friendRequestList))
				});
			}
		});

		firebase.database().ref("/friend_requests/"+user_uid).on("child_removed",(snapshot)=>{
			var indexRemove = friendRequestList.findIndex((value)=>value.requestor_key==snapshot.key);
			console.log("Index from list", indexRemove)
			
			if(indexRemove!=-1){
				//New List of STATE
				var newReqList = friendRequestList;
				newReqList.splice(indexRemove,1)
				dispatch(updateFriendRequestList(newReqList))
			}
		});
	}
}

export function loadMeetupRequestData(user_uid){
	const requestList = [];
	return(dispatch) =>{
		firebase.database().ref("/requests/"+user_uid).on("child_added",(snapshot)=>{
			//get meetup data
			var meetup_key = snapshot.child("meetup_id").val();
			var requestor_id = snapshot.child("requestor").val();
			var requestor_name = '';
			var requestor_photo = '';
			var request_key = snapshot.key;
			console.log(meetup_key);
			firebase.database().ref("/users/"+requestor_id).once("value",(userSnap)=>{
				requestor_name = userSnap.child("name").val();
				requestor_photo = userSnap.child("photo").val();

				firebase.database().ref("/meetups/"+meetup_key).on("child_added",(dataSnap)=>{
				if(dataSnap.key=="data"){
					var event_name = dataSnap.child("event_name").val();
					var event_location = dataSnap.child("event_location").val();
					var event_address = dataSnap.child("event_address").val();
					var event_date = dataSnap.child("event_date").val();
					var event_time = dataSnap.child("event_time").val();
					var longitude = dataSnap.child("longitude").val();
					var latitude = dataSnap.child("latitude").val();
					requestList.push({
						request_key: request_key,
						meetup_key: meetup_key,
						event_name:event_name,
						event_location:event_location,
						event_address:event_address,
						event_date:event_date,
						event_time:event_time,
						longitude:longitude,	
						latitude:latitude,	
						requestor_name:requestor_name,
						requestor_photo:requestor_photo,
						requestor_id:requestor_id
					})
					dispatch(updateMeetupRequest(requestList))
					
				}
			});
			})
			
		});

		firebase.database().ref("/requests/"+user_uid).on("child_removed",(snapshot)=>{
			var indexRemove = requestList.findIndex((value)=>value.request_key==snapshot.key);
			
			if(indexRemove!=-1){
				var newRequests = requestList;
				newRequests.splice(indexRemove,1)	
				dispatch(updateMeetupRequest(newRequests))
			}
		});
	}
}


//FUNCTIONS
function updateAllUsers(array){
  return{
    type: constants.UPDATE_ALL_USERS,
    array
  }
}

function updateMeetupList(array){
  return{
    type: constants.UPDATE_MEETUP_LIST,
    array
  }
}

function updateFriendsLabel(array){
	return{
		type: constants.UPDATE_FRIENDS_LABEL,
		array
	}
}

function updateMeetupRequest(array){
	return {
		type: constants.UPDATE_MEETUP_REQUEST,
		array
	}
}

function updateFriendRequestList(array){
	return {
		type: constants.UPDATE_FRIEND_REQUEST,
		array
	}
}