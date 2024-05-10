import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { getDatabase, ref, push, set } from 'firebase/database';
import app from '../Firebase';

const AddMovie = ({ navigation }) => {
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

    const handleAddMovie = async () => {
        setNameError('');
        setDescriptionError('');
        setTimeError('');
        setLocationError('');
        setPriceError('');
        setImageURLError('');

        if (!movieName) {
            setNameError('Movie name is required');
            return;
        }

        if (!description) {
            setDescriptionError('Description is required');
            return;
        }

        if (!time) {
            setTimeError('Time is required');
            return;
        }

        if (!location) {
            setLocationError('Location is required');
            return;
        }

        if (!price) {
            setPriceError('Price is required');
            return;
        }

        if (!imageURL) {
            setImageURLError('Image URL is required');
            return;
        }

        // Add your validation for price format here if needed

        const movieData = {
            movieName,
            description,
            time,
            location,
            price,
            imageURL,
        };

        try {
            const db = getDatabase(app);
            const moviesRef = ref(db, 'myApp/movies');
            await push(moviesRef, movieData);
            navigation.navigate('AllMovies');
        } catch (error) {
            console.error('Error adding movie:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Movie</Text>
            <TextInput
                label="Movie Name"
                mode="outlined"
                value={movieName}
                onChangeText={setMovieName}
                style={styles.input}
                error={!!nameError}
            />
            {nameError ? <Text style={styles.error}>{nameError}</Text> : null}
            <TextInput
                label="Description"
                mode="outlined"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                error={!!descriptionError}
            />
            {descriptionError ? <Text style={styles.error}>{descriptionError}</Text> : null}
            <TextInput
                label="Time"
                mode="outlined"
                value={time}
                onChangeText={setTime}
                style={styles.input}
                error={!!timeError}
            />
            {timeError ? <Text style={styles.error}>{timeError}</Text> : null}
            <TextInput
                label="Location"
                mode="outlined"
                value={location}
                onChangeText={setLocation}
                style={styles.input}
                error={!!locationError}
            />
            {locationError ? <Text style={styles.error}>{locationError}</Text> : null}
            <TextInput
                label="Price"
                mode="outlined"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                style={styles.input}
                error={!!priceError}
            />
            {priceError ? <Text style={styles.error}>{priceError}</Text> : null}
            <TextInput
                label="Image URL"
                mode="outlined"
                value={imageURL}
                onChangeText={setImageURL}
                style={styles.input}
                error={!!imageURLError}
            />
            {imageURLError ? <Text style={styles.error}>{imageURLError}</Text> : null}
            <Button mode="contained" onPress={handleAddMovie} style={styles.button}>
                Add Movie
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        marginBottom: 10,
    },
    button: {
        width: '80%',
        height: 40,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 5,
    },
});

export default AddMovie;
