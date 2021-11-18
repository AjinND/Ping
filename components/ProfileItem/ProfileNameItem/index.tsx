import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './style';

import { gql, useMutation, useQuery } from '@apollo/client';
import { QUERY_CURRENT_USER } from '../../../backend-server/src/schema/queries/queries';
import { UPDATE_USER_MUTATION } from '../../../backend-server/src/schema/mutations/mutations';

export default function ProfileNameItem() {

    const {data, error, loading} = useQuery(QUERY_CURRENT_USER);
    useEffect(() => {
        if(error){
          Alert.alert("Something went Wrong! Please reload.");
        }
    }, [error]);
    
    useEffect(() => {
        if(data){
            setName(data.listCurrentUser.name);
        }
    }, [data]);
    
    const [updateUser] = useMutation(UPDATE_USER_MUTATION, {refetchQueries: [QUERY_CURRENT_USER]});

    const [modalVisible, setModalVisible] = useState(false);
    const [name,setName] = useState();
    const [tvalue,setValue] = useState(name);
    
    {/* *******************************************
    *****Upadate the User Name and Hide Modal******
    **********************************************/}

    const onPress = (tvalue) => {
        //console.log(tvalue);
        setName(tvalue); 
        updateUser({
            variables: {
                updateUserInput: {
                    id: data.listCurrentUser.id,
                    name: tvalue,
                    status: data.listCurrentUser.status,
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
                            placeholder={"Profile Name"}
                            style={styles.inputBox}
                            value ={tvalue}
                            autoFocus
                            keyboardAppearance={'dark'}
                            onChangeText= {setValue}
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
                <FontAwesome5 
                    name="user-alt" 
                    size={24} 
                    color="#263238" 
                    style={styles.iconStyle}
                />
                <View style={styles.nameConatiner}>
                    <Text style={styles.textCaption}>Name</Text>
                    <Text style={styles.textInfo}>{name}</Text>
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
