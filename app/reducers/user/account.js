import {LOGIN_USER, LOGOUT_USER, UPDATE_ACCOUNT,CHECK_LOGIN,
UPDATE_FRIENDS_LABEL} from '../../constants'

//initial values
const initialState = {
	uid: '6qtCXPySzpN0LYg79kc0Ex4046m1',
	name: '',
	email: '',
	photo: "",
	longitude:  0,
	latitude: 0,
	phone: '',
	isLogged: null,
	isCheckingAccount: false,
	friendsLabel:[],

	
	// uid: 'r7j4h1KOmOXekp3ZNZ2xXfX7Qgc2',
	// name: 'Edbert Jason Estevez',
	// email: 'ejestevez26@gmail.com',
	// photo: "https://lh3.googleusercontent.com/-7JyHe5tfUL0/AAAAAAAAAAI/AAAAAAAAAAA/AFiYof2xHlhT9sULWd6vTyCo2mvjndXRlA/s96-c/photo.jpg",
	// longitude:  122.960995,
	// latitude: 10.696838,
	// phone: 'Not Available',
	// isLogged: null,
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
				photo: action.data.photo,
				email: action.data.email,
				longitude: action.data.location.longitude,
				latitude: action.data.location.latitude
			}
		}break;

		case CHECK_LOGIN:{
			return{
				...state,
				isCheckingAccount: action.condition
			}
		}break;

		case UPDATE_FRIENDS_LABEL:{
			return{
				...state,
				friendsLabel: action.array
			}
		}
		default: return state
	}
}	