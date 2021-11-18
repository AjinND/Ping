import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';

import { useMutation, useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../../backend-server/src/schema/queries/queries';
import { CREATE_MESSAGE_MUTATION, UPDATE_CHATROOM_MUTATION } from '../../backend-server/src/schema/mutations/mutations';

const InputBoxItem = (props: any) => {

    const {chatRoomId} = props;
    
    // Get the current user id
    const [currentUser, setCurrentUser] = useState();
    const {data, error, loading} = useQuery(QUERY_CURRENT_USER);
    useEffect(() => {
        if(error){
          Alert.alert("Something went Wrong! Please reload.");
        }
    }, [error]);
    useEffect(() => {
        if(data){
            setCurrentUser(data.listCurrentUser.id);
        }
    }, [data]);

    // create a new message
    const [newMessage, {data:messageData}] = useMutation(CREATE_MESSAGE_MUTATION);
    const [updatechatRoom, {data:updatechatRoomData}] = useMutation(UPDATE_CHATROOM_MUTATION);
    const [message, setMessage] = useState('');

    const onMicroPhonePress = () => {
        console.warn('Microphone');
    }

    const updateLastMessage = async(lastMessageId: string) => {
        await updatechatRoom({
            variables: {
                chatRoomId,
                lastMessageId,
            }
        })
    }

    const onSendPress = async() => {
        await newMessage({
            variables: {
                content: message,
                userId: currentUser,
                chatRoomId,
            }
        }).then( async(promise) => {
            if(promise){
                // console.log(promise);
                await updateLastMessage(promise.data.createMessage.id);
            }
        });
        setMessage('');
    }

    const onPress = () => {
        if(!message){
            onMicroPhonePress();
        }else{
            onSendPress();
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Entypo name="emoji-flirt" size={28} color="black" />
                <TextInput 
                    multiline 
                    placeholder={"Let's Have a Chat!"}
                    style={styles.inputBox}
                    value ={message}
                    onChangeText={setMessage}
                />
                <View style={styles.rightContainer}>
                    <Ionicons name="ios-attach" size={30} color="black" style={styles.icons} />
                    <AntDesign name="camerao" size={30} color="black" style={styles.icons} />
                </View>
            </View>
            <TouchableOpacity
                onPress={onPress}
                style={styles.buttonContainer}
            >
                <View >
                    {
                        !message 
                        ?
                        <MaterialIcons name="keyboard-voice" size={30} color="black"/>
                        :
                        <FontAwesome name="send" size={24} color="black" />
                    }
                    
                </View>
            </TouchableOpacity>
        </View>
    )
};

export default InputBoxItem;
