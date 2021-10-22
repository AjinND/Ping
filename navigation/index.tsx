/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
 import { Feather } from '@expo/vector-icons';
 import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import * as React from 'react';
 import { ColorSchemeName, Image, View } from 'react-native';
 import Colors from '../constants/Colors';
 
 import { RootStackParamList } from '../types';
 import LinkingConfiguration from './LinkingConfiguration';
 import BottomTabNavigator from './BottomTabNavigator';

 import SignUpScreen from '../screens/SignUpScreen';
 import SignInScreen from '../screens/SignInScreen';
 import SplashScreen from '../screens/SplashScreen';
 import ContactScreen from '../screens/ContactScreen';
 import OptionsItem from '../components/OptionsItem';
 import SearchItem from '../components/SearchItem';
 import ProfileScreen from '../screens/ProfileScreen';
 import NotFoundScreen from '../screens/NotFoundScreen';
 import ChatRoomScreen from '../screens/ChatRoomScreen';
 
 
 export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
   return (
     <NavigationContainer
       linking={LinkingConfiguration}
       theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
       <RootNavigator />
     </NavigationContainer>
   );
 }
 
 /**
  * A root stack navigator is often used for displaying modals on top of all other content.
  * https://reactnavigation.org/docs/modal
  */
 const Stack = createNativeStackNavigator<RootStackParamList>();
 
 function RootNavigator() {
   return (
     <Stack.Navigator 
       screenOptions={{
         headerStyle:{
           backgroundColor: Colors.dark.tint,
         },
         headerTintColor: Colors.dark.text,
         headerTitleAlign: 'left',
         headerTitleStyle:{
           fontWeight: 'bold',
         }
       }}
     >
       <Stack.Screen 
        name="Splash" 
        component={SplashScreen} 
        options={{
          headerBackVisible: false,
          headerShown: false
        }} 
      />
       <Stack.Screen
         name="Signup" 
         component={SignUpScreen} 
         options={{
          title: 'Sign Up',
        }}
       />
       <Stack.Screen
         name="Signin" 
         component={SignInScreen} 
         options={{
          headerBackVisible: false,
          title: 'Sign In',
          headerShown: false,
        }}
       />
       <Stack.Screen 
         name="Home" 
         component={BottomTabNavigator} 
         options={{ 
           headerShown: true,
           title: "Ping",
           headerBackVisible: false,
           headerRight: ()=>(
             <View 
               style={{
                 flexDirection: 'row',
                 width: 70,
                 justifyContent: 'space-between',
                 marginRight: 10
               }}
             >
               <SearchItem />
               <OptionsItem />
             </View>
           )
          }}
       />
       <Stack.Screen
         name="ChatRoom" 
         component={ChatRoomScreen} 
         options={
           ({ route }) => ({ 
             headerBackVisible: true,
             headerLeft: ()=>(
                 <Image source={{ uri: route.params.image}} 
                   style={{
                     width: 40,
                     height: 40,
                     borderRadius: 40,
                     marginRight: 8,
                     marginLeft: -25,
                   }} 
                 />
             ),
             
             title: route.params.name,
 
             headerRight: ()=>(
               <View 
                 style={{
                   flexDirection: 'row',
                   width: 60,
                   justifyContent: 'space-between',
                 }}
               >
                 <Feather name="phone-call" size={22} color="#fff" />
                 <Feather name="more-vertical" size={22} color="#fff" />
               </View>
             )
           })
         } 
       />
       
       <Stack.Screen
         name="Contact" 
         component={ContactScreen} 
         options={{title: 'Contacts'}}
       />
 
        <Stack.Screen
         name="Profile" 
         component={ProfileScreen} 
         options={{title: 'Profile'}}
       />

       <Stack.Screen
         name="NotFound" 
         component={NotFoundScreen} 
         options={{title: 'Undefined!'}}
       />
       
     </Stack.Navigator>
   );
 } 