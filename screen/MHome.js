import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Check = ({ navigation }) => {
    const [logemail, setLogemail] = useState('');

    const getStoredEmail = async () => {
        try {
            const logemail = await AsyncStorage.getItem('logemail');
            setLogemail(logemail);
        } catch (error) {
            console.error('Error retrieving email:', error);
            return null;
        }
    };

    useEffect(() => {
        getStoredEmail();
    }, []);

    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Movies')}
                style={styles.button}
            >
                Movie Section
            </Button>
            {(logemail == 'admin@gmail.com') && (
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('MovieDash')}
                    style={styles.button}
                >
                    Movie Dashboard
                </Button>
            )}
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

export default Check;
