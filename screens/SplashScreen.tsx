import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'

const SplashScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    const checkUser = async ()=> {
      if(await isAuthenticated()){
        navigation.navigate('Home')
      }else{
        navigation.navigate('Signin')
      }
    }
    checkUser();
  }, [])

  const isAuthenticated= async ()=> {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  }

  return (
    <View
      style={{
        flex: 1, 
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}

export default SplashScreen;
