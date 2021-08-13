import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';

const NewVacancy = (props) => {
    return (
        <View>
            <Text>{props.title}</Text>
        </View>
    );
};

const App = () => {
    const [text, setText] = useState(' ');
    const [vacancy, setVacancy] = useState([]);

    return (
        <View style={styles.container}>
            <Text>Введите новую вакансию:</Text>
            <TextInput
                style={styles.input}
                placeholder="enter the new vacancy"
                onChangeText={setText}
                defaultValue={text}

                onSubmitEditing={() => {
                    // Такая вакансия уже существует?
                    const isExist = vacancy.find(e => e == text);

                    // Если нет, записываем
                    if (!isExist)
                        setVacancy([...vacancy, text]);

                    console.log(vacancy);
                }}
            />
            <Text>Список вакансий:</Text>
            <FlatList
                keyExtractor={(item) => item}
                data={vacancy}
                renderItem={({ item }) => {
                    // item === string
                    return <View>
                        <Text>Вакансия: {item}</Text>
                    </View>
                }}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
    }
});

export default App;