import { Text, View, Image, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "../../../config/firebase";
import { StyleSheet } from "react-native";
import { signOut } from "firebase/auth";

const style = StyleSheet.create({
  imagen: {
    width: 150,
    height: 150,
  },
  nombre: {
    fontSize: 30,
    color: "white",
  },
  correo: {
    fontSize: 15,
    color: "white",
  },
  button: {
    marginTop: 20,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontSize: 10,
  },
});
function MyUsuario() {
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={style.imagen}
        source={require("../../../assets/uses.png")}
      />
      <Text style={style.nombre}>{auth?.currentUser.displayName}</Text>
      <Text style={style.correo}>Correo: {auth.currentUser.email} </Text>

      <TouchableOpacity style={style.button} onPress={onSignOut}>
        <Text style={style.buttonText}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function UsuarioScreen() {
  const UserStack = createNativeStackNavigator();
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="MyUsuario" component={MyUsuario} />
    </UserStack.Navigator>
  );
}
