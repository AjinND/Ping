import { gql, useQuery, useMutation } from '@apollo/client';
import { FontAwesome5, Foundation } from '@expo/vector-icons';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, Text, View } from 'react-native';
import ProfileBioItem from './ProfileBioItem';
import ProfileNameItem from './ProfileNameItem';
import styles from './style';
import * as ImagePicker from 'expo-image-picker';

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
export default function ProfileItem() {

    const default_image = require('../../assets/images/BG.png');
    const [avatar,setAvatar] = useState('');
    const [user_id,setUser_id] = useState();

    const {data, error, loading} = useQuery(CURRENT_USER);
    useEffect(() => {
        if(error){
          Alert.alert("Something went Wrong! Please reload.");
        }
    }, [error]);
    useEffect(() => {
        if(data){
            setUser_id(data.listCurrentUser.id);
        }
    }, [data]);

    // const [updateUser] = useMutation(UPDATE_USER, {refetchQueries: [CURRENT_USER]});

    const selectProfilePic= async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [2, 3],
          quality: 1,
        });
        //console.log(result);
        if (!result.cancelled) {
          setAvatar(result.uri);
        }
    }

    // useEffect(() => {
    //     updateUser({
    //         variables: {
    //             updateUserInput: {
    //                 id: data.listCurrentUser.id,
    //                 name: data.listCurrentUser.name,
    //                 status: data.listCurrentUser.status,
    //                 avatar: avatar,
    //             }
    //         }
    //     })
    // }, [avatar]);

    return (
        <View style={styles.container}>
    {/* *******************************************
    *Displays the User Profile picture if Provided*
    **********************************************/}
            <View style={styles.imageContainer}>
                <Image 
                    source ={{uri: avatar}}
                    style={styles.avatar}
                />
                <Pressable onPress={selectProfilePic} style={styles.editImageContainer}>
                    <FontAwesome5 name="camera-retro" size={26} color="#263238" />
                </Pressable>
            </View>
            {/* <View style={styles.borderContainer}></View> */}
            <View style={styles.mainContainer}>
    {/* *******************************************
    ******Displays the User Name if Provided*******
    **********************************************/}
                <ProfileNameItem />
    {/* *******************************************
    *********Displays the Bio if Provided**********
    **********************************************/}
                <ProfileBioItem />
    {/* *******************************************
    ******Displays the User's Contact Number*******
    **********************************************/}
                <View style={styles.infoConatiner}>
                    <Foundation 
                        name="telephone" 
                        size={34} 
                        color="#263238" 
                        style={styles.iconStyle}
                    />
                    <View style={styles.nameConatiner}>
                        <Text style={styles.textCaption}>Phone</Text>
                        <Text style={styles.textInfo}>9545954512</Text>
                    </View>
                </View>
            </View>
    {/* *******************************************
    *Displays the Company Name at Bottom of Screen*
    **********************************************/}
            <Text style={styles.companyName}>Ping</Text>
        </View>
    );
}

