import React from 'react'
import { View, Text, Image } from 'react-native';
import { ChatRoom } from '../../types';
import styles from './style';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export type ChatListItemProps = {
    chatRoom : ChatRoom;
}

//functional component
const ChatListItem= ( props:ChatListItemProps ) => {
    const { chatRoom } = props;
    const user  = chatRoom.users[1];
    //console.log(user.imageUri);

    const navigation = useNavigation();

    const onClick = () => {
        navigation.navigate('ChatRoom', 
            {id: chatRoom.id, name: user.name, image:user.imageUri}
        );
    }

    return (
        <TouchableWithoutFeedback
            onPress={onClick}
        >
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: user.imageUri }} style={styles.avatar} />
                </View>
                <View style={styles.rightContainer}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.time}>
                            {moment(chatRoom.lastMessage.createdAt).format('DD/MM/YY')}
                        </Text>
                    </View>
                    <Text 
                        ellipsizeMode='tail' 
                        numberOfLines={1} 
                        style={styles.lastMessage}
                    >
                        {chatRoom.lastMessage.content}
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


