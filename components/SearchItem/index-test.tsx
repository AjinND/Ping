import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styles from './style-test';

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [openSearch,setOpenSearch] = React.useState(false);

  const onChangeSearch = (query: React.SetStateAction<string>) => {
      return setSearchQuery(query);
  };

  return (
    <View style={styles.container}>
      {openSearch
            ?
            <TouchableOpacity 
            style={{
              width:'100%',
              height: '100%',
            }}
            activeOpacity={1} 
            onPress={() => setOpenSearch(false)}
          >
          <Searchbar
            style={styles.searchBox}            
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}  
            autoFocus        
          />
          </TouchableOpacity>
      
      :
      <Pressable onPress={() => setOpenSearch(true)} >
        <Feather name="search" size={24} color="#fff" />
      </Pressable> 
    }         
    </View>
  );
};

export default MyComponent;