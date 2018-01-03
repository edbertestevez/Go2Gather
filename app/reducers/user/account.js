import {LOGIN_USER, LOGOUT_USER, UPDATE_ACCOUNT} from '../../constants'

//initial values
const initialState = {
	uid: '',
	name: 'Edbert Jason Estevez',
	email: 'ejestevez@gmail.com',
	photo: 'http://www.math.uni-frankfurt.de/~person/_4170854.jpg',
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

		case UPDATE_ACCOUNT:{
			return{
				...state,
				uid: action.key,
				name: action.data.name,
				phone: action.data.phone,
				email: action.data.email,
				longitude: action.data.longitude,
				latitude: action.data.latitude
			}
		}break;
		default: return state
	}
}	