import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';

// Preload images
const avatar1 = require('../assets/user.png');
const avatar2 = require('../assets/user.png');
const tweetImage1 = require('../assets/img1.jpg');
const yourAvatar = require('../assets/img1.jpg');
const backgroundImage = require('../assets/img1.jpg');
const App = () => {
  const [tweets, setTweets] = useState([
    {
      id: 1,
      username: 'JohnDoe',
      tweet: 'This is my first tweet!',
      image: null,
      avatar: avatar1,
    },
    {
      id: 2,
      username: 'JaneDoe',
      tweet: 'Hello world! #reactnative',
      image: tweetImage1,
      avatar: avatar2,
    },
    {
      id: 3,
      username: 'JaneDoe',
      tweet: 'Hello world! #reactnative',
      image: tweetImage1,
      avatar: avatar2,
    },
    {
      id: 4,
      username: 'JaneDoe',
      tweet: 'Hello world! #reactnative',
      image: tweetImage1,
      avatar: avatar2,
    },
    {
      id: 5,
      username: 'JaneDoe',
      tweet: 'Hello world! #reactnative',
      image: tweetImage1,
      avatar: avatar2,
    },
    
    // Add more tweets as needed
  ]);

  const [newTweet, setNewTweet] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleTweetSubmit = () => {
    if (newTweet.trim() === '' && newImage.trim() === '') {
      return; // Prevent empty tweets
    }

    const newTweetObj = {
      id: tweets.length + 1,
      username: 'YourUsername',
      tweet: newTweet,
      image: newImage,
      avatar: yourAvatar,
    };

    setTweets([newTweetObj, ...tweets]);
    setNewTweet('');
    setNewImage('');
  };

  const handleDelete = (id) => {
    setTweets(tweets.filter(tweet => tweet.id !== id));
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>LK Social Page</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="What's on your mind?"
            value={newTweet}
            onChangeText={text => setNewTweet(text)}
          />
          <TouchableOpacity style={styles.button} onPress={handleTweetSubmit}>
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => alert('Upload image functionality not implemented')}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.tweetContainer}>
          {tweets.slice(0, 5).map(tweet => (
            <View key={tweet.id} style={styles.tweet}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(tweet.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <Image source={tweet.avatar} style={styles.avatar} />
              <View style={styles.tweetContent}>
                <Text style={styles.username}>{tweet.username}</Text>
                <Text style={styles.tweetText}>{tweet.tweet}</Text>
                {tweet.image && <Image source={tweet.image} style={styles.tweetImage} />}
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Like</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Comment</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Share</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#1DA1F2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tweetContainer: {
    flex: 1,
  },
  tweet: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  tweetContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
  },
  tweetText: {
    marginTop: 5,
  },
  tweetImage: {
    marginTop: 5,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  actionButtonText: {
    fontWeight: 'bold',
  },
});

export default App;
