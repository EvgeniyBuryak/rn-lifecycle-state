import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Button } from 'react-native';
import useResults from './src/hooks/useResults';
//import ViewToast from './src/components/viewToast'; 
import Toast, { DURATION } from 'react-native-easy-toast';

const App = function () {    
    const [vacancyApi, results, onLoader, errorMessage] = useResults();

    App._toast = '';

    useEffect(() => {
        if (!onLoader) {
            _toast.show(errorMessage, 2000);
        }
    });//, [errorMessage]);

    //<Button title={'Press me'} onPress={vacancyApi} />

    return (
        <View style={styles.container}>
            
            <Toast ref={(toast) => _toast = toast}
                position = 'top'
            />    
            <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={onLoader}
                hidesWhenStopped={true}
            />
            <Text style={{ fontSize: 22 }}>Вакансии:</Text>
            <FlatList
                keyExtractor={(item) => item.id.toString()}
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