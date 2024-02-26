import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Home from "./nav/home/home";
import React, { useState, createContext, useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import HomeSign from "./nav/log/homeSign";
import { auth } from "../config/firebase";

const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        try {
          authenticatedUser ? setUser(authenticatedUser) : setUser(null);
          setIsLoading(false);
        } catch (error) {
          console.error(
            "Error al procesar el cambio de estado de autenticación:",
            error
          );
        }
      }
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <NavigationContainer theme={DarkTheme}>
      {user ? <Home /> : <HomeSign />}
    </NavigationContainer>
  );
}

export default function Main() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
