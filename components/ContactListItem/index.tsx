import React from 'react'
import { View, Text, Image } from 'react-native';
import styles from './style';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useMutation } from '@apollo/client';
import { 
  CREATE_CHATROOM_MUTATION, 
  ADD_USER_TO_CHATROOM_MUTATION 
} from '../../backend-server/src/schema/mutations/mutations'; 

interface ContactListItemProps {
  listUsers: {
    id: string,
    name: string,
    email: string,
    phoneno: string,
    avatar: string,
    status: string,
  }
}

const ContactListItem= ( props:ContactListItemProps ) => {

  // console.log(props.listUsers)
  const navigation = useNavigation();
  const [
    newChatRoom,
    {data: createChatRoomData}
  ] = useMutation(CREATE_CHATROOM_MUTATION);
  const [
    addUserToChatRoom,
    {data: addUserToChatRoomData}
  ] = useMutation(ADD_USER_TO_CHATROOM_MUTATION);

  const onClick = async() => {

    navigation.navigate('ChatRoom',
      { id: props.listUsers.id,
        name: props.listUsers.name,
        image: props.listUsers.avatar 
      }
    );

    await newChatRoom({
      variables: {
        createChatRoomName: props.listUsers.name,
        createChatRoomImageUri: props.listUsers.avatar,
        createChatRoomPhoneno: props.listUsers.phoneno,
      }
    }).then(async(promise) => {
        if(promise){
          //console.log(promise);
          await addUserToChatRoom({
            variables: {
              chatRoomId: promise.data.createChatRoom.id,
              userId: props.listUsers.id,
            }
          })
        }
        return promise;
      })
      // .then(async (result) => {
      //   if(result){
      //     //console.log(result);
      //     navigation.navigate('ChatRoom',
      //       { id: result.data.createChatRoom.id,
      //         name: props.listUsers.name,
      //         image: props.listUsers.avatar }
      //     );
      //   }
      // });
  }
  // if(createChatRoomData){
  //   console.log(createChatRoomData);
  //   console.log(props.listUsers.id);
  // }
  // if(addUserToChatRoomData){
  //   console.log(addUserToChatRoomData);
  // }

  return (
    <TouchableWithoutFeedback
      onPress={onClick}
    >
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: props.listUsers.avatar }} style={styles.avatar} />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.userName}>{props.listUsers.name}</Text>
          </View>
          <Text
            ellipsizeMode='tail'
            numberOfLines={1}
            style={styles.status} >
            {props.listUsers.status}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
};

export default  ContactListItem;