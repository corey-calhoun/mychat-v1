import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../firebase';
import firebase from 'firebase'

const Add = ({ navigation }) => {

    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new chat',
            headerBackTitle: 'Chats',
        })
    }, [navigation]);
    
    const createChat = async() => {
        await db.collection('chats').add({
            chatName: input,
            createdAt : firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
            navigation.goBack();
        })
        .catch(error => alert(error));
    };

    return (
        <View style={styles.container}>
            <Input 
            placeholder="Enter a chat name" 
            value={input} 
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={createChat}
            leftIcon={
                <Icon 
                    name="wechat"
                    type="antdesign"
                    size={24}
                    color="#000"
                />
            }
            />
            <Button 
                onPress={createChat}
                title='Create a new chat'
            />
        </View>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        height: '100%',
    }
})
