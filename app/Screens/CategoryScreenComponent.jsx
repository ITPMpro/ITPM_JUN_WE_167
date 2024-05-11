import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function CategoryScreenComponent() {
  const [storeData, setStoreData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categorys = [
    { id: 1, name:'Beauty and Wellness', image: require('./relaxation.png') , back: require('./right-arrow.png')},
    { id: 2, name:'Department Store / Supermarket', image: require('./store.png'), back: require('./right-arrow.png') },
    { id: 3, name:'Entertainment', image: require('./video.png') , back: require('./right-arrow.png')},
    { id: 4, name:'Fashion and Accessories', image: require('./sunglasses.png') , back: require('./right-arrow.png')},
    { id: 5, name:'Food and Beverages', image: require('./cutlery.png') , back: require('./right-arrow.png')},
    { id: 6, name:'Jewellery and Watches', image: require('./diamond.png') , back: require('./right-arrow.png')},
    { id: 7, name:'Kids and Maternity', image: require('./family.png') , back: require('./right-arrow.png')},
    { id: 8, name:'Lifetyle and Sports', image: require('./transport.png') , back: require('./right-arrow.png')},
    { id: 9, name:'Services and Others', image: require('./information.png') , back: require('./right-arrow.png')},
    // Add more categories with images as needed
  ];

  const fetchStoredData = async (categoryName) => {
  try {
    const q = query(collection(db, "store"), where("Category", "==", categoryName));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setStoreData(data);
  } catch (error) {
    console.error("Error fetching store data:", error);
  }
};


  const handleItemClick = (category) => {
    setSelectedCategory(category.name);
    fetchStoredData(category.name);
  };

  const handleBackNavigation = () => {
    setSelectedCategory(null);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item)}>
      <View style={styles.categoryItem}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <Image source={item.image} style={styles.categoryImage} />
          <Text style={{ fontSize: 17, color: "#000", fontWeight: "800", marginTop: 14 }}>{item.name}</Text>
        </View>
        <Image source={item.back} style={{ width: 20, height: 20, marginTop: 19, marginRight: 0 }} />
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <Text style={styles.header}>Categories</Text>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#03cafc", padding: 4 }}>
      {selectedCategory === null ? (
        <FlatList
          ListHeaderComponent={renderHeader}
          data={categorys}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.name.toString()}
        />
      ) : (
        <>
          <TouchableOpacity onPress={handleBackNavigation}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
          <FlatList
            data={storeData}
            renderItem={({ item }) => (
              <View key={item.StoreName} style={styles.itemContainer}>
                <Text style={styles.itemText}>Store Name: {item.StoreName}</Text>
                <Text style={styles.itemText}>Category: {item.Category}</Text>
                <Text style={styles.itemText}>Level: {item.Level}</Text>
                <Text style={styles.itemText}>About: {item.About}</Text>
               
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    backgroundColor: '#2A3F84',
    borderRadius: 5
  },
  categoryItem: {
    flexDirection: 'row',
    backgroundColor: '#b1f2ff',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    height: 80, // Adjust height as per your requirement
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
  itemContainer: {
    backgroundColor: '#b1f2ff',
    padding: 10,
    marginVertical: 5,
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
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
    color: 'blue',
},
  container: {
    flex: 1,
    backgroundColor: '#03cafc',
    padding: 4,
},
});
