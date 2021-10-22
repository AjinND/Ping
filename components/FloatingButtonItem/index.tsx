import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const FloatingButtonItem= () => {

    const navigation = useNavigation();
    const onPress= () => {
        navigation.navigate('Contact');
    }

    return(
        <TouchableOpacity onPress={onPress} style={styles.container} >
            <View>
                <AntDesign name="message1" size={30} color="white" />
            </View>
        </TouchableOpacity>
        
    );
}

export default FloatingButtonItem;