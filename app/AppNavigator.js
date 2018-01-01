import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from './containers/LoginScreen';
import SampleScreen from './containers/SampleScreen';
import SplashScreen from './containers/SplashScreen';

//EDIT HERE 
//Navigation ka pages
export const AppNavigator = StackNavigator({
  Splash: { screen: SplashScreen },
  Login: { 
  	screen: LoginScreen, 
  	headerMode: 'screen',
  	navigationOptions:{
  		header: null
  	}
  },
  Sample: { screen: SampleScreen },
},{
  initialRouteName: 'Login',
}
);	
	
const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);