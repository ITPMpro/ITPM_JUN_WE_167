import { View, Text } from 'react-native'
import React from 'react'

export default function LevelsScreenComponent() {
  return (
    
        <View style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: "#03cafc",
        }}>
            <Text style={{fontSize: 20, color: "#ffffff", fontWeight: "800"}}>Levels Screen is here!</Text>
        </View>
    );

}