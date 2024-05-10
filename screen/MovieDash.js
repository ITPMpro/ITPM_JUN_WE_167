import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { getDatabase, ref, onValue } from 'firebase/database';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import app from '../Firebase'; // Assuming you have Firebase initialized in Firebase.js

const MovieDash = ({ navigation }) => {
    const [tickets, setTickets] = useState([]);

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

    const downloadUsersReport = async () => {
        const htmlContent = generateHTMLReport(tickets);
        try {
            const pdf = await Print.printToFileAsync({ html: htmlContent });
            if (pdf.uri) {
                Sharing.shareAsync(pdf.uri);
            }
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const generateHTMLReport = (tickets) => {
        let html = `
            <html>
                <head>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <table>
                        <thead>
                            <tr>
                                <th>Movie Name</th>
                                <th>Time</th>
                                <th>Seats</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        tickets.forEach((ticket) => {
            html += `
                <tr>
                    <td>${ticket.movieName}</td>
                    <td>${ticket.time}</td>
                    <td>${ticket.selectedSeats}</td>
                    <td>${ticket.email}</td>
                    <td>${ticket.phone}</td>
                    <td>${ticket.date}</td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        return html;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Movie Dashboard</Text>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('AddMovie')}
                style={styles.button}
            >
                Add Movies
            </Button>
            <Button
                mode="contained"
                onPress={() => navigation.navigate('AllMovies')}
                style={styles.button}
            >
                All Movies
            </Button>
            <Button
                mode="contained"
                onPress={downloadUsersReport}
                style={styles.button}
            >
                Report
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

export default MovieDash;
