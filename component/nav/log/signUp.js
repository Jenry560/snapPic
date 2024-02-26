import { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from "../../../config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export default function SignUp({ navigation }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: "white", // Color del texto
    },
    input: {
      width: "80%",
      height: 40,
      borderColor: "#A9A9A9", // Color del borde
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      color: "white", // Color del texto de entrada
    },
    button: {
      marginTop: 10,
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
    image: {
      aspectRatio: 1.7,
      height: 200,
    },
  });

  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDisplayNameUniqueFirestore = async (displayName) => {
    const querySnapshot = await getDocs(
      query(
        collection(database, "users"),
        where("displayName", "==", displayName)
      )
    );

    return querySnapshot.empty;
  };

  const onHandleSignUp = async () => {
    if (email !== "" && password !== "" && usuario !== "") {
      const unique = await isDisplayNameUniqueFirestore(usuario);

      if (unique) {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          await updateProfile(user, { displayName: usuario });

          await addDoc(collection(database, "users"), {
            displayName: usuario,
          });
          Alert.alert("Usuario registrado con éxito");
        } catch (error) {
          Alert.alert("Error al registrar usuario:", error.message);
        }
      } else {
        Alert.alert("Error de usuario ya el nombre esta registrado");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/snap.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Crear usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese un nombre de usuario"
        autoCapitalize="none"
        textContentType="username"
        autoFocus={true}
        value={usuario}
        onChangeText={(text) => setUsuario(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Entrar email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Entrar contraseña"
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="password"
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
        <Text style={styles.buttonText}>Crear usuario</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row", gap: 3, padding: 10 }}>
        <Text style={{ color: "white", fontSize: 12 }}>
          Ya tienes una cuenta?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("LogIn");
          }}
        >
          <Text style={{ color: "blue", fontSize: 12 }}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
