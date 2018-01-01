import {LOGIN_USER, LOGOUT_USER} from '../../constants'

//initial values
const initialState = {
	uid: '',
	name: '',
	longitude: '',
	latitude: '',
	phone: '',
	isLogged: null,
}

export default function accountReducer(state = initialState, action){
	switch(action.type){
		case LOGIN_USER:{
			return{
				...state,
				isLogged: true,
			}
		}break;
		case LOGOUT_USER:{
			return{
				...state,
				isLogged: false,
			}
		}break;
		default: return state
	}
}	