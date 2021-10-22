import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';

const InputBoxItem = () => {
    const [message,setMessage] = useState('');

    const onMicroPhonePress=()=>{
        console.warn('Microphone');
    }

    const onSendPress=()=>{
        console.warn(`Sending: ${message}`);
        setMessage('');
    }

    const onPress=()=>{
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
