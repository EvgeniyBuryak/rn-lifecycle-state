import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import { getVacancies } from '../../api/zarplata-ru.api';

const HomeScreen = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [results, setResults] = useState([]);    
    const [refreshing, setRefreshing] = useState(false);
    const toastRef = useRef(null);

    const getResults = () => {
        setRefreshing(true);
        
        getVacancies().then((res) => setResults(res))
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

    const handleRefresh = useCallback(()=>{        
        getResults();
    }, []);
    
    const keyExtractor = useCallback(item => item.id.toString(), []);    
    const renderItem = useCallback(({ item }) => {
        return <View>
            <Text style={styles.titleSize}>
                {item.header}
            </Text>
        </View>
    }, []);
    
    return (
        <View style={styles.container}>            
            <Toast ref={toastRef}
                position='top'
            />
            <Text style={styles.headerVacancy}>Вакансии:</Text>
            <FlatList
                data={results}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
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