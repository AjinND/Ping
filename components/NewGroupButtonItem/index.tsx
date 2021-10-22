import React, { useEffect, useState } from 'react';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { Modal, TouchableOpacity, View,Text, TextInput, Image, Pressable, Platform } from 'react-native';
import styles from './style';
import * as ImagePicker from 'expo-image-picker';

const NewGroupButtonItem= ({createGroupMutation}: any) => {
  
  const [modalVisible, setModalVisible] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupPic, setGroupPic] = useState('');

  const onPress= () => {
    setGroupName('');
    setGroupPic('');
    setModalVisible(!modalVisible); 
  }

  const onPressSave= ()=> {
    createGroupMutation({groupName, groupPic});
    setModalVisible(!modalVisible); 
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const selectGroupPic= async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    //console.log(result);

    if (!result.cancelled) {
      setGroupPic(result.uri);
    }
  }

  return(
    <View style={styles.container}>
      <Modal
        animationType= 'fade'
        transparent={true}
        visible={modalVisible}
      >
        <TouchableOpacity 
          style={styles.touchableContainer}
          activeOpacity={1} 
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.mainContainer}>
            <View style={styles.innerContainer}>
              <Pressable onPress={selectGroupPic}>
                <Image source={{uri: groupPic}} style={styles.avatar} />
              </Pressable>
              <TextInput 
                placeholder={"Group Name"}
                style={styles.inputBox}
                value ={groupName}
                onChangeText={setGroupName}
              />
              <Pressable onPress={()=>{console.warn('Clicked Emojies!')}}>
                <Entypo name="emoji-flirt" size={30} color="#37474f" />
              </Pressable>
            </View>
            { !groupName
              ? 
              <Text
              style={styles.saveButton}
              onPress={onPress}
              >Cancel</Text>
              :
              <Text
              style={styles.saveButton}
              onPress={onPressSave}
              >Save</Text>
            }
          </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity onPress={onPress} >
        <MaterialIcons name="group-add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default NewGroupButtonItem;