import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getDatabase, ref, update } from 'firebase/database';
import app from '../Firebase';

const EditMovie = ({ route, navigation }) => {
    const { movieId } = route.params;
    const [movie, setMovie] = useState({});
    const [movieName, setMovieName] = useState('');
    const [description, setDescription] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [imageURL, setImageURL] = useState('');

    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [imageURLError, setImageURLError] = useState('');

    useEffect(() => {
        const db = getDatabase(app);
        const movieRef = ref(db, `myApp/movies/${movieId}`);
        
        const fetchData = async () => {
            try {
                const snapshot = await ref(movieRef);
                if (snapshot.exists()) {
                    setMovie(snapshot.val());
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {            
        };
    }, [movieId]);

    const handleUpdateMovie = async () => {
        try {
            setNameError('');
            setDescriptionError('');
            setTimeError('');
            setLocationError('');
            setPriceError('');
            setImageURLError('');

            let valid = true;

            if (!movieName) {
                setNameError('Movie name is required');
                valid = false;
            }

            if (!description) {
                setDescriptionError('Description is required');
                valid = false;
            }

            if (!time) {
                setTimeError('Time is required');
                valid = false;
            }

            if (!location) {
                setLocationError('Location is required');
                valid = false;
            }

            if (!price) {
                setPriceError('Price is required');
                valid = false;
            }

            if (!imageURL) {
                setImageURLError('Image URL is required');
                valid = false;
            }

            if (valid) {
                const db = getDatabase(app);
                const movieRef = ref(db, `myApp/movies/${movieId}`);

                const updatedMovie = {
                    movieName,
                    description,
                    time,
                    location,
                    price,
                    imageURL,
                };

                await update(movieRef, updatedMovie);
                navigation.navigate('AllMovies');
            }
        } catch (error) {
            console.error('Error updating movie:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Edit Movie</Text>
            <TextInput
                label="Movie Name"
                style={styles.input}
                value={movieName || movie.movieName}
                onChangeText={setMovieName}
                error={!!nameError}
            />
            {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
            <TextInput
                label="Description"
                style={styles.input}
                value={description || movie.description}
                onChangeText={setDescription}
                error={!!descriptionError}
            />
            {descriptionError ? <Text style={styles.error}>{descriptionError}</Text> : null}
            <TextInput
                label="Time"
                style={styles.input}
                value={time || movie.time}
                onChangeText={setTime}
                error={!!timeError}
            />
            {timeError ? <Text style={styles.error}>{timeError}</Text> : null}
            <TextInput
                label="Location"
                style={styles.input}
                value={location || movie.location}
                onChangeText={setLocation}
                error={!!locationError}
            />
            {locationError ? <Text style={styles.error}>{locationError}</Text> : null}
            <TextInput
                label="Price"
                style={styles.input}
                value={price || movie.price}
                onChangeText={setPrice}
                error={!!priceError}
            />
            {priceError ? <Text style={styles.error}>{priceError}</Text> : null}
            <TextInput
                label="Image URL"
                style={styles.input}
                value={imageURL || movie.imageURL}
                onChangeText={setImageURL}
                error={!!imageURLError}
            />
            {imageURLError ? <Text style={styles.error}>{imageURLError}</Text> : null}
            <Button mode="contained" onPress={handleUpdateMovie} style={styles.button}>
                Update Movie
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginBottom: 10,
    },
    button: {
        marginTop: 20,
    },
    error: {
        color: 'red',
        marginBottom: 5,
    },
});

export default EditMovie;
