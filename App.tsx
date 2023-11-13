/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Navigator from './src/navigator/navigator';
import { Provider } from 'react-redux';
import { store } from './src/store/configure-store';

import('./src/services/reactotron/reactotron-config')

function App(): JSX.Element {

  return (
    <Provider store={store}>
    <View style={styles.mainContainer}>
     <Navigator/>
    </View>
    </Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  mainContainer: { flex: 1}
})
