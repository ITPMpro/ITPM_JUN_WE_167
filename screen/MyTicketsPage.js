import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../Firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MyTicketsPage = ({ navigation }) => {
    const [tickets, setTickets] = useState([]);

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

    useEffect(() => {
        const db = getDatabase(app);
        const ticketsRef = ref(db, 'myApp/bookings');

        onValue(ticketsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const ticketArray = Object.entries(data).map(([id, ticket]) => ({ id, ...ticket }));
                setTickets(ticketArray);
            } else {
                setTickets([]);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>My Tickets</Text>
                {tickets.map((ticket) => (
                    (ticket.email == logemail) && (
                        <Card key={ticket.id} style={styles.card}>
                            <Card.Content>
                                <Text style={styles.text}>Movie Name: {ticket.movieName}</Text>
                                <Text style={styles.text}>Time: {ticket.time}</Text>
                                <Text style={styles.text}>Seats: {ticket.selectedSeats.join(', ')}</Text>
                                <Text style={styles.text}>Email: {ticket.email}</Text>
                                <Text style={styles.text}>Phone: {ticket.phone}</Text>
                                <Text style={styles.text}>Date: {new Date(ticket.date).toLocaleDateString()}</Text>
                            </Card.Content>
                        </Card>
                    )
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        marginBottom: 20,
        elevation: 4,
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default MyTicketsPage;
