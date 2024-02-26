import { StyleSheet, Text} from "react-native";
import Constants from 'expo-constants'


const style = StyleSheet.create({
    text:{
        marginTop: Constants.statusBarHeight,
        padding: 10,
        color: 'white',
        fontSize: 40,
        fontFamily: "Single",
        backgroundColor: 'black',
        flex: 1
    }
})


export default function StyleText({children}){
    return(
        <Text style={style.text}>
            {children}
        </Text>
    )
}