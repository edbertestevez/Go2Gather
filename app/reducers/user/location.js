import {
	UPDATE_POSITION, 
	SEARCH_GOOGLE_PLACE, 
	CHANGE_MAPTYPE,
	SEARCH_GOOGLE_PLACE_MEETUP,
	TOGGLE_DIRECTION,
	CLOSE_DIRECTION
} from '../../constants'

//initial values
const initialState = {
	longitude: 0,
	latitude: 0,
	longitudeDelta:0.004,
	latitudeDelta:0.004,
	place: '',
	mapType:'standard',
	searchPlaceStatus:false,
	searchPlace:{
		longitude: 0,
		latitude: 0,
		longitudeDelta:0.004,
		latitudeDelta:0.004,
		place: '',
		address:'',
		isActive: false
	},
	locationSearchData:[],
	locationSearchDetails:[],

}

export default function accountReducer(state = initialState, action){
	switch(action.type){

		case "CLEAR_LOCATION_SEARCH_DATA":{
			return{
				...state,
				locationSearchData:[],
				locationSearchDetails:[]
			}
		}break;

		case "SET_LOCATION_SEARCH_DATA":{
			return{
				...state,
				locationSearchData:action.data,
				locationSearchDetails:{
					name: action.details.name,
					rating: action.details.rating,
					formatted_address: action.details.formatted_address,
					website: action.details.website,
					formatted_phone_number: action.details.formatted_phone_number,
					open_now:action.open_now,
					reviews: action.details.reviews,
					photos: action.details.photos,
					latitude: action.details.geometry.location.lat,
					longitude: action.details.geometry.location.lng
				}
			}
		}break;
		case UPDATE_POSITION:{
			return{
				...state,
				longitude: action.data.longitude,
				latitude: action.data.latitude,
			}
		}break;

		case SEARCH_GOOGLE_PLACE:{
			return{
				...state,
				searchPlace:{
					longitude: action.data.longitude,
					latitude: action.data.latitude,
					place: action.data.name,
					address: action.data.address,
					longitudeDelta:0.004,
					latitudeDelta:0.004,
					isActive: true
				},
				searchPlaceStatus: true,
			}
		}break;

		case CHANGE_MAPTYPE:{
			return{
				...state,
				mapType:action.data
			}
		}break;

		case TOGGLE_DIRECTION:{
			return{
				...state,
				searchPlaceStatus: action.condition,
			}
		}break;

		case CLOSE_DIRECTION:{
			return{
				...state,
				searchPlace:{
					longitude: 0,
					latitude: 0,
					longitudeDelta:0.004,
					latitudeDelta:0.004,
					place: '',
					address:'',
					isActive: false
				},
				searchPlaceStatus:false
			}
		}break;

		default: return state
	}
}	