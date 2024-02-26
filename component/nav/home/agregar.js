import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { auth, database } from "../../../config/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useLayoutEffect, useState } from "react";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // Bordes redondeados para la imagen
    marginRight: 10,
  },
  contactName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  mensaje: {
    fontSize: 10,
    color: "blue",
    textAlign: "center",
  },
  buton: {
    color: "white",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginRight: 4,
  },
  butonAdd: {
    color: "white",
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginRight: 4,
  },
  container_boton: {
    width: "100%",
  },
});

export default function Agregar() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [agregado, setAgregado] = useState([]);

  const revisarAdd = () => {
    const q = query(
      collection(database, "contacto"),
      where("displayName", "==", auth.currentUser.displayName)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setAgregado(querySnapshot.docs.map((doc) => doc.data().agregado));
    });
    return unsubscribe;
  };

  useEffect(() => {
    const q = query(
      collection(database, "users"),
      where("displayName", "!=", auth.currentUser.displayName)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUsuarios(
        querySnapshot.docs.map((doc) => ({
          Nombre: doc.data().displayName,
        }))
      );
      revisarAdd();
      setCargando(false);
    });
    return unsubscribe;
  }, []);

  const addContact = async (contacto) => {
    await addDoc(collection(database, "contacto"), {
      agregado: contacto,
      displayName: auth.currentUser.displayName,
    });

    Alert.alert("Contacto agregado");
    revisarAdd();
  };

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView>
      {usuarios.map((doc) => (
        <View style={styles.container} key={doc.Nombre}>
          <Image
            source={require("../../../assets/uses.png")} // Reemplaza con la URL real de la imagen del contacto
            style={styles.avatar}
          />

          <Text style={styles.contactName}>{doc.Nombre}</Text>
          <view style={styles.container_boton}>
            {agregado.includes(doc.Nombre) ? (
              <TouchableOpacity>
                <Text style={styles.butonAdd}>Agregado</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => addContact(doc.Nombre)}>
                <Text style={styles.buton}>Agregar</Text>
              </TouchableOpacity>
            )}
          </view>
        </View>
      ))}
    </ScrollView>
  );
}
