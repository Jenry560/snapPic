import  { useState } from 'react'
import { Text, View, Image,StyleSheet,TextInput,TouchableOpacity,Alert} from 'react-native';
import { signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../../../config/firebase';

export default function Login({navigation}){

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        title: {
          fontSize: 24,
          marginBottom: 20,
          color: 'white', // Color del texto
        },
        input: {
          width: '80%',
          height: 40,
          borderColor: '#A9A9A9', // Color del borde
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
          color: 'white', // Color del texto de entrada
        },
        button: {
          marginTop: 10,
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
        },
        buttonText: {
          color: 'white',
          textAlign: 'center',
        },
        image:{
          aspectRatio: 1.7,
          height: 200
        }
      });


    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const onHadleLogin = async () => {
      if (email !== "" && password !== "") {
          try {
              const credential = await signInWithEmailAndPassword(auth, email, password);
              if(credential){
                Alert.alert('Usuario inicio de sesion con exito');
              }
             
          } catch (error) {
              console.error('Error al iniciar sesion', error);
              Alert.alert('Error al iniciar sesion', 'Hubo un problema al intentar iniciar sesión. Por favor, inténtalo de nuevo.');
          }
      }
  };
  

    return(
        <View style={styles.container}>
        <Image source={require('../../../assets/snap.png') } style={styles.image} />
        <Text style={styles.title}>Iniciar Sesión</Text>
      
   
        <TextInput
          style={styles.input}
          placeholder="Entrar email"
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
  
        <TextInput
          style={styles.input}
          placeholder="Entrar contraseña"
          secureTextEntry={true}
          autoCapitalize='none'
          autoCorrect={false}
          textContentType='password'
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
  
        <TouchableOpacity style={styles.button} onPress={onHadleLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row',gap: 3,padding: 10}}>
           <Text style={{color: "white", fontSize: 12}}>No tiene un cuenta?</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('SignUp')}}>
                <Text style={{color: "blue", fontSize: 12}}>Crear una cuenta</Text>
            </TouchableOpacity>
        </View>
      </View>
            )
    
}
