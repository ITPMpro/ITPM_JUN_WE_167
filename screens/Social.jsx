import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ImageBackground, Image, Modal, Alert } from 'react-native';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import { db } from './config';

// Import your assets here
const yourAvatar = require('../assets/user.png');
const backgroundImage = require('../assets/new.jpeg');

const App = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');
  const [newImage, setNewImage] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedTweet, setEditedTweet] = useState('');
  const [selectedTweetId, setSelectedTweetId] = useState(null);
  const [initialTweetContent, setInitialTweetContent] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tweets'), (snapshot) => {
      const fetchedTweets = snapshot.docs.map(doc => ({
        id: doc.id, // Include the document ID
        ...doc.data() // Include other tweet data
      }));
      setTweets(fetchedTweets);
    });

    return () => unsubscribe();
  }, []);

  const addTweetToFirestore = async (tweetObj) => {
    await addDoc(collection(db, 'tweets'), tweetObj);
  };

  const deleteTweetFromFirestore = async (id) => {
    await deleteDoc(doc(db, 'tweets', id));
  };

  const updateTweetInFirestore = async () => {
    if (editedTweet.trim() === '') {
      return;
    }

    const updatedTweetObj = {
      tweet: editedTweet,
    };

    try {
      await updateDoc(doc(db, 'tweets', selectedTweetId), updatedTweetObj);
      setEditModalVisible(false);
      setEditedTweet('');
    } catch (error) {
      console.error("Error updating tweet:", error);
    }
  };

  const handleImageUpload = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.5, // Adjust the quality as needed
    };
  
    ImagePicker.launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.uri;
        const imageName = response.fileName || 'image.jpg'; // Provide a default name if fileName is not available
  
        const reference = storage().ref(`images/${imageName}`);
        try {
          const taskSnapshot = await reference.putFile(imageUri);
          const imageUrl = await taskSnapshot.ref.getDownloadURL();
          setNewImage(imageUrl);
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      }
    });
  };
  

  const handleTweetSubmit = async () => {
    if (newTweet.trim() === '' && newImage.trim() === '') {
      return;
    }

    let imageUrl = '';

    if (newImage.trim() !== '') {
      imageUrl = newImage;
    }

    const newTweetObj = {
      // No need to set ID here
      username: 'YourUsername',
      tweet: newTweet,
      image: imageUrl,
      avatar: yourAvatar,
    };

    addTweetToFirestore(newTweetObj);

    setNewTweet('');
    setNewImage('');
  };

  const handleDelete = async (id) => {
    await deleteTweetFromFirestore(id);
  };

  const handleEdit = (id, initialTweet) => {
    setSelectedTweetId(id);
    setInitialTweetContent(initialTweet);
    setEditedTweet(initialTweet);
    setEditModalVisible(true);
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
<TouchableOpacity style={[styles.button, { marginLeft: 0 }]} onPress={handleImageUpload}>
  <Text style={styles.buttonText}>Upload Image</Text>
</TouchableOpacity>

        </View>

        <ScrollView style={styles.tweetContainer}>
          {tweets.map(tweet => (
            <View key={tweet.id} style={styles.tweet}>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(tweet.id)}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(tweet.id, tweet.tweet)}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <Image source={tweet.avatar} style={styles.avatar} />
              <View style={styles.tweetContent}>
                <Text style={styles.username}>{tweet.username}</Text>
                <Text style={styles.tweetText}>{tweet.tweet}</Text>
                {tweet.image && <Image source={{ uri: tweet.image }} style={styles.tweetImage} />}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => {
            setEditModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Edit Post</Text>
              <TextInput
                style={styles.editInput}
                value={editedTweet}
                onChangeText={text => setEditedTweet(text)}
              />
              <TouchableOpacity style={styles.editButton} onPress={updateTweetInFirestore}>
                <Text style={styles.editButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButtone} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.editButtonTexte}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    padding: 35,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
 
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25, // Increase border radius for a more rounded look
    paddingHorizontal: 20, // Increase padding for better spacing
    height: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 20,
  },
  button: {
    backgroundColor: '#1DA1F2',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
   
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
    marginBottom: 5,
    color: '#fff',
  },
  tweetText: {
    marginBottom: 5,
    color: '#fff',
  },
  tweetImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: -3, // Adjusted position
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 20,
    marginBottom: 30,
    paddingLeft: 100,
  },
  editButton: {
    position: 'absolute',
    top: 5,
    right: 65,
    backgroundColor: 'green',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
