import React from 'react'
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './style';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

interface GroupListItemProps {
    chatRoom: {
        id: string,
        createdAt: string,
        name: string,
        imageUri: string
    }
}

const GroupListItem= ( props: GroupListItemProps ) => {
    const { chatRoom } = props;
    const navigation = useNavigation();

    const onClick = () => {
        navigation.navigate('ChatRoom', 
            {id: chatRoom.id, name: chatRoom.name, image: chatRoom.imageUri}
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
                        Hello.. This is a message!
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default  GroupListItem;


