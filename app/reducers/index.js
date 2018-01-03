import { combineReducers } from 'redux';
import nav from './nav';
//USERS
import account from './user/account';
import location from './user/location';


const rootReducer = combineReducers({
	account,
	nav,
	location
})

export default rootReducer