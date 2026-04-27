import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from './src/components/screens/Home';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './src/store';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Home />
      </SafeAreaProvider>
    </ReduxProvider>
  );
}

export default App;
