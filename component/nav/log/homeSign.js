import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './log';
import SignUp from './signUp';

const SignStack = createNativeStackNavigator();


export default function HomeSign() {
    return (
     <SignStack.Navigator screenOptions={{headerShown: false}} >
        <SignStack.Screen name="LogIn" component={Login} />
        <SignStack.Screen name="SignUp" component={SignUp}/>
      </SignStack.Navigator>
    );
  }