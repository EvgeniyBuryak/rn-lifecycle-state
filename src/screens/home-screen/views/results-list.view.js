import React, { useCallback } from 'react';
import { View, Text, StyleSheet, RefreshControl, FlatList } from 'react-native';

const ResultsList = ({ results, refreshing, onRefresh }) => {
    
    const keyExtractor = useCallback(item => item.id.toString(), []);    
    const renderItem = useCallback(({ item }) => {
        return <View>
            <Text style={styles.titleSize}>
                {item.header}
            </Text>
        </View>
    }, []);

    return (
        <View>
            <FlatList
                data={results}
                keyExtractor={keyExtractor}
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
        titleSize: {
        fontSize: 20,
        margin: 5,
    },
});

export { ResultsList };