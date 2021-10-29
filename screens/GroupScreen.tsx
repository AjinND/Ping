import * as React from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import { View } from '../components/Themed';

import GroupListItem from '../components/GroupListItem';
import NewGroupButtonItem from '../components/NewGroupButtonItem';
import { gql,useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

const  MY_GROUPS= gql`
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

const CREATE_CHATROOM = gql`
mutation Mutation($createChatRoomName: String!, $createChatRoomImageUri: String) {
  createChatRoom(name: $createChatRoomName, imageUri: $createChatRoomImageUri) {
    id
    name
    imageUri
    createdAt
    users {
      id
      name
    }
  }
}
`;

export default function GroupScreen() {

  const [groups,setGroups] =  useState(null);
  const {data, error, loading} = useQuery(MY_GROUPS);

  const [
    newGroup,
    {data:createChatRoomData, error: createChatRoomError, loading: createChatRoomLoading}
  ] = useMutation(CREATE_CHATROOM, {refetchQueries: [MY_GROUPS]} );

  useEffect(() => {
    if(error){
      Alert.alert("Something went Wrong! Please reload.");
    }
  }, [error])

  useEffect(() => {
    if(data){
      //console.log(data);
      const chatrooms: any = []
      data.chatRooms.map((chatroom: any) => {
        if(chatroom.users.length!==2){
          chatrooms.push(chatroom);
        }
      });  
      setGroups(chatrooms); 
      //setGroups(data.chatRooms);
    }
  }, [data])

  const createGroupMutation =({groupName,groupPic}: any)=> {
    newGroup({
      variables: {
        createChatRoomName: groupName,
        createChatRoomImageUri: groupPic
      }
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={groups}
        renderItem={ ( {item} )=> <GroupListItem chatRoom={item} /> }
        keyExtractor={ (item) => item.id } 
      />
      <NewGroupButtonItem createGroupMutation={createGroupMutation} />
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
