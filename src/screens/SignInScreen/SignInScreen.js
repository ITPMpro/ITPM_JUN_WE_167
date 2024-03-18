//import React from 'react';
import {View ,Text,Image, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/images/logo_1.jpg';
import { StyleSheet } from 'react-native';
import CustomInput from '../../components/CustomInput';
import React, {useState} from 'react';
import CustomButton from '../../components/CustomButton';

const SignInScreen=()=> {
    const [username, setUsername] =useState('');
    const [password, setPassword] =useState('');



    const {height}=useWindowDimensions();

    const onSignInPressed= () =>{
        console.warn("Sign in");
    };
        const onForgotPasswordPressed= () =>{
            console.warn('onForgotPasswordPressed');

    
    };

    const onSignInFacebook=() =>{
        console.warn('onSignInFacebook');
    };

    const onSignInGoogle=() =>{
        console.warn('onSignInGoogle');
    };
    const onSignInApple=() =>{
        console.warn('onSignInApple');
    };

    const onSignUpPress=()=> {
        console.warn('onSignUpPress');

    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.root}>
          
          < Image 
          source={Logo} 
          style={[styles.logo,{height:height*0.3}]} 
          resizMode="contain" 
          />
          <CustomInput 
          placeholder="Username" 
          value={username} 
          setValue={setUsername} 
          />
          
          <CustomInput 
          placeholder="Password" 
          value={password} 
          setValue={setPassword} 
          secureTextEntry={true}
          />
          <CustomButton text="Sign In" onPress={onSignInPressed}/>
          <CustomButton 
          text="Forgot password" 
          onPress={onForgotPasswordPressed} 
          type="TERTIARY"
          />

<CustomButton 
text="Sign In with Facebook" 
onPress={onSignInFacebook}
bgColor="#E7EAF4"
fgColor="#4765A9"
/>
<CustomButton 
text="Sign In with Google" 
onPress={onSignInGoogle}
bgColor="#FAE9EA"
fgColor="#DD4D44"
/>
<CustomButton 
text="Sign In with Apple" 
onPress={onSignInApple}
bgColor="#e3e3e3"
fgColor="#363636"
/>
<CustomButton 
text="Don't have an account? Create one" 
onPress={onSignUpPress}
bgColor="#e3e3e3"
fgColor="#363636"
/>
        </View>
        </ScrollView>
        
    );
};
const styles =StyleSheet.create({
    root:{
        alignItems:'center',
        padding:20,
    },
    logo:{
   width:'70%',
   maxHeight:150,
   maxWidth:200,
},
});
export default SignInScreen;