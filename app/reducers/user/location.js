import {UPDATE_POSITION, SEARCH_GOOGLE_PLACE, CHANGE_MAPTYPE} from '../../constants'

//initial values
const initialState = {
	longitude: 0,
	latitude: 0,
	longitudeDelta:0.004,
	latitudeDelta:0.004,
	place: '',
	mapType:'standard',
	searchPlace:{
		longitude: 0,
		latitude: 0,
		longitudeDelta:0.004,
		latitudeDelta:0.004,
		place: '',
		address:'',
		isActive: false
	}

	/*
	maptypes: standard, satellite, hybrid, terrain
	*/
}

export default function accountReducer(state = initialState, action){
	switch(action.type){
		case UPDATE_POSITION:{
			return{
				...state,
				longitude: action.data.longitude,
				latitude: action.data.latitude,
				place: action.data.place
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
				}
			}
		}break;

		case CHANGE_MAPTYPE:{
			return{
				...state,
				mapType:action.data
			}
		}break;

		default: return state
	}
}	