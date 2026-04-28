/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { Counter } from './src/Counter';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import HomeScreen from './src/screens/HomeScreen'

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        {/* <HomeScreen/> */}
        <Counter />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
