import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../Firebase';

const ViewAllUMovies = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [searchLocation, setSearchLocation] = useState('');

    useEffect(() => {
        const db = getDatabase(app);
        const moviesRef = ref(db, 'myApp/movies');

        onValue(moviesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const movieArray = Object.entries(data).map(([id, movie]) => ({ id, ...movie }));
                setMovies(movieArray);
            } else {
                setMovies([]);
            }
        });
    }, []);

    const handleBook = (movie) => {
        navigation.navigate('BookPage', { movie });
    };

    const filteredMovies = movies.filter(movie => movie.movieName.toLowerCase().includes(searchLocation.toLowerCase()));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>All Movies</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by location"
                value={searchLocation}
                onChangeText={setSearchLocation}
            />
            <ScrollView>
                {filteredMovies.map((movie) => (
                    <Card key={movie.id} style={styles.card}>
                        <Card.Title title={movie.movieName} titleStyle={styles.cardTitle} />
                        <Card.Content>
                            <View style={styles.imageContainer}>
                                <Image source={{ uri: movie.imageURL }} style={styles.image} />
                            </View>
                            <Text style={styles.description}>Description: {movie.description}</Text>
                            <Text style={styles.text}>Time: {movie.time}</Text>
                            <Text style={styles.text}>Location: {movie.location}</Text>
                            <Text style={styles.text}>Price: {movie.price}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => handleBook(movie)} style={styles.actionButton}>Book Now</Button>
                        </Card.Actions>
                    </Card>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    card: {
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 14,
        marginBottom: 3,
        fontWeight: 'bold',
    },
    actionButton: {
        marginHorizontal: 5,
    },
});

export default ViewAllUMovies;
