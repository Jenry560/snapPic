// import { useNavigation } from '@react-navigation/native';
// import react from 'react'

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { auth, database } from "../../../config/firebase";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc", // Color del borde inferior
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Bordes redondeados para la imagen
    marginRight: 20,
  },
  contactName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  mensaje: {
    fontSize: 10,
    color: "blue",
    textAlign: "left",
  },
});

export default function MensajeScreen({ navigation }) {
  const [agregado, setAgregado] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const q = query(
      collection(database, "contacto"),
      where("displayName", "==", auth.currentUser.displayName)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const contactosAgregados = querySnapshot.docs.map(
          (doc) => doc.data().agregado
        );
        setAgregado(contactosAgregados);
        setLoading(false);
      } catch (error) {
        console.error("Error al procesar datos de Firebase:", error);
      }
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {agregado.length > 0 ? (
        <ScrollView style={{ flex: 1 }}>
          {agregado.map((doc) => (
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                navigation.navigate("Chat", {
                  name: doc,
                });
              }}
              key={doc}
            >
              <Image
                source={require("../../../assets/uses.png")} // Reemplaza con la URL real de la imagen del contacto
                style={styles.avatar}
              />
              <View>
                <Text style={styles.contactName}>{doc}</Text>
                <Text style={styles.mensaje}>Nuevo mensaje</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "white" }}>No hay contactos agregados</Text>
        </View>
      )}
    </>
  );
}
