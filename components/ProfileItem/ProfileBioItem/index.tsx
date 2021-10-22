import { gql, useMutation, useQuery } from '@apollo/client';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';

const CURRENT_USER = gql`
query listCurrentUser {
    listCurrentUser {
      id
      name
      status
      avatar
    }
}`
;

const UPDATE_USER = gql`
mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(input: $updateUserInput) {
      name
      avatar
      status
      id
    }
}
`;

export default function ProfileBioItem() {

    const {data, error, loading} = useQuery(CURRENT_USER);
    useEffect(() => {
        if(error){
          Alert.alert("Something went Wrong! Please reload.");
        }
    }, [error]);
    
    useEffect(() => {
        if(data){
            setBio(data.listCurrentUser.status);
        }
    }, [data]);

    console.log(data);

    const [updateUser] = useMutation(UPDATE_USER, {refetchQueries: [CURRENT_USER]});

    const [modalVisible, setModalVisible] = useState(false);
    const [bio,setBio] = useState();
    const [tvalue,setValue] = useState(bio);

    {/* *******************************************
    *****Upadate the User Name and Hide Modal******
    **********************************************/}

    const onPress = (tvalue) => {
        setBio(tvalue);
        updateUser({
            variables: {
                updateUserInput: {
                    id: data.listCurrentUser.id,
                    name: data.listCurrentUser.name,
                    status: tvalue,
                    avatar: data.listCurrentUser.avatar,
                }
            }
        })
        setModalVisible(!modalVisible);
    }

    return(
        <View>
    {/* *******************************************
    ******Displays the Modal to Edit Username******
    **********************************************/}
            <Modal
            animationType= 'slide'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
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
                    <View style={styles.modalContainer}>
                        <TextInput 
                            multiline
                            placeholder={"Say Something About You!"}
                            style={styles.inputBox}
                            value ={tvalue}
                            autoFocus
                            keyboardAppearance={'dark'}
                            onChangeText={setValue}
                        />
                        <TouchableOpacity
                            onPress={()=>{onPress(tvalue)}}
                            style={[
                                styles.buttonContainer,
                                {
                                    backgroundColor: tvalue ? '#81d4fa' : '#b2ebf2',
                                }
                            ]}
                        >
                            <View>
                                <Entypo name="check" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>      
                </TouchableOpacity>
            </Modal>
    
    {/* *******************************************
    **********Pressable User Name Section**********
    **********************************************/}
            <Pressable 
                onPress={()=>setModalVisible(true)}
                style={styles.infoConatiner}
            >
                <AntDesign 
                        name="infocirlce" 
                        size={24} 
                        color="#263238" 
                        style={styles.iconStyle}
                    />
                    <View style={styles.nameConatiner}>
                        <Text style={styles.textCaption}>Bio</Text>
                        <Text 
                            style={styles.textInfo}  
                            numberOfLines={5}
                        >
                            {bio}
                        </Text>            
                    </View>
                    <Entypo 
                        name="edit" 
                        size={24} 
                        color="#263238" 
                        style={styles.iconStyle} 
                    />
            </Pressable>
        </View>
    );
}
