import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

const Movies = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Movies</Text>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('ViewAllUMovies')}
                style={styles.button}
            >
                View All Movies
            </Button>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('MyTicketsPage')}
                style={styles.button}
            >
                My Tickets
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
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        marginVertical: 10,
        width: '70%',
    },
});

export default Movies;
