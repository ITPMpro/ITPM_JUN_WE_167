import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Social from '../screens/Social';
import GiftSpinner from '../screens/GiftSpinner';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Ionicons } from '@expo/vector-icons';



const Tab=createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false
    
    }}>
      <Tab.Screen name="LK Mall" component={HomeScreen}
       options={{
        tabBarLabel: ({color}) => (
          <Text style={{color: color, fontSize:12, marginBottom:3}}>Home</Text>
        ),
        tabBarIcon: ({color,size}) => (
          <Ionicons name="home" size={size} color={color} />
        ),
        headerShown:true,
        headerTitleAlign:'center',
        headerTintColor:'white',
        headerStyle:{
          backgroundColor:'#5B71BA',
          
          
        },
      }} />

      <Tab.Screen name="Social" component={Social}
       options={{
        tabBarLabel: ({color}) => (
          <Text style={{color: color, fontSize:12, marginBottom:3}}>Social</Text>
        ),
        tabBarIcon: ({color,size}) => (
          <Ionicons name="people" size={size} color={color} />
        )
      }} />

      <Tab.Screen name="GiftSpinner" component={GiftSpinner} 
        options={{
        tabBarLabel: ({color}) => (
          <Text style={{color: color, fontSize:12, marginBottom:3}}>Gift</Text>
        ),
        tabBarIcon: ({color,size}) => (
          <Ionicons name="gift" size={size} color={color} />
        )
      }} />
    </Tab.Navigator>
  )
}


<Ionicons name="gift" size={24} color="black" />