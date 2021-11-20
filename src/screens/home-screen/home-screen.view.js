import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getVacancies } from '../../api/zarplata-ru.api';
import { ResultsList } from '../home-screen/views/results-list.view';
import Toast, {DURATION} from 'react-native-easy-toast';

const HomeScreen = () => {
    const [results, setResults] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const toastRef = useRef(null);

    const getResults = async () => {
        setRefreshing(true);
        
        try {
            const result = await getVacancies();

            setResults(result);            
        } catch (err) {
            toastRef.current.show("Something wrong", 2000);
        } finally {
            setRefreshing(false);
        }        

        /*
        getVacancies().then((res) => setResults(res))
        .then(() => setRefreshing(false))
        .then(() => setToastMessage("Вакансии загружены"))
        .catch((err) => setToastMessage("Something wrong"));
        */
    }

    useEffect(() => {       
        getResults();       
    }, []);

    const handleRefresh = useCallback(()=>{        
        getResults();
    }, []);

    return (
        <View style={styles.container}>
            <Toast ref={toastRef}
                position='top'
            />
            <Text style={styles.headerVacancy}>Вакансии:</Text>
            <ResultsList results={results} refreshing={refreshing} onRefresh={handleRefresh}/>
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
    headerVacancy: { 
        top: 20,
        margin: 15,
        fontSize: 22 
    }
});

export default HomeScreen;