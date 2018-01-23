import * as constants from '../constants';
import firebaseApp from '../config/firebase';
import * as firebase from 'firebase';
import {ToastAndroid} from 'react-native';

export function loadMeetupData(user_uid){
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
						var event_name = dataSnap.child("event_name").val();
						var event_location = dataSnap.child("event_location").val();
						var event_address = dataSnap.child("event_address").val();
						var event_date = dataSnap.child("event_date").val();
						var event_time = dataSnap.child("event_time").val();
						var longitude = dataSnap.child("longitude").val();
						var latitude = dataSnap.child("latitude").val();
						meetupList.push({
							key: meetup_key,
							event_name:event_name,
							event_location:event_location,
							event_address:event_address,
							event_date:event_date,
							event_time:event_time,
							longitude:longitude,	
							latitude:latitude,	

						})

						console.log("MEETUPS:",meetupList)

						dispatch(updateMeetupList(meetupList))
						//console.log("STATE",currentState);
						// that.setState({
						//   	meetups:this.meetupList,
						// 	isGettingData:false
						// })
						// console.log(that.state.meetups);

					}
				});
			}
		});

		//Remove data
		firebase.database().ref("/meetups_users/"+user_uid).on('child_removed', (snapshot) =>{
			/*console.log("REMOVED",snapshot.key);
			var indexRemove = this.state.meetups.findIndex((value)=>value.key==snapshot.key);
			console.log("Index from list", indexRemove)*/
			
			{/* CONVERT THIS TO REDUX IMPLEMENTATION}

			if(indexRemove!=-1){
				var newMeetups = that.state.meetups;
				newMeetups.splice(indexRemove,1)	
				that.setState({
					meetups:newMeetups
				})
			}

			*/}
			
		});
	}
}

//FUNCTIONS
function updateMeetupList(array){
  return{
    type: constants.UPDATE_MEETUP_LIST,
    array
  }
}