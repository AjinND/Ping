import moment from 'moment';
import React from 'react'
import { Text, View } from 'react-native';
import { Message } from '../../types';
import styles from './style';

export type ChatMessageProps = {
    message : Message;
}

const ChatMessageItem= (props: ChatMessageProps) => {
    const {message} = props;

    //Logic to check if the sender of the message is the user
    const isMyMessage = () => {
        return message.user.id === 'u1';
    }

    return(
        <View style={styles.container}>
            <View style={[
                styles.messageBox,
                {
                    backgroundColor: isMyMessage() ? '#81d4fa' : '#b2ebf2',
                    marginStart: isMyMessage() ? 50 : 0,
                    marginEnd: isMyMessage() ? 0 : 50,
                }
                ]}>
                {!isMyMessage() && <Text style={styles.userName}>{message.user.name}</Text>}
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
        </View>
    );
}

export default ChatMessageItem;