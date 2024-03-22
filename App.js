import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ShopScreen from './app/Screens/AllShopsScreenComponent';
import { NavigationContainer } from '@react-navigation/native';
import TabNav from './app/Navigations/TabNav';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
 
      <SafeAreaProvider>
      <NavigationContainer>
        <TabNav/>
      </NavigationContainer>
      </SafeAreaProvider>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  
  
  },

 
});
