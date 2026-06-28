import NewUser from './app/index';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <NewUser />
    </SafeAreaProvider>
  );
}
