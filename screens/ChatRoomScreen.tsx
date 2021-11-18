import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, ImageBackground, Text } from "react-native";
import ChatMessageItem from "../components/ChatMessageItem";
import InputBoxItem from "../components/InputBoxItem";

import { QUERY_CURRENT_USER, QUERY_MESSAGE_BY_CHATROOM } from "../backend-server/src/schema/queries/queries";
import { NEW_MESSAGE_SUBSCRIPTION } from "../backend-server/src/schema/subscriptions/subscriptions";
import { useQuery, useSubscription } from "@apollo/client";

const ChatRoomScreen = () => {

    const [messages, setMessages] = useState([]);
    const [currentUserId, setCurrentUserId] = useState('');
    
    const route = useRoute();
    //console.log(route.params);

    const { 
        data: newMessageSubscriptionData, 
        error: newMessageSubscriptionError,
        loading: newMessageSubscriptionLoading 
    } = useSubscription(NEW_MESSAGE_SUBSCRIPTION);

    useEffect(() => {
        //console.log('gf');
        if(!newMessageSubscriptionLoading){
            console.log(newMessageSubscriptionData);
        }
    }, [])

    const {data:currentUserData, error:currentUserError, loading:currentUserLoading} = useQuery(QUERY_CURRENT_USER);
    useEffect(() => {
        if(currentUserError){
          Alert.alert("Something went Wrong! Please reload.");
        }
    }, [currentUserError]);
    useEffect(() => {
        if(currentUserData){
            setCurrentUserId(currentUserData.listCurrentUser.id);
        }
    }, [currentUserData]);

    const  {data, error, loading} = useQuery(
        QUERY_MESSAGE_BY_CHATROOM,
        {variables: {
            chatRoomId: route.params.id,
        }}
    );
    useEffect(() => {
        if(data){
            const messageData = data.messagesByChatRooms;
            //console.log(data);
            setMessages(messageData);
        }
    }, [data]);

    return(
        <ImageBackground
            resizeMode='cover'
            style={{
                flex: 1,
                justifyContent: 'center',
            }}
            source={require('../assets/images/BG1.png')}
        >
            <FlatList
                data={messages}
                renderItem = {
                    ({item}) => <ChatMessageItem currentUserId = {currentUserId} message={item}/>
                }
                inverted
            >
            </FlatList>

            <InputBoxItem chatRoomId={route.params.id} />
        </ImageBackground>
    );
}

export default ChatRoomScreen;