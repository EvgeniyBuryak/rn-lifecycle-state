import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';
import { getVacancies } from '../../api/zarplata-ru.api';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const App = () => {
    const [sendRequest, errorMessage, results] = getVacancies();
    const [refreshing, setRefreshing] = useState(false);
    const toastRef = useRef(null);
    
    //App._toast = undefined; // вспомнить можно ли при стрелочной функции такое?
    // почитать про useRef -> может стоить заменить App._toast

    const onRefresh = useCallback(()=>{
        setRefreshing(true);
        wait(2000).then(()=> setRefreshing(false));
    }, []);
    
    const keyExtractor = useCallback(item => item.id.toString(), []);
    
    const renderItem = useCallback(({ item }) => {
        return <View>
            <Text style={styles.titleSize}>
                {item.header}
            </Text>
        </View>
    }, []);

    useEffect(() => {
        //getResults();
        //getVacancies();
        sendRequest();      
        toastRef.current.show(errorMessage, 2000);
    }, [errorMessage]);
    
    return (
        <View style={styles.container}>            
            <Toast ref={toastRef}
                position='top'
            />            
            <Text style={{ fontSize: 22 }}>Вакансии:</Text>
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
    }
});

export default App;