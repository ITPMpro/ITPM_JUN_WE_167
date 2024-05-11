import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function LevelsScreenComponent() {
  
  // Array of category objects with images
  const category = [
    { id: 1, name:'Level 1', image: require('./right-arrow.png') },
    { id: 2, name:'Level 1', image: require('./right-arrow.png') },
    { id: 3, name:'Level 1', image: require('./right-arrow.png') },
    { id: 4, name:'Level 1', image: require('./right-arrow.png') },
    { id: 5, name:'Level 1', image: require('./right-arrow.png') },
    { id: 6, name:'Level 1', image: require('./right-arrow.png') },
    { id: 7, name:'Lower Ground', image: require('./right-arrow.png') },
   
    // Add more categories with images as needed
  ];
    // Function to handle item click
    const handleItemClick = (item) => {
      // Handle item click here, you can navigate to another screen, show details, etc.
      console.log("Clicked on item:", item);
    };
  // Render function for individual category items
  const oneCategory = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
    <View style={styles.categoryItem}>
      
      <Text style={{fontSize: 30, color: "#000", fontWeight: "800",marginTop:2, marginLeft:10}}>{item.name}</Text>
      <Image source={item.image} style={styles.categoryImage} />
    </View>
    </TouchableOpacity>
  );

  // Header component for the FlatList
  const headerComponent = () => (
    <Text style={styles.header}>LEVELS</Text>
  );

  return (
    <View style={{flex:1,backgroundColor: "#03cafc", padding:4,}}>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={category}
        renderItem={oneCategory}
        keyExtractor={(item) => item.id.toString()} // Provide a unique key extractor
      />
    </View>
  );
}

const styles = StyleSheet.create({
  
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  // categoryItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   padding: 10,
  //   borderColor:'black',
  //   backgroundColor: 'white', // Set background color of each category item
  // },
  categoryImage: {
    width: 20,
    height: 20,
    marginTop: 9,
    marginRight: 10,
    
    // backgroundColor:'#2A3F84',
    borderRadius:5
  },
  categoryItem: {
    flexDirection: 'row',
    backgroundColor: '#ADD8E6',
    justifyContent: 'space-between', 
    paddingTop: 15,
    paddingBottom:15,
    marginVertical: 5,
  
    width: '100%',
    height:'500',
    borderRadius: 10,
    shadowColor: '#5B71BA',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
});