import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Modal, Image } from 'react-native';
import { db } from '../../firebase/config';
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function CarParkingScreen() {
    const [parkingLocation, setParkingLocation] = useState('');
    const [numberPlate, setNumberPlate] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [parkingData, setParkingData] = useState([]);
    const [editingParkingSpot, setEditingParkingSpot] = useState(null);
    const [availableSpaces, setAvailableSpaces] = useState(100);
    const [searchLocation, setSearchLocation] = useState('');
    const [filteredParkingData, setFilteredParkingData] = useState([]);
    const [report, setReport] = useState('');
    const navigation = useNavigation(); 
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchParkingData();
    }, []);

    useEffect(() => {
        filterParkingData();
    }, [searchLocation, parkingData]);

    function fetchParkingData() {
        getDocs(collection(db, "parking")).then(querySnapshot => {
            let data = [];
            querySnapshot.forEach(doc => {
                data.push({ ...doc.data(), id: doc.id });
            });
            setParkingData(data);
            updateAvailableSpaces(data.length);
        });
    }

    function filterParkingData() {
        if (searchLocation.trim() === '') {
            setFilteredParkingData(parkingData);
            return;
        }

        const filteredData = parkingData.filter(parkingSpot => parkingSpot.location.includes(searchLocation));
        setFilteredParkingData(filteredData);
    }

    function submitParkingSpotToFirestore() {
        if (editingParkingSpot) {
            updateParkingSpot();
        } else {
            if (availableSpaces > 0) {
                addDoc(collection(db, "parking"), {
                    location: availableSpaces.toString(), // Set location as available space number
                    numberPlate: numberPlate,
                    ownerName: ownerName,
                    availableSpaces: 1 // Add a single parking spot
                })
                .then(() => {
                    console.log('Parking spot added successfully');
                    fetchParkingData(); // Update the displayed data after submission
                    setAvailableSpaces(prevSpaces => prevSpaces - 1); // Decrease available spaces by 1
                })
                .catch((error) => {
                    console.log('Error adding parking spot:', error);
                });
            } else {
                console.log('No available parking spots.');
            }
        }
        setModalVisible(false); // Close the modal after submission
    }

    function updateParkingSpot() {
        updateDoc(doc(db, "parking", editingParkingSpot.id), {
            location: parkingLocation,
            numberPlate: numberPlate,
            ownerName: ownerName,
            availableSpaces: availableSpaces
        })
        .then(() => {
            console.log('Parking spot updated successfully');
            setEditingParkingSpot(null);
            fetchParkingData();
            generateReport();
        })
        .catch((error) => {
            console.log('Error updating parking spot:', error);
        });
    }

    function deleteParkingSpot(parkingSpotId) {
        deleteDoc(doc(db, "parking", parkingSpotId))
            .then(() => {
                console.log("Parking spot deleted successfully!");
                fetchParkingData();
                generateReport();
            })
            .catch((error) => {
                console.error("Error deleting parking spot: ", error);
            });
    }

    function editParkingSpot(parkingSpot) {
        setParkingLocation(parkingSpot.location);
        setNumberPlate(parkingSpot.numberPlate);
        setOwnerName(parkingSpot.ownerName);
        setEditingParkingSpot(parkingSpot);
    }

    function updateAvailableSpaces(parkingCount) {
        setAvailableSpaces(100 - parkingCount);
    }

    function generateReport() {
        const reportData = parkingData.map(parkingSpot => ({
            Location: parkingSpot.location,
            "Number Plate": parkingSpot.numberPlate,
            "Owner Name": parkingSpot.ownerName
        }));

        const formattedReport = reportData.map(entry => {
            return Object.entries(entry).map(([key, value]) => `${key}: ${value}`).join('\n');
        }).join('\n\n');

        setReport(formattedReport);
    }

    function cancelReport() {
        setReport(''); // Clear report when "Back to Parking" is clicked
    }

    return (
        <View style={styles.container}>
            <Image source={require('./parking.png')} style={styles.parikingImage} />
          
            <Text style={styles.Parking}>Add Parking Spot</Text>
            
            <View style={styles.flexDirection}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                    <Image source={require('./add.png')} style={styles.addImage} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => generateReport()} style={styles.reportButton}>
                    <Text style={styles.reportButtonText}>Generate Report</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Enter location number"
                value={searchLocation}
                onChangeText={text => setSearchLocation(text)}
            />

            <Text style={styles.availableSpacesText}>Available Spaces: {availableSpaces}</Text>
            
            {report !== '' && (
                <View style={styles.reportContainer}>
                    <TouchableOpacity onPress={() => { navigation.goBack(); cancelReport(); }} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.reportTitle}>Parking Report</Text>
                    <Text style={styles.reportText}>{report}</Text>
                </View>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Submit Parking Spot Information</Text>
                        <Text>Number Plate</Text>
                        <TextInput
                            value={numberPlate}
                            onChangeText={(plate) => setNumberPlate(plate)}
                            placeholder="Number Plate"
                            style={styles.inputField}
                        />
                        <Text>Owner Name</Text>
                        <TextInput
                            value={ownerName}
                            onChangeText={(name) => setOwnerName(name)}
                            placeholder="Owner Name"
                            style={styles.inputField}
                        />
                        <TouchableOpacity onPress={submitParkingSpotToFirestore} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>{editingParkingSpot ? 'Update' : 'Add'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => {
                                setModalVisible(false);
                                setEditingParkingSpot(null);
                            }}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <FlatList
                data={filteredParkingData}
                renderItem={({ item }) => (
                    <View style={styles.parkingSpot}>
                        <Text style={styles.parkingSpotTextLocation}>Location: {item.location}</Text>
                        <Text style={styles.parkingSpotText}>Number Plate: {item.numberPlate}</Text>
                        <Text style={styles.parkingSpotText}>Owner Name: {item.ownerName}</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={() => editParkingSpot(item)} style={styles.editButton}>
                                <Image source={require('./draw.png')} style={styles.buttonIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteParkingSpot(item.id)} style={styles.deleteButton}>
                                <Image source={require('./bin.png')} style={styles.buttonIcon} />
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
        padding: 10,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    addButton: {
        marginBottom: 10,
        alignItems: 'center',
    },
    addImage: {
        width: 50,
        height: 50,
        // marginHorizontal: 100,
    },
    reportButton: {
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    reportButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    reportContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    reportTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    reportText: {
        fontSize: 16,
    },
    availableSpacesText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    Parking: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    backButtonText: {
        color: '#007bff',
        fontSize: 16,
        alignSelf: 'flex-end',
    },
    parkingSpot: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    parkingSpotText: {
        fontSize: 16,
        marginBottom: 5,
    },
    parkingSpotTextLocation:{
        fontSize: 16,
        marginBottom: 5,
        color: '#FF0000',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    editButton: {
        marginLeft: 10,
    },
    deleteButton: {
        marginLeft: 10,
    },
    buttonIcon: {
        width: 20,
        height: 20,
    },
    parikingImage: {
        width: 100,
        height: 100,
        alignSelf:'center',
    },
    // flexDirection: {
    //     flexDirection: 'row', 
    //     // marginHorizontal: 10,
    // },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
    },
    modalView: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%', // Adjust the width as needed
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    submitButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 10,
    },
    buttonText: {
        color: '#007bff',
        fontSize: 16,
    },
});
