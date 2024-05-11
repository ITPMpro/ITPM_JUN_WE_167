import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default function LevelsScreenComponent() {
    const [storeData, setStoreData] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(null);

    // Array of levels with their corresponding level IDs .....
    const levels = [
        { id: 1, name: 'Level 1' },
        { id: 2, name: 'Level 2' },
        { id: 3, name: 'Level 3' },
        { id: 4, name: 'Level 4' },
        { id: 5, name: 'Level 5' },
        { id: 6, name: 'Level 6' },
        { id: 0, name: 'Lower Ground' },
    ];

    // Fetch shop data from Firestore based on the selected level ....
    const fetchStoredData = async (levelId) => {
        const q = query(collection(db, "store"), where("Level", "==", levelId));
        const querySnapshot = await getDocs(q);
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
        setStoreData(data);
    };

    // Function to handle item click for each level ..
    const handleItemClick = (level) => {
        setSelectedLevel(level.id);
        fetchStoredData(level.id);
    };

    // Function to handle back navigation ...
    const handleBackNavigation = () => {
        setSelectedLevel(null);
    };

    // Render function for individual level items...
    const renderLevelItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item)}>
            <View style={styles.levelItem}>
                <Text style={styles.levelText}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );

    // Header component for the FlatList ...
    const headerComponent = () => (
        <Text style={styles.header}>LEVELS</Text>
    );

    return (
        <View style={styles.container}>
            {selectedLevel === null ? (
                <FlatList
                    ListHeaderComponent={headerComponent}
                    data={levels}
                    renderItem={renderLevelItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <>
                    <TouchableOpacity onPress={handleBackNavigation}>
                        <Text style={styles.backButton}>Back</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={storeData}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
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
    container: {
        flex: 1,
        backgroundColor: '#03cafc',
        padding: 4,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    levelItem: {
        backgroundColor: '#b1f2ff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
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
    levelText: {
        fontSize: 20,
        fontWeight: 'bold',
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
        fontSize: 18,
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
});
