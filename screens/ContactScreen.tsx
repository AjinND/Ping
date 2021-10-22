import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import contacts from '../data/Users'

const MY_CONTACTS= gql `
query listUsers {
  listUsers {
    id
    name
    email
    phoneno
    avatar
    status
  }
}
`;

export default function ContactScreen() {

  const [contacts, setContacts] = useState([]);
  const {data, error, loading} = useQuery(MY_CONTACTS);

  useEffect(() => {
    if(error){
      Alert.alert("Something went Wrong! Please reload.");
    }
  }, [error])

  useEffect(() => {
    if(data){
      //console.log(data.listUsers);
      setContacts(data.listUsers);
    }
  }, [data])

  return (
    <View style={styles.container}>
      <FlatList
        style={{width: '100%'}}
        data={contacts}
        renderItem={ ( {item} )=> <ContactListItem listUsers={item} /> }
        keyExtractor={ (item: any) => item.id } 
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
