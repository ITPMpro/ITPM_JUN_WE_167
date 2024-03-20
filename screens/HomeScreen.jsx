import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

const images = [
  require('../assets/img1.jpg'),
  require('../assets/img2.jpg'),
  require('../assets/img3.jpg'),
  // Add more images as needed
];

export default function HomeScreen() {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item} style={styles.slideImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder='Search' />
        </View>
        <View style={styles.iconContainer}>
          <AntDesign name="meho" size={24} color="black" />
        </View>
      </View>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.8} // Adjust the width of each slide as needed
        layout={'default'}
        loop
        autoplay
        autoplayDelay={1000}
        autoplayInterval={3000}
        contentContainerStyle={styles.sliderContainer} // Use contentContainerStyle instead of containerCustomStyle
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  userInfo: {
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center align items vertically
  },
  searchContainer: {
    flex: 1, // Take remaining space in the row
    flexDirection: 'row', // Align items horizontally within the container
    alignItems: 'center', // Center align items vertically within the container
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10, // Add margin to separate search bar from icon
    height: 40, // Increase height of search input container
  },
  searchIcon: {
    marginRight: 10, // Add margin to separate icon from search input
  },
  searchInput: {
    flex: 1, // Take remaining space in the container
    fontSize: 16,
    paddingLeft: 10,
  },
  iconContainer: {
    marginLeft: 10, // Add margin to separate icon from search input
  },
  slide: {
    width: width * 0.8, // Adjust the width of each slide as needed
    height: 200, // Adjust the height of each slide as needed
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 30, // Add padding to separate slides from each other
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
