import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import app from '../Firebase';

const AllMovies = ({ navigation }) => {
    const [movies, setMovies] = useState([]);

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
        return () => {
        };
    }, []);

    const handleEditMovie = (movieId) => {
        navigation.navigate('EditMovie', { movieId });
    };

    const handleCancelMovie = async (movieId) => {
        const db = getDatabase(app);
        try {
            await remove(ref(db, `myApp/movies/${movieId}`));
            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
        } catch (error) {
            console.error('Error deleting movie:', error.message);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>All Movies</Text>
            {movies.map((movie) => (
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
                        <Button onPress={() => handleEditMovie(movie.id)} style={styles.actionButton}>Edit</Button>
                        <Button onPress={() => handleCancelMovie(movie.id)} style={styles.actionButton}>Delete</Button>
                    </Card.Actions>
                </Card>
            ))}
        </ScrollView>
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
    addButton: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
});

export default AllMovies;
