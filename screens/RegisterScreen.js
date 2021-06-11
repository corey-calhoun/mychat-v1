import React, {useState, useLayoutEffect } from 'react'
import { StatusBar } from 'expo-status-bar/build/StatusBar'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');


    useLayoutEffect(() => {
        navigation.setOptions({ 
            headerBackTitle: 'Back to Login',
        });
    }, [navigation])

    const registerUser = () => {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then((authUser) => {
              authUser.user.updateProfile({
                  displayName: name,
                  photoURL: imageUrl || 'https://www.mtsolar.us/wp-content/uploads/2020/04/avatar-placeholder-800x818.png',
              });
          })
          .catch((error) => alert(error.message));
    };


    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style='light' />

            <Text style={styles.welcomeText}>Create a MyChat account!</Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name" 
                    autoFocus 
                    type="text" 
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input 
                    placeholder="Email"
                    type="email" 
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    type="password" 
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={registerUser}
                />
                <Input 
                    placeholder="Image Url  (OPTIONAL)" 
                    type="text" 
                    value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                    onSubmitEditing={registerUser}
                />
                </View>

                <Button 
                    title='Register' 
                    containerStyle={styles.button}
                    raised
                    onPress={registerUser}
                />
                <View style={{height: 100 }}></View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 50,
    },
    inputContainer: {
        width: 300,
    },
    button: {
        marginTop: 8,
        width: 200,
    },

});
