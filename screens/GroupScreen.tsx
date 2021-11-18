import * as React from 'react';
import { Alert, FlatList, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { useEffect, useState } from 'react';

import GroupListItem from '../components/GroupListItem';
import NewGroupButtonItem from '../components/NewGroupButtonItem';

import { useMutation, useQuery } from '@apollo/client';
import { CREATE_CHATROOM_MUTATION } from '../backend-server/src/schema/mutations/mutations';
import { QUERY_USER_CHATROOMS } from '../backend-server/src/schema/queries/queries';

export default function GroupScreen() {

  const [groups,setGroups] =  useState(null);
  const {data, error, loading} = useQuery(QUERY_USER_CHATROOMS);

  const [
    newGroup,
    {data:createChatRoomData, error: createChatRoomError, loading: createChatRoomLoading}
  ] = useMutation(CREATE_CHATROOM_MUTATION, {refetchQueries: [QUERY_USER_CHATROOMS]} );

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
