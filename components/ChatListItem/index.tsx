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
        imageUri: string
    }
}

//functional component
const ChatListItem= ( props:ChatListItemProps ) => {
    const { chatRoom } = props;
    //console.log(chatRoom.imageUri);

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
                            {moment(chatRoom.createdAt).format('DD/MM/YY')}
                        </Text>
                    </View>
                    <Text 
                        ellipsizeMode='tail' 
                        numberOfLines={1} 
                        style={styles.lastMessage}
                    >
                        {/* {chatRoom.lastMessage.content} */}
                        Hello world!
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


