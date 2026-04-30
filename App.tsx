import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/components/screens/Home';
import Counter from './src/components/screens/Counter';

import { Provider } from 'react-redux';
import { store } from './src/redux';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <Home />
        {/* <Counter /> */}
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
