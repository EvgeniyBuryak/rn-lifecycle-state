import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, ActivityIndicator, Button } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import useResults from './src/hooks/useResults';

global._toast = '';

const App = () => {    
    const [vacancyApi, results, onLoader, errorMessage] = useResults();

    useEffect(() => {
        console.log(results);
        _toast.show(errorMessage, 2000);
    });    

    return (
        <View style={styles.container}>
            <Button title={'Press me'} onPress={vacancyApi} />
            <Toast ref={(toast) => _toast = toast}
                position='top'
            />
            <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={onLoader}
                hidesWhenStopped={true}
            />
            <Text style={{ fontSize: 22 }}>Вакансии:</Text>
            <FlatList
                keyExtractor={(item) => item.id}
                data={results}
                renderItem={({ item }) => {
                    return <View>
                        <Text style={styles.titleSize}>
                            {item.header}
                        </Text>
                    </View>
                }}
            />            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    titleSize: {
        fontSize: 20,
        margin: 5,
    }
});

export default App;