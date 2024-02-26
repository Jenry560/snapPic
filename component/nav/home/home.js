import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "./homeMensaje";
import UsuarioScreen from "./usuarioScreen";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Mensaje") {
            iconName = focused ? "ios-send" : "ios-send-sharp";
          } else if (route.name === "Usuario") {
            iconName = focused
              ? "ios-person-circle"
              : "ios-person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Mensaje" component={HomeScreen} />
      <Tab.Screen name="Usuario" component={UsuarioScreen} />
    </Tab.Navigator>
  );
}
