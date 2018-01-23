import * as login_options from './login/login_options';
import * as account from './user/account';
import * as location from './user/location';
import * as meetups from './meetups/meetups';
import * as userData from './userData';

export const ActionCreators = Object.assign({}, 
	login_options, 
	account,
	location,
	meetups,
	userData
);