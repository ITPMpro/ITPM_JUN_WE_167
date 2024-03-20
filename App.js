import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TabNavigation from './navigations/TabNavigation';


export default function App() {
  return (
   
    
      <View style={styles.container}> 
        <StatusBar style="auto" />
        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
