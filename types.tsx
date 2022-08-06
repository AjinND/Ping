/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Home: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Signup: undefined;
  Signin: undefined;
  Splash: undefined;
  ChatRoom: { id: string; name: string; image: string };
  Contact: undefined;
  Profile: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type User = {
  id: string;
  name: string;
  imageUri: string;
  status: string;
};

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  //user: User;
  user: { id: string; name: string }; // the chats has only id and name in the message section
};

export type ChatRoom = {
  id: string;
  users: User[];
  lastMessage: Message;
};
