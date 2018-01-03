import React from 'react';
import PropTypes from 'prop-types';

import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';

import LoginScreen from './containers/LoginScreen';
import SampleScreen from './containers/SampleScreen';
import SplashScreen from './containers/SplashScreen';
import HomeMainScreen from './containers/Home/HomeMainScreen';
import DrawerContainer from './containers/DrawerContainer';
import ProfileScreen from './containers/Profile/ProfileScreen';
import {Icon} from 'native-base';

//EDIT HERE 
//Navigation ka pages
// drawer stack
const mainDrawer = DrawerNavigator({
  
  Home: { 
    screen: HomeMainScreen,
  },
  Profile:{
    screen: ProfileScreen,
  }

},{
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  contentComponent: props => <DrawerContainer {...props} />
});

export const AppNavigator = StackNavigator({
  Splash: { 
    screen: SplashScreen,
    navigationOptions:{
      header: null
    }
  },
  Login: { 
  	screen: LoginScreen, 
  	headerMode: 'screen',
  	navigationOptions:{
  		header: null
  	}
  },
  HomeMain: { 
    screen: HomeMainScreen,
    headerMode: 'screen',
    navigationOptions:{
      header: null,
    } 
  },
  Profile:{
    screen: ProfileScreen,
    navigationOptions:{
      header: null
    }
  },
  Drawer: { 
    screen: mainDrawer, 
    headerMode: 'float',
    navigationOptions:{
      header: null
    }
  }
},{
  initialRouteName: 'Drawer',
  //DRAWER Kung home, SPLASH kng loading
});	

//Gin saylo na sa App.js
/*
const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: this.props.dispatch,
  nav: this.props.nav,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);*/