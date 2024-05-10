import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Chip, TextInput } from 'react-native-paper';
import { getDatabase, ref, push, set } from 'firebase/database';
import app from '../Firebase';
import DateTimePicker from '@react-native-community/datetimepicker';

const BookPage = ({ route, navigation }) => {
    const { movie } = route.params;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [seatError, setSeatError] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const toggleSeat = (seatNumber) => {
        if (selectedSeats.includes(seatNumber)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };

    const renderSeats = () => {
        const totalSeats = 40;
        const seats = [];

        for (let i = 1; i <= totalSeats; i++) {
            const isSelected = selectedSeats.includes(i);
            seats.push(
                <Chip
                    key={i}
                    onPress={() => toggleSeat(i)}
                    selected={isSelected}
                    style={styles.seat}
                >
                    {i}
                </Chip>
            );
        }

        return seats;
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\d{10}$/;
        return regex.test(phoneNumber);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || selectedDate;
        setShowDatePicker(false);
        setSelectedDate(currentDate);
    };

    const handleBooking = async () => {
        setEmailError('');
        setPhoneError('');
        setSeatError('');

        if (!email.trim()) {
            setEmailError('Email is required');
            return;
        }
        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            return;
        }
        if (!phone.trim()) {
            setPhoneError('Phone number is required');
            return;
        }
        if (!validatePhoneNumber(phone)) {
            setPhoneError('Phone number must be 10 digits');
            return;
        }
        if (selectedSeats.length === 0) {
            setSeatError('Please select at least one seat');
            return;
        }
        if (!selectedDate) {
            setSeatError('Please select a date');
            return;
        }

        try {
            const db = getDatabase(app);
            const bookingsRef = ref(db, 'myApp/bookings');

            const newBookingRef = push(bookingsRef);
            const newBooking = {
                movieName: movie.movieName,
                time: movie.time,
                selectedSeats,
                email,
                phone,
                date: selectedDate.toISOString(),
            };
            await set(newBookingRef, newBooking);
            setSelectedSeats([]);
            setEmail('');
            setPhone('');
            setSelectedDate(new Date());
            navigation.navigate('ViewAllUMovies');
        } catch (error) {
            console.error('Error booking movie:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Select Your Seats for {movie.movieName}</Text>
                <View style={styles.seatContainer}>
                    {renderSeats()}
                </View>
                {seatError ? <Text style={styles.error}>{seatError}</Text> : null}
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                    <Text style={{ color: '#000', paddingVertical: 10 }}>
                        {selectedDate.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    error={emailError ? true : false}
                />
                {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
                <TextInput
                    label="Phone Number"
                    value={phone}
                    onChangeText={setPhone}
                    style={styles.input}
                    error={phoneError ? true : false}
                    keyboardType="numeric"
                />

                {phoneError ? <Text style={styles.error}>{phoneError}</Text> : null}
                <Button mode="contained" onPress={handleBooking} style={styles.button}>
                    Book Now
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    seatContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 20
    },
    seat: {
        margin: 5,
    },
    button: {
        marginTop: 20,
        width: '80%',
        alignSelf: 'center',
    },
    input: {
        width: '80%',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default BookPage;
