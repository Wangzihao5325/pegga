/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store/index';
import Router from './router';

import NavigationService from './router/NavigationService';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router
          ref={(navigatorRef) => { NavigationService.setTopLevelNavigator(navigatorRef); }}
        />
      </Provider>
    )
  }
}
