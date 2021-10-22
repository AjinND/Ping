import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { client } from './apollo';
import { ApolloProvider } from '@apollo/client';

 /**
  * FireBase Initialization
  */

//import firebase from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCMhpAkmilVp3nCBKOpb5_YFuaUuXFo9ck",
//   authDomain: "ping-react-native.firebaseapp.com",
//   projectId: "ping-react-native",
//   storageBucket: "ping-react-native.appspot.com",
//   messagingSenderId: "884705463481",
//   appId: "1:884705463481:web:73298d9dedb9eba5e75f68",
//   measurementId: "G-NCVYFV3E5F"
// };

// if(firebase.getApps.length == 0 ){
//   const app = firebase.initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
// }

/*************************** 
 * ************************/

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}
