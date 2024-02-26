import React, { useState, useLayoutEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { auth, database } from "../../../config/firebase";

export default function ChatScreen({ route }) {
  const { name } = route.params;
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(
      collectionRef,
      where("user._id", "in", [auth?.currentUser?.displayName, name]),
      where("user.enviado", "in", [auth?.currentUser?.displayName, name]),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.displayName,
        enviado: name,
        avatar:
          "https://www.softzone.es/app/uploads/2018/04/guest.png?x=480&quality=40",
      }}
    />
  );
}
