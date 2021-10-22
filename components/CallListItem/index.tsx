import React from 'react'
import { View, Text, Image } from 'react-native';
import { ChatRoom } from '../../types';
import styles from './style';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';

export type CallListItemProps = {
    chatRoom : ChatRoom;
}
//functional component
const CallListItem= ( props:CallListItemProps ) => {
    const { chatRoom } = props;
    const user  = chatRoom.users[1];
    //console.log(user.imageUri);

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: user.imageUri }} style={styles.avatar} />
                <View style={styles.midContainer}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.time}>
                        {moment(chatRoom.lastMessage.createdAt).format('MMMM DD,  LT')}
                    </Text>
                </View>
            </View>
            <FontAwesome style={styles.calls} name="phone" size={22} />
            {/* <Text style={styles.time}>Yesterday</Text> */}
        </View>
    )
};

export default  CallListItem;


