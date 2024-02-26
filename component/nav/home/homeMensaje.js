import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MensajeScreen from "./mensaje";
import ChatScreen from "./chat";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Agregar from "./agregar";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeStack = createNativeStackNavigator();

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <HomeStack.Navigator>
      <HomeStack.Group>
        <HomeStack.Screen
          name="Mensajes"
          component={MensajeScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Agregar contacto")}
              >
                <Ionicons
                  name="person-add"
                  size={20}
                  color="white"
                  style={{ paddingRight: 10 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <HomeStack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{ presentation: "modal" }}>
        <HomeStack.Screen name="Agregar contacto" component={Agregar} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}
