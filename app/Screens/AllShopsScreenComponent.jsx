import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { db } from '../../firebase/config';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

export default function AllShopsScreenComponent() {
      const [storeName, setStoreName] = useState('');
      const [about, setAbout] = useState('');
      const [level, setLevel] = useState('');

      function create (){

        addDoc(collection(db, "store"), {
          StoreName : storeName,
          Level: level,
          About: about
          
        }).then(()=> {

          console.log('data submitted');

        }).catch((error)=>{

          console.log(error);
        });;
        

      }


  return (
    <View style={styles.container}>

     
      <Text>firebase crud</Text>
      <TextInput value={storeName} onChangeText={(storeName) => {setStoreName(storeName)}} placeholder="Store Name" style={styles.textBoxes}/>
      <TextInput value={level} onChangeText={(level) => {setLevel(level)}} placeholder="Level" style={styles.textBoxes}/>
      <TextInput value={about} onChangeText={(about) => {setAbout(about)}} placeholder="About" style={styles.textBoxes}/>
      <TouchableOpacity onPress={create} style={styles.button}>
        <Text>Submit data</Text>
      </TouchableOpacity>
      {/* <button onClick={create}>Submit data</button> */}

    </View>
  );
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems:'center',
      justifyContent:'center',
    },
    textBoxes: {
      width: '90%',
      fontSize: 18,
      padding: 12,
      borderColor:'gray',
      borderWidth: 0.2,
      borderRadius:10,
      marginBottom: 10, 
    },
    button: {
      backgroundColor: '#DDDDDD',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },

});






