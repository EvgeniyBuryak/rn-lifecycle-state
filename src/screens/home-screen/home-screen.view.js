import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import { getVacancies } from '../../api/zarplata-ru.api';

const HomeScreen = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([]);    
    const [refreshing, setRefreshing] = useState(false);
    const toastRef = useRef(null);

    //App._toast = undefined; // вспомнить можно ли при стрелочной функции такое?
    // почитать про useRef -> может стоить заменить App._toast

    const onRefresh = useCallback(()=>{
        
        getResults();
        
        // вместо того чтобы ждать, нужно обновить запрос к апи
        // setRefreshing можно в гет
        // а можно все как через .then
        //wait(2000).then(()=> setRefreshing(false));
        //setRefreshing(false);
        // повторить promise.then и async их отличия
    }, []);
    
    const keyExtractor = useCallback(item => item.id.toString(), []);
    
    const renderItem = useCallback(({ item }) => {
        return <View>
            <Text style={styles.titleSize}>
                {item.header}
            </Text>
        </View>
    }, []);

    const getResults = () => {
        setRefreshing(true);

        let promise = new Promise((resolve, reject) => {
                const response = getVacancies();

                resolve(response);
                reject(new Error("Ошибка"));
            });
            
            promise.then((res) => setResults(res))
            .then(() => setRefreshing(false))
            .then(() => setErrorMessage("Вакансии загружены"))
            .catch((err) => setErrorMessage("Something wrong"));
        /*
        try {
            const result = await getVacancies();
            setResults(result);
            setRefreshing(false);
            setErrorMessage("Вакансии загружены");
        } catch (err) {
            setErrorMessage("Something wrong");
        } */
    }

    useEffect(() => {
        
        getResults();

        toastRef.current.show(errorMessage, 2000);
    }, [errorMessage]);
    
    return (
        <View style={styles.container}>            
            <Toast ref={toastRef}
                position='top'
            />
            <Text style={styles.headerVacancy}>Вакансии:</Text>
            <FlatList
                keyExtractor={keyExtractor}
                data={results}
                renderItem={renderItem}
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
    },
    headerVacancy: { 
        fontSize: 22 
    }
});

export default HomeScreen;