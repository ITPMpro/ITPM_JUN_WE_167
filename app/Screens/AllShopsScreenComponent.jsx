import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert, Modal, Image } from 'react-native';
import { db } from '../../firebase/config';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Picker } from '@react-native-picker/picker';

export default function AllShopsScreenComponent() {
    const [storeName, setStoreName] = useState('');
    const [about, setAbout] = useState('');
    const [level, setLevel] = useState('');
    const [category, setCategory] = useState('');
    const [storeData, setStoreData] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchStoredData();
    }, []);

    function fetchStoredData() {
        getDocs(collection(db, "store")).then(docSnap => {
            let data = [];
            docSnap.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setStoreData(data);
        });
    }

    function submitDataToFirestore() {
        if (editingItem) {
            updateItem();
        } else {
            addDoc(collection(db, "store"), {
                StoreName: storeName,
                Level: parseInt(level),
                About: about,
                Category: category
            })
            .then(() => {
                console.log('Data submitted successfully');
                fetchStoredData();
            })
            .catch((error) => {
                console.log('Error submitting data:', error);
            });
        }
        setModalVisible(false);
    }

    function updateItem() {
        updateDoc(doc(db, "store", editingItem.id), {
            StoreName: storeName,
            Level: parseInt(level),
            About: about,
            Category: category
        })
        .then(() => {
            console.log('Item updated successfully');
            setEditingItem(null);
            fetchStoredData();
        })
        .catch((error) => {
            console.log('Error updating item:', error);
        });
        setModalVisible(false);
    }

    function deleteItem(itemId) {
        deleteDoc(doc(db, "store", itemId))
            .then(() => {
                console.log("Document successfully deleted!");
                fetchStoredData();
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    }

    function editItem(item) {
        setStoreName(item.StoreName);
        setLevel(item.Level);
        setAbout(item.About);
        setCategory(item.Category);
        setEditingItem(item);
        setModalVisible(true);
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#03cafc", padding: 4 }}>
            <Text style={styles.textModel}>Add a Store</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addImage}>
                <Image source={require('./add.png')} style={styles.addIcon} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Submit Store Information</Text>
                        <Text style={styles.textModel}>Store Name :</Text>
                        <TextInput
                            value={storeName}
                            onChangeText={(storeName) => setStoreName(storeName)}
                            placeholder="Store Name"
                            style={styles.textBoxes}
                        />
                        <Text style={styles.textModel}>Category :</Text>
                        <Picker
                            selectedValue={category}
                            onValueChange={(itemValue) => setCategory(itemValue)}
                            placeholder="Category"
                            style={styles.textBoxes}
                        >
                            <Picker.Item label="Select Category" value="" />
                            <Picker.Item label="Beauty and Wellness" value="Beauty and Wellness" />
                            <Picker.Item label="Department Store / Supermarket" value="Department Store / Supermarket" />
                            <Picker.Item label="Entertainment" value="Entertainment" />
                            <Picker.Item label="Fashion and Accessories" value="Fashion and Accessories" />
                            <Picker.Item label="Food and Beverages" value="Food and Beverages" />
                            <Picker.Item label="Jewellery and Watches" value="Jewellery and Watches" />
                            <Picker.Item label="Kids and Maternity" value="Kids and Maternity" />
                            <Picker.Item label="Lifetyle and Sports" value="Lifetyle and Sports" />
                            <Picker.Item label="Services and Others" value="Services and Others" />
                        
                            {/* Add more categories as needed */}
                        </Picker>
                        <Text style={styles.textModel}>Level :</Text>
                        <TextInput
                            value={String(level)}
                            onChangeText={(level) => setLevel(level)}
                            placeholder="Level"
                            style={styles.textBoxes}
                        />
                        <Text style={styles.textModel}>About :</Text>
                        <TextInput
                            value={String(about)}
                            onChangeText={(about) => setAbout(about)}
                            placeholder="About"
                            style={styles.textBoxes}
                        />
                        
                        <TouchableOpacity onPress={submitDataToFirestore} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>{editingItem ? 'Update Store' : 'Insert Store'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.openButton}
                            onPress={() => {
                                setModalVisible(false);
                                setEditingItem(null);
                            }}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <FlatList
                data={storeData}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.listView}>Store Name  :  {item.StoreName}</Text>
                        <Text style={styles.listView}>Level  :  {item.Level}</Text>
                        <Text style={styles.listView}>About  :  {item.About}</Text>
                        <Text style={styles.listView}>Category  :  {item.Category}</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={() => editItem(item)} style={[styles.button, styles.editButton]}>
                                <Image source={require('./draw.png')} style={styles.editIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteItem(item.id)} style={[styles.button, styles.deleteButton]}>
                                <Image source={require('./bin.png')} style={styles.editIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
    justifyContent: 'center',
},
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%', // Ensure the container takes up the full width of the screen
// },
    textBoxes: {
        width: '90%',
        fontSize: 18,
        padding: 12,
        borderColor: 'gray',
        borderWidth: 0.2,
        borderRadius: 10,
        marginBottom: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginRight: 5,
    },
    // itemContainer: {
    //     backgroundColor: '#f0f0f0',
    //     padding: 10,
    //     marginVertical: 5,
    //     width: '150',
    //     borderRadius: 10,
    // },
    editButton: {
        backgroundColor: '#DDDDDD',
    },
    deleteButton: {
        backgroundColor: 'red',

    },
    submitButton: {
      backgroundColor: '#87CEEB', // Submit button background color
      
      borderRadius: 20,
      padding: 10,
      marginTop: 10,
     
       // Adjust the width as needed
      alignItems: 'center',
      justifyContent: 'center',
  },
  submitButtonText: {
      fontWeight: 'bold',
      color: 'white', // Text color for the submit button
      fontSize: 18,
  },
      
  
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    
    // Modal styles
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      marginTop: 22,
  },
  modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
  },
  modalText: {
      marginBottom: 15,
      color: 'blue',
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
  },
  openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginTop: 10,
  },
  textStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize:18,
      textAlign: 'center',

  },
  textModel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize:18,
    textAlign: 'center',
    
},
  modalTextInput: {
      width: '100%',
      fontSize: 18,
      padding: 12,
      borderColor: 'gray',
      borderWidth: 0.2,
      borderRadius: 10,
      marginBottom: 10,
  },
  // FlatList styles
  itemContainer: {
    backgroundColor: '#b1f2ff',
    padding: 10,
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
itemText: {
    fontSize: 18,
    marginBottom: 5,
},
buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
},
button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginRight: 5,
},
editButton: {
    backgroundColor: '#DDDDDD',
},
deleteButton: {
    backgroundColor: 'red',
},
editIcon: {
  width: 20,
    height: 20,
    resizeMode: 'contain',
},
addImage:{
    alignItems:'center',
    margin:5,
},
listView:{
  alignItems:'center',
  margin:5,
  fontSize: 20,
  fontWeight: "800"
}
});
