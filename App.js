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
  View
} from 'react-native';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';

import {Root} from 'native-base';
//REDUX
import {Provider} from 'react-redux'
import configureStore from './app/configureStore'
//CONTAINERS
//import {AppWithNavigationState,appReducer} from './app/AppNavigator'

//REDUCERS
//USERS
import account from './app/reducers/user/account';
import location from './app/reducers/user/location';

import { addNavigationHelpers } from 'react-navigation';

import {AppNavigator} from './app/AppNavigator';

//STORE
import{ createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init());

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const appReducer = combineReducers({
  account,
  nav: navReducer,
  location
});

class App extends React.Component {
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