import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { Counter } from './src/Counter';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
// import HomeScreen from './src/screens/HomeScreen'

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        {/* <HomeScreen/> */}
        <Counter/>
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
