import NewUser from './app/index';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NewUser></NewUser>
    </SafeAreaProvider>
  );
}
