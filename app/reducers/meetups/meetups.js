import {UPDATE_MEETUP_FRIENDS, SEARCH_GOOGLE_PLACE_MEETUP, MEETUP_NAME,MEETUP_TIME,MEETUP_DATE,MEETUP_CLEAR_FORM,
UPDATE_MEETUP_LIST} from '../../constants'

//initial values
const initialState = {
	selectedMeetupFriends:[
		// {label:"Edbert Jason Estevez", value:"user1"}, 
		// {label:"Gayle Duron", value:"user2"},
		// {label:"Sample Name of Friend", value:"user3"}
	],

	event_name: '',
	event_date: '',
	event_time: '',
	newMeetupLocation:{
		longitude: 0,
		latitude: 0,
		longitudeDelta:0.004,
		latitudeDelta:0.004,
		place: '',
		address:'',
		isActive: false
	},
	meetupList:[]
}

export default function accountReducer(state = initialState, action){
	switch(action.type){

		case UPDATE_MEETUP_LIST:{
			return{
				...state,
				meetupList:action.array
			}
		}break;

		case UPDATE_MEETUP_FRIENDS:{
			return{
				...state,
				selectedMeetupFriends:action.data
			}
		}break;

		case SEARCH_GOOGLE_PLACE_MEETUP:{
			return{
				...state,
				newMeetupLocation:{
					longitude: action.data.longitude,
					latitude: action.data.latitude,
					place: action.data.name,
					address: action.data.address,
					longitudeDelta:0.004,
					latitudeDelta:0.004,
					isActive: true
				}
			}
		}break;

		case MEETUP_NAME:{
			return{
				...state,
				event_name:action.input
			}
		}break;

		case MEETUP_DATE:{
			return{
				...state,
				event_date:action.input
			}
		}break;

		case MEETUP_TIME:{
			return{
				...state,
				event_time:action.input
			}
		}break;

		case MEETUP_CLEAR_FORM:{
			return{
				...state,
				event_name: '',
				event_date: '',
				event_time: '',
				newMeetupLocation:{
					longitude: 0,
					latitude: 0,
					longitudeDelta:0.004,
					latitudeDelta:0.004,
					place: '',
					address:'',
					isActive: false
				}
			}
		}break;

		default: return state
	}
}	