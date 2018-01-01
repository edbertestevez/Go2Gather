import { combineReducers } from 'redux';
import account from './user/account';
import nav from './nav';

const rootReducer = combineReducers({
	account,
	nav
})

export default rootReducer