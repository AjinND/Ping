import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatScreen from '../screens/ChatScreen';
import GroupScreen from '../screens/GroupScreen';
import CallScreen from '../screens/CallScreen';
import { RootTabParamList } from '../types';

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
 const BottomTab = createBottomTabNavigator<RootTabParamList>();

 export default function BottomTabNavigator() {
   const colorScheme = useColorScheme();
 
   return (
     <BottomTab.Navigator
       initialRouteName="TabOne"
       screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors[colorScheme].background,
            tabBarStyle:{
                backgroundColor: Colors.dark.tint
            }
       }}
      >
       <BottomTab.Screen
         name="TabOne"
         component={ChatScreen}
         options={{ 
           title: 'Chats',
           //tabBarLabel:() => {return null},
           tabBarIcon: ({ color }) => <Ionicons name="chatbubbles-sharp" size={24} color={color} />,
           
         }}
       />
       <BottomTab.Screen
         name="TabTwo"
         component={GroupScreen}
         options={{
           title: 'Groups',
           //tabBarLabel:() => {return null},
           tabBarIcon: ({ color }) => <FontAwesome name="group" size={24} color={color} />,
         }}
       />
       <BottomTab.Screen
         name="TabThree"
         component={CallScreen}
         options={{
           title: 'Calls',
           //tabBarLabel:() => {return null},
           tabBarIcon: ({ color }) => <TabBarIcon name="phone" color={color}/>,
         }}
       />
     </BottomTab.Navigator>
   );
 }
 
 /**
  * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
  */
 function TabBarIcon(props: {
   name: React.ComponentProps<typeof FontAwesome>['name'];
   color: string;
 }) {
   return <FontAwesome size={27} style={{ marginBottom: -3 }} {...props} />;
 }

 // Each tab has its own navigation stack, you can read more about this pattern here:
 // https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

 