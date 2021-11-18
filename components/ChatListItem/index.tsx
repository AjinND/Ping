import React from 'react'
import { View, Text, Image } from 'react-native';
import styles from './style';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

interface ChatListItemProps {
    chatRoom: {
        id: string,
        createdAt: string,
        name: string,
        imageUri: string,
        lastMessage: {
            id: string,
            createdAt: string,
            content: string,
            user: {
                id: string,
                name: string,
            }
        }
    }
}

const ChatListItem= ( props:ChatListItemProps ) => {
    const { chatRoom } = props;
    // console.log(chatRoom);

    const navigation = useNavigation();

    const onClick = () => {
        navigation.navigate('ChatRoom', 
            {id: chatRoom.id, name: chatRoom.name, image:chatRoom.imageUri}
        );
    }

    return (
        <TouchableWithoutFeedback
            onPress={onClick}
        >
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: chatRoom.imageUri }} style={styles.avatar} />
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.userName}>{chatRoom.name}</Text>
                        <Text style={styles.time}>
                            {chatRoom.lastMessage && moment(chatRoom.lastMessage.createdAt).format('DD/MM/YY')}
                        </Text>
                    </View>
                    <Text 
                        ellipsizeMode='tail' 
                        numberOfLines={1} 
                        style={styles.lastMessage}
                    >
                        {
                            chatRoom.lastMessage ? `${chatRoom.lastMessage.user.name} : ${chatRoom.lastMessage.content}` : ""
                        }
                    </Text>
                </View>
                {/* <Text style={styles.time}>
                    {moment(chatRoom.lastMessage.createdAt).format('DD/MM/YY')}
                </Text> */}
            </View>
        </TouchableWithoutFeedback>
    )
};

export default  ChatListItem;


