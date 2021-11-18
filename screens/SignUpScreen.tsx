import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator, Alert} from 'react-native';

import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGN_UP_MUTATION } from '../backend-server/src/schema/mutations/mutations';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const [signUp, {data, error, loading}] = useMutation(SIGN_UP_MUTATION);
  
  if(error){
    Alert.alert("Something went Wrong. Please try Again!");
  }
  if(data){
    //save the token to the local storage
    AsyncStorage
      .setItem('token',data.signUp.token)
      .then(()=> {
        //navigate to Home Screen
        navigation.navigate('Home');
      });
  }

  const onSubmit= () => {
    signUp({variables: {email, password, name, phoneno}})
  }

  /********************************
   ******Loading Custom Fonts******
   ********************************/
   const [loaded] = useFonts({
    BebasNeueRegular: require('../assets/fonts/BebasNeueRegular.ttf'), 
  });
  if(!loaded){ return null; }
  /*******************************
   *******************************
   *******************************/

  return (
    <View
      style={styles.container}    
    >
      <Text style={styles.heading}>Sign Up</Text>
      {/* *********************************
      ************Enter Details************
      ************************************/}
      <View style={{width: '90%'}}>
        <TextInput
          placeholder={'Name'}
          value={name}
          onChangeText={setName}
          style={styles.textInput}
        />
        <TextInput
          placeholder={'Phone Number'}
          value={phoneno}
          onChangeText={setPhoneno}
          style={styles.textInput}
        />
        <TextInput
          placeholder={'Email'}
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TextInput
          placeholder={'Password'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.textInput}
        />
      

        {/* *********************************
        ************Signup Button************
        ************************************/}
        
        <Pressable 
          disabled ={ loading }
          onPress={onSubmit} 
          style={styles.signUp}
        >
          {/* if loading show the ActivityIndicator */}
          {loading && <ActivityIndicator size="large" color="black" />}
          {
            !loading 
            &&
            <Text 
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              Sign Up
            </Text>
          }
        </Pressable>

        {/* *********************************
        **************Signin Link************
        ************************************/}

        <Pressable 
          onPress={()=> {navigation.navigate('Signin')}} 
          style={styles.signIn}
        >
          <Text 
            style={{
              color: '#8f9bff',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Already a User? Sign In
          </Text>
        </Pressable>
      </View>
    </View>
    ) 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#bbdefb',
    padding: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'BebasNeueRegular',
    fontSize: 65,
    color: '#039be5',
    position: 'absolute',
    top: 90,
  },
  textInput: {
    fontSize: 18,
    width: '100%',
    marginVertical: 10,
  },
  signUp: {
    backgroundColor: '#039be5',
    borderRadius: 5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  signIn: {
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  }
});

export default SignUpScreen;
