/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { combineReducers } from 'redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import {Root} from 'native-base';
//REDUX
import {Provider} from 'react-redux'
import configureStore from './app/configureStore'
import { addNavigationHelpers } from 'react-navigation';
import {AppNavigator} from './app/AppNavigator';
import{ createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


//REDUCERS
import account from './app/reducers/user/account';
import location from './app/reducers/user/location';
import meetups from './app/reducers/meetups/meetups';


const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Splash'));

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};


//REDUCER INDEX
const appReducer = combineReducers({
  account,
  meetups,
  nav: navReducer,
  location
});



class App extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(appReducer, applyMiddleware(thunk));


export default class Main extends Component<{}> {

  render() {
    return (
        <Root>
          <Provider store={store}>
            <AppWithNavigationState/>
          </Provider>
      </Root>
    );
  }
}