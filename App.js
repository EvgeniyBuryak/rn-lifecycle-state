import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, ActivityIndicator } from 'react-native';
import ProgressLoader from './src/components/ProgressLoader';

const listVacancies = ["Водитель", "Пожарный", "Швея", "Подорожник"];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacancy: []
        };
    }

    componentDidMount() {
        this.setState({
            vacancy: [...listVacancies, "Разработчик"]
        });
    }

    render() {
    return (
    <View style={styles.container}>
        <ProgressLoader />
            <Text style={{fontSize: 22}}>Список вакансий:</Text>
        <FlatList
        keyExtractor={(item) => item}
        data={this.state.vacancy}
        renderItem={({ item }) => {
        return <View>
            <Text
                style={styles.titleSize}>Вакансия: {item}
            </Text>
            </View>
        }}
        />
        <StatusBar style="auto" />
    </View>
    )
    }
}

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
    }
});

export default App;