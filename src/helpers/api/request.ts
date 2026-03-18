import axios from 'axios';
import axiosRetry from 'axios-retry';
import NetInfo from '@react-native-community/netinfo';


export const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});


client.interceptors.request.use(async config => {

  const internetConnection = await NetInfo.fetch();
  const isConnected = internetConnection.isConnected;
  const isOnline = typeof isConnected === 'boolean' ? isConnected : true;
 

  if (!isOnline) {
    return Promise.reject(new Error('No internet connection. Please check your network settings.'));
  }
  return config;
})


// Configure automatic retries
axiosRetry(client, {
  retries: 3,
  retryDelay: retryCount => {
    // Exponential backoff: 1s, 2s, 4s...
    return Math.pow(2, retryCount) * 1000;
  },
  retryCondition: error => {
    // Retry on network errors or 5xx responses
    // Don't retry on 4xx client errors
    return (
      axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error)
    );
  },
  onRetry: (count, error) => {
    console.log(`Retry ${count}: ${error.message}`);
  },
});
