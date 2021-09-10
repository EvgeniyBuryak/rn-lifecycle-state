import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Button, RefreshControl, ScrollView, SafeAreaView } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import request from '../../api/zarplata-ru.api';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// useResults исчезнет -> перенести в HomeScreen (сделано)
const App = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    App._toast = undefined; // вспомнить можно ли при стрелочной функции такое?
    // почитать про useRef -> может стоить заменить App._toast

    const vacancyApi = async () => {

        try {
            // перенести в апи параметры запроса (сделано)
            const response = await request.get('/');

            setResults(response.data.vacancies);

            setErrorMessage('Вакансии успешно загружены');

        } catch (error) {
            setErrorMessage('Ошибка загрузки вакансии');
        } finally {
            //setOnLoader(false);
        }
    }

    const onRefresh = useCallback(()=>{
        setRefreshing(true);
        wait(2000).then(()=> setRefreshing(false));
    }, []);

    useEffect(() => { // (done)
        vacancyApi();
        //if (!onLoader) {
            App._toast.show(errorMessage, 2000);
        //}
    }, [errorMessage]);

    /**
     * <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={onLoader}
                hidesWhenStopped={true}
            />
     * 
     */
    
    //<Button title={'Press me'} onPress={vacancyApi} />

    // pull to refresh
    /**  FlatList - свойство onRefresh тянем и обновляем
     * параметр котрый нужно передать refreshing 
     * (done)
     */

    // hook useCallback для keyExtractor(вынести в отдельную функцию) - 
    // useCallback чтобы функция не пересоздавалась 
    // renderItem туда же в useCallback отдельной функцией
    /**
     * <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
        </ScrollView>
     */
    //console.log(Array.from(results));// results.reduce(console.log));
    return (
        <View style={styles.container}>            
            <Toast ref={(toast) => App._toast = toast}
                position='top'
            />            
            <Text style={{ fontSize: 22 }}>Вакансии:</Text>
            <FlatList
                keyExtractor={(item) => item}
                data={results}
                renderItem={({ item }) => {
                    return <View>
                        <Text style={styles.titleSize}>
                            {item.header}
                        </Text>
                    </View>
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
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