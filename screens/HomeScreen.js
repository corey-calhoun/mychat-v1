import React, { useLayoutEffect, useState, useEffect } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

    const [chats, setChats] = useState([]);

    const logout = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) => (
            setChats(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        ))
    })

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'MyChat',
            headerStyle: { backgroundColor: "#fff"},
            headerTitleStyle: { color: "#000"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={logout}>
                        <Text onPress={logout}>Logout</Text>
                    </TouchableOpacity>
                    
                </View>
            ),
            headerRight: () => (
                <View style={{ 
                    marginRight: 20,
                    flexDirection: 'row',
                    width: 70,
                    justifyContent: 'space-between'
                }}
                >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name='camerao' size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('NewChat')}>
                        <SimpleLineIcons name='pencil' size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation])



    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id, 
            chatName,
        })
    }

    return (
        <SafeAreaView>
            
            <ScrollView style={styles.container}>
                 {chats.map(({ id, data: {chatName} }) => (
                     <CustomListItem 
                        key={id}
                        id={id}
                        chatName={chatName}
                        enterChat={enterChat}
                     />
                 ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%'
    }
})
