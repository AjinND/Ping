import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CallListItem from '../components/CallListItem';
import { View } from '../components/Themed';

import chatRoom from '../data/ChatRooms'

export default function CallScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={chatRoom}
        renderItem={ ( {item} )=> <CallListItem chatRoom={item} /> }
        keyExtractor={ (item) => item.id } 
      />
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
