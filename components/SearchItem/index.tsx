import { EvilIcons, Feather, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, TextInput, TouchableOpacity, View } from "react-native";
import styles from './style'

const SearchItem = () => {
    const [searchItem,setSearchItem] = useState('');
    const [openSearch,setOpenSearch] = useState(false);

    const onSearchClosed=()=>{
        console.warn('Search Closed');
        setOpenSearch(false);
    }

    const onSearchPress=()=>{
        console.warn(`Searching: ${searchItem}`);
        setSearchItem('');
    }

    const onPress=()=>{
        if(!searchItem){
            onSearchClosed();
        }else{
            onSearchPress();
        }
    }
    
    return(
        <View style={styles.container}>
            {openSearch
            ?
                <View style={styles.mainContainer}>
                    <TextInput 
                        placeholder={"Search"}
                        style={styles.searchBox}
                        value ={searchItem}
                        onChangeText={setSearchItem}
                        autoFocus
                    />
                    
                    <View style={styles.rightContainer}>
                        {
                            !searchItem
                            ?
                            <TouchableOpacity
                            onPress={onPress}
                            style={styles.buttonContainer}
                            >
                                <MaterialIcons name="cancel" size={24} color="#263238"/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                            onPress={onPress}
                            style={styles.buttonContainer}
                            >
                                <EvilIcons name="search" size={28} color="black" />
                            </TouchableOpacity>
                        }
                    </View>
                </View> 
            :
                <Pressable onPress={() => setOpenSearch(true)} >
                    <Feather name="search" size={24} color="#fff" />
                </Pressable>  
            }
        </View>
    )
};

export default SearchItem;;