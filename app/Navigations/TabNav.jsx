import { View, Text } from 'react-native'
import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CategoryScreenComponent from '../Screens/CategoryScreenComponent';
import LevelsScreenComponent from '../Screens/LevelsScreenComponent';
import AllShopsScreenComponent from '../Screens/AllShopsScreenComponent';


const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
    const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator 
        initialRouteName="Category"
        screenOptions={{
            tabBarActiveTintColor: "white", 
            tabBarlabelStyle: {fontSize:12},
        
            tabBarStyle:{ backgroundColor: 'black',marginTop:insets.top, elevation: 10,shadowOpacity: 10}
        }}
    >
        <Tab.Screen name='Category' component={CategoryScreenComponent} options={{ tabBarLabel: 'Category'}}/>
        <Tab.Screen name='Levels' component={LevelsScreenComponent} options={{ tabBarLabel: 'Levels'}}/>
        <Tab.Screen name='AllShops' component={AllShopsScreenComponent} options={{ tabBarLabel: 'All Shops'}}/>
    </Tab.Navigator>
  )
}

export function TabNav(){
    return (
        <NavigationContainer>
        <MyTabs/>
        </NavigationContainer>
    )
}