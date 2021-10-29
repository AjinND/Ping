import * as React from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import ChatListItem from '../components/ChatListItem';
import FloatingButtonItem from '../components/FloatingButtonItem';
import { gql, useQuery } from '@apollo/client';
import { useEffect } from 'react';

const  MY_CHATS= gql`
query chatRooms {
  chatRooms {
    id
    name
    createdAt
    imageUri
    users{
      id
      name
      phoneno
    }
  }
}
`;

export default function ChatScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const [chats,setChats] =  React.useState();
  const {data, error, loading} = useQuery(MY_CHATS);

  useEffect(() => {
    if(error){
      Alert.alert("Something went Wrong! Please reload.");
    }
  }, [error])

  useEffect(() => {
    if(data){
      const chatrooms: any = []
      data.chatRooms.map((chatroom: any) => {
        if(chatroom.users.length===2){
          chatrooms.push(chatroom);
        }
      });  
      setChats(chatrooms);   
      //console.log(chatrooms);
    }
  }, [data])

  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={chats}
        renderItem={ ( {item} )=> <ChatListItem chatRoom={item} /> }
        keyExtractor={ (item) => item.id } 
      />
      <FloatingButtonItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
