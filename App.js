//import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, ActivityIndicator, Button } from 'react-native';
//import ProgressLoader from './src/components/ProgressLoader';   
import Toast, { DURATION } from 'react-native-easy-toast';
import zpRu from './src/api/zarplataRu';

const App = () => {
    //const [vacancy, setVacancy] = useState([]);
    const [onLoader, setOnLoader] = useState(true);

    const [results, setResults] = useState([]);
    const vacancyApi = async () => {
        setOnLoader(true);

        try {
            const response = await zpRu.get('/', {
                params: {
                    limit: 5,
                    geo_id: 826
                }
            });

            const vacancies = response.data.vacancies;

            vacancies.forEach((vacancy) => {
                //if (vacancy.header
                    setResults([vacancy.header, ...results]);
            });

            _toast.show('Вакансии успешно загружены', 2000);

        } catch (error) {
            _toast.show('Ошибка загрузки вакансии', 2000);
        } finally {
            setOnLoader(false);
        }        
    }

    useEffect(() => {
        // Hook useEffect постоянно обновляется
        /*vacancyApi();
        return () => {
            setResults([]);
        };*/
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
                keyExtractor={(item) => item}
                data={results}
                renderItem={({ item }) => {
                    return <View>
                        <Text style={styles.titleSize}>
                            {item}
                        </Text>
                    </View>
                }}
            />            
        </View>
    );
};

//<StatusBar style="auto" />

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