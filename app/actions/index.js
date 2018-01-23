import * as login_options from './login/login_options';
import * as account from './user/account';
import * as location from './user/location';

export const ActionCreators = Object.assign({}, 
	login_options, 
	account,
	location
);