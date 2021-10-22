import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import ChatListItem from '../components/ChatListItem';
import chatRoom from '../data/ChatRooms'
import FloatingButtonItem from '../components/FloatingButtonItem';

export default function ChatScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={chatRoom}
        renderItem={ ( {item} )=> <ChatListItem chatRoom={item} /> }
        keyExtractor={ (item) => item.id } 
      />
      <FloatingButtonItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
