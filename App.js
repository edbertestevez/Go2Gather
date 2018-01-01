/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
//REDUX
import {Provider} from 'react-redux'
import configureStore from './app/configureStore'
//CONTAINERS
import AppWithNavigationState from './app/AppNavigator'

const store = configureStore()

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState/>
      </Provider>
    );
  }
}