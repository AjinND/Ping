import * as React from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { useEffect } from "react";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import ChatListItem from "../components/ChatListItem";
import FloatingButtonItem from "../components/FloatingButtonItem";

import { useQuery } from "@apollo/client";
import { QUERY_USER_CHATROOMS } from "../backend-server/src/schema/queries/queries";

export default function ChatScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [chats, setChats] = React.useState();
  const { data, error, loading } = useQuery(QUERY_USER_CHATROOMS);

  useEffect(() => {
    if (error) {
      console.log(error);
      Alert.alert("Something went Wrong! Please reload.");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      const chatrooms: any = [];
      data.chatRooms.map((chatroom: any) => {
        if (chatroom.users.length === 2) {
          chatrooms.push(chatroom);
        }
      });
      setChats(chatrooms);
      //console.log(chatrooms);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={chats}
        renderItem={({ item }) => <ChatListItem chatRoom={item} />}
        keyExtractor={(item) => item.id}
      />
      <FloatingButtonItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
