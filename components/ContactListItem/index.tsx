import React from 'react'
import { View, Text, Image } from 'react-native';
import styles from './style';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

    const navigation = useNavigation();

    const onClick = async() => {
        //console.log(props.listUsers.id);
        //navigate to the chatRoom of this user
    }

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
