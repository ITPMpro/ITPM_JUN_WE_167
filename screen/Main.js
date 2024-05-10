import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-snap-carousel';
import Home from './Home'; // Import the Home component

const { width, height } = Dimensions.get('window');

const images = [
  require('../assets/img1.jpg'),
  require('../assets/img2.jpg'),
  require('../assets/img3.jpg'),
];

const brands = [
  require('../assets/pizzahut.jpg'),
  require('../assets/pizzahut.jpg'),
  require('../assets/pizzahut.jpg'),
  require('../assets/pizzahut.jpg'),
  require('../assets/pizzahut.jpg'),
  require('../assets/pizzahut.jpg'),
  require('../assets/pizzahut.jpg'),
  require('../assets/pizzahut.jpg'),
];

export default function HomeScreen({ navigation }) {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image source={item} style={styles.slideImage} />
      </View>
    );
  };

  const categories = [
    { name: 'Cinema', icon: require('../assets/cinema.png') },
    { name: 'Shopping', icon: require('../assets/shopping.png') },
    { name: 'Map', icon: require('../assets/map.png') },
    // Add more categories as needed
  ];

  const handleViewProfile = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={24} color="black" style={styles.searchIcon} />
            <TextInput style={styles.searchInput} placeholder='Search' />
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={handleViewProfile}>
              <Image source={require('../assets/user.png')} style={styles.userIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <Carousel
          data={images}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width}
          layout={'default'}
          loop
          autoplay
          autoplayDelay={1000}
          autoplayInterval={3000}
          contentContainerStyle={styles.sliderContainer}
        />

        <Text style={styles.sectionTitle2}>Categories</Text>
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => handleCategoryPress(category)}>
              <Image source={category.icon} style={styles.categoryIcon} />
              <Text>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.brandsContainer}>
          <Text style={styles.sectionTitle}>Our Brands</Text>
          <View style={styles.brandsRow}>
            {brands.slice(0, 4).map((brand, index) => (
              <Image key={index} source={brand} style={styles.brandImage} />
            ))}
          </View>
          <View style={styles.brandsRow}>
            {brands.slice(4, 8).map((brand, index) => (
              <Image key={index} source={brand} style={styles.brandImage} />
            ))}
          </View>
        </View>

        <View style={styles.brandsContainer2}>
          <Text style={styles.sectionTitle3}>Trending Products</Text>
          <View style={styles.brandsRow}>
            {brands.slice(0, 4).map((brand, index) => (
              <Image key={index} source={brand} style={styles.brandImage} />
            ))}
          </View>
          <View style={styles.brandsRow}>
            {brands.slice(4, 4).map((brand, index) => (
              <Image key={index} source={brand} style={styles.brandImage} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  userInfo: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20,
  },
  searchContainer: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10, 
    height: 40,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10, 
  },
  searchInput: {
    flex: 1, 
    fontSize: 16,
    paddingLeft: 10,
  },
  iconContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: -10, 
  },
  userIcon: {
    width: 40, 
    height: 40, 
    padding: 5, 
  },
  slide: {
    width: width,
    height: 200, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 40, 
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  sliderContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'lightblue', // Background color for the icon container
    marginBottom: 10,
  },
  brandsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#2A3F84',
    borderRadius: 15,
  },

  brandsContainer2: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#8B0000',
    borderRadius: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -25,
    marginBottom: 10,
    marginLeft: 100,
    marginRight:100, // Adjust as needed
    backgroundColor: 'white', // Add white background
    padding: 10, // Add padding to create space around the section title
    borderRadius: 10, // Add border radius for rounded corners
    fontFamily: 'sans-serif',
  },

  sectionTitle3: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 0,
    marginRight:142, // Adjust as needed
    backgroundColor: 'white', // Add white background
    padding: 10, // Add padding to create space around the section title
    borderRadius: 10, // Add border radius for rounded corners
    fontFamily: 'sans-serif',
  },
   
  sectionTitle2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    marginBottom: 1,
    marginLeft: 10,
    marginRight:10, // Adjust as needed
    fontFamily: 'sans-serif',
    
  },


  brandsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  brandImage: {
    marginTop: 15,
    width: 80, // Adjust as needed
    height: 80, // Adjust as needed
    borderRadius: 10,
    marginBottom: -20,
  
  },
});
