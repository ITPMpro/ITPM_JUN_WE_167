import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TabNavigation from './navigations/TabNavigation';


export default function App() {
  return (
<<<<<<< HEAD
   
    
      <View style={styles.container}> 
        <StatusBar style="auto" />
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </View>
   
=======
    <View style={styles.container}>
      <Text>Hello kavindu</Text>
      <StatusBar style="auto" />
    </View>
>>>>>>> 69d4cb3cea3adb551f4bd6dade74d58f6a616867
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
