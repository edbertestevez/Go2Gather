//DRAWER NAVIGATOR ONLY
import React from 'react';
import { View, Text } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import DrawerContainer from './DrawerContainer';
import HomeMainScreen from './Home/HomeMainScreen';

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <Text>Swipe from left to open drawer</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const ContactScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Contact Screen</Text>
  </View>
);


const RootDrawer = DrawerNavigator({
  Meetup_Requests:{ 
    screen: HomeMainScreen,
    
  },
}, {
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
  drawerWidth: 100
}
)

export default RootDrawer;