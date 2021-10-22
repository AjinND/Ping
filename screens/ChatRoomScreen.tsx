import { useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, ImageBackground, Text } from "react-native";
import ChatMessageItem from "../components/ChatMessageItem";
import InputBoxItem from "../components/InputBoxItem";
import Chats from "../data/Chats";

const ChatRoomScreen = () => {
    const route=useRoute();
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
                data={Chats.messages}
                renderItem = {
                    ({item}) => <ChatMessageItem message={item}/>
                }
                //inverted
            >
            </FlatList>

            <InputBoxItem/>
        </ImageBackground>
    );
}

export default ChatRoomScreen;