import * as React from 'react';
import { Feather} from '@expo/vector-icons';
import { Alert, Modal, Text, Pressable, View, TouchableOpacity } from "react-native";
import { useState } from 'react';
import styles from './style';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { client } from '../../apollo';


const OptionsItem = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  
  const onClick = () => {
    setModalVisible(!modalVisible);
    navigation.navigate('Profile');
  }

  //Log Out the User
  const onLogOut = async () => {
    setModalVisible(!modalVisible);
    await AsyncStorage.removeItem('token');
    client.resetStore();
    navigation.navigate('Signin');
  }

  return (
    <View>
      <Modal
        animationType= 'fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity 
          style={{
            width:'100%',
            height: '100%',
          }}
          activeOpacity={1} 
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <TouchableWithoutFeedback onPress={onClick} >
                <Text style={styles.modalText}>Profile</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={onLogOut} >
                <Text style={styles.modalText}>Log Out</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Pressable onPress={() => setModalVisible(true)} >
        <Feather name="more-vertical" size={24} color="#fff" />
      </Pressable>
    </View>
  );
};

export default OptionsItem;