
import {UPDATE_ALL_USERS} from '../constants'

//initial values
const initialState = {
	users_data:[]
}

export default function accountReducer(state = initialState, action){
	switch(action.type){
		case UPDATE_ALL_USERS:{
			return{
				...state,
				users_data: action.array,
			}
		}break;

		default: return state
	}
}	