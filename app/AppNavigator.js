import React from 'react';
import PropTypes from 'prop-types';

import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';

import LoginScreen from './containers/LoginScreen';
import SampleScreen from './containers/SampleScreen';
import SplashScreen from './containers/SplashScreen';
import HomeMainScreen from './containers/Home/HomeMainScreen';
import SearchUserScreen from './containers/Home/SearchUserScreen';
import DrawerContainer from './containers/DrawerContainer';
import ProfileScreen from './containers/Profile/ProfileScreen';
import OtherProfileScreen from './containers/Profile/OtherProfileScreen';
import MeetupScreen from './containers/Meetup/MeetupScreen';
import AddMeetupScreen from './containers/Meetup/AddMeetupScreen';
import MeetupMapScreen from './containers/Meetup/MeetupMapScreen';
import AddMeetupFriendScreen from './containers/Meetup/AddMeetupFriendScreen';

import ViewMeetupScreen from './containers/Meetup/ViewMeetupScreen';
import EditMeetupScreen from './containers/Meetup/EditMeetupScreen';
import RequestScreen from './containers/Requests/RequestScreen';
import FriendRequestScreen from './containers/Requests/FriendRequestScreen';
import SendMeetupInviteScreen from './containers/Requests/SendMeetupInviteScreen';
import SearchMeetupScreen from './containers/Search/SearchMeetupScreen';

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
  },
  Meetup:{
    screen:MeetupScreen,
  },
  Requests:{
    screen:RequestScreen,
  },
  FriendRequests:{
    screen:FriendRequestScreen,
  },

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
  Drawer: { 
    screen: mainDrawer, 
    headerMode: 'float',
    navigationOptions:{
      header: null
    }
  },
  //SAMPLE SCREENS FOR TESTING
  HomeMain: { 
    screen: HomeMainScreen,
    headerMode: 'screen',
    navigationOptions:{
      header: null,
    } 
  },
  SearchUser: { 
    screen: SearchUserScreen,
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
  Meetup:{
    screen:MeetupScreen,
    navigationOptions:{
      header:null
    }
  },
  ViewMeetup:{
    screen:ViewMeetupScreen,
    navigationOptions:{
      header:null
    }
  },
  AddMeetup:{
    screen: AddMeetupScreen,
    navigationOptions:{
      title: "New Meetup",
      headerStyle:{
        backgroundColor:"#1b5454",
      },
      headerTitleStyle:{
        color: '#fff'
      },
      headerTintColor:"#fff"
    }
  },
  EditMeetup:{
    screen: EditMeetupScreen,
    navigationOptions:{
      title: "Edit Meetup Mode",
      headerStyle:{
        backgroundColor:"#1b5454",
      },
      headerTitleStyle:{
        color: '#fff'
      },
      headerTintColor:"#fff"
    }
  },
  MeetupMap:{
    screen:MeetupMapScreen,
    navigationOptions:{
      header:null
    }
  },
  Requests:{
    screen:RequestScreen,
    navigationOptions:{
      header:null
    }
  },
  FriendRequests:{
    screen:FriendRequestScreen,
    navigationOptions:{
      header:null
    }
  },
  SendMeetupInvite:{
    screen:SendMeetupInviteScreen,
    navigationOptions:{
      header:null
    }
  },
  Sample:{
    screen:SampleScreen,
     navigationOptions:{
      title: "Sample Multi Select Users",
    }
  },
  MeetupAddFriend:{
    screen:AddMeetupFriendScreen,
    navigationOptions:{
      header:null
    }
  },
  OtherProfile:{
    screen:OtherProfileScreen,
    navigationOptions:{
      header:null
    }
  },
  SearchMeetup:{
    screen:SearchMeetupScreen,
    navigationOptions:{
      header:null
    }
  }
  
},{
  //initialRouteName: 'Splash',
  //DRAWER Kung home, SPLASH kng loading
});	
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