import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator } from 'react-native';

import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SIGN_IN_MUTATION } from '../backend-server/src/schema/mutations/mutations';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const navigation = useNavigation();
  const [signIn, {data, error, loading}] = useMutation(SIGN_IN_MUTATION);

  useEffect(() => {
    if(error){
      Alert.alert("Invalid Credentials! Please Try Again.");
    }
  }, [error])
  
  if(data){
    //save the token to the local storage
    AsyncStorage
      .setItem('token',data.signIn.token)
      .then(()=> {
        //navigate to Home Screen
        navigation.navigate('Home');
      });
  }

  const onSubmit= () => {
    signIn({variables: {email, password}})
  }

  /********************************
   ******Loading Custom Fonts******
   ********************************/
  const [loaded] = useFonts({
    GoldleafBold: require('../assets/fonts/GoldleafBold.ttf'), 
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
      <Text style={styles.heading}>Sign In</Text>
      {/* *********************************
        ************Enter Details************
        ************************************/}
      <View style={{width: '90%'}}>
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
        ************Login Button*************
        ************************************/}
        
        <Pressable 
          disabled={loading}
          onPress={onSubmit} 
          style={styles.login}
        >
          {loading && <ActivityIndicator size="large" color="black" />}
          {!loading
            &&
            <Text 
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              Sign In
            </Text>
          }
        </Pressable>

        {/* *********************************
        **************Signup Link************
        ************************************/}

        <Pressable 
          onPress={()=> {navigation.navigate('Signup')}} 
          style={styles.signUp}
        >
          <Text 
            style={{
              color: '#8f9bff',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            New User? Sign Up
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
    fontSize: 58,
    color: '#039be5',
    position: 'absolute',
    top: 170,
  },
  textInput: {
    fontSize: 18,
    width: '100%',
    marginVertical: 10,
  },
  login: {
    backgroundColor: '#039be5',
    borderRadius: 5,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  signUp: {
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  }
});

export default SignInScreen;
