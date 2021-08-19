import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, ActivityIndicator, Button } from 'react-native';
import ProgressLoader from './src/components/ProgressLoader';
import Toast, { DURATION } from 'react-native-easy-toast';

// resourse - имя запрашиваемого ресурса
// id - опциональный идентификатор ресурса
async function getVacancy() {

    const axios = require('axios');
    const array = [];

    try {
        const response = await axios.get('https://api.zp.ru/v1/vacancies/?geo_id=826&limit=50'
        );
        
        response.data.vacancies.forEach((vacancy) => {

            const vacancyHeader = vacancy.header;
            const titleCity = vacancy.address.city.title;

            if (!array.includes(vacancyHeader)) {

                array.push(vacancyHeader);
            }
        });
    } catch (error) {
        console.log(error);
    }

    console.log(`In promise: ${Array.isArray(array) }`);
    return array;
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vacancy: [],//new Promise((resolve, reject) => { }),  
            onLoader: true 
        };
    }

    componentDidMount() {
        const promiseArray = getVacancy();

        promiseArray.then(result => {
            console.log(`What this: ${Array.isArray(result)}`);

            if (Array.isArray(result) && result.length) {

                this.setState({
                    vacancy: [this.state.vacancy, ...result],
                    onLoader: false
                });

                this.toast.show('Вакансии успешно загружены', 2000);
            }
        }).catch((error) => {
            this.toast.show('Ошибка загрузки вакансии', 2000)
        });
    }

    componentWillUnmount() {
        this.toast = null;
        console.log("The end!");
    }

    render() {

        console.log("Load Render");
        //console.log(`Render: ${this.state.vacancy}`);
        //console.log(`onLoader in render: ${this.state.onLoader}`);
        //<ProgressLoader onLoader={this.state.isLoader} />
        return (
            <View style={styles.container}>
                <Toast ref={(toast) => this.toast = toast}
                    position='top'
                />
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    animating={this.state.onLoader}
                    hidesWhenStopped={true}
                />
                <Text style={{ fontSize: 22 }}>Вакансии:</Text>
                <FlatList
                    keyExtractor={(item) => item}
                    data={this.state.vacancy}
                    renderItem={({ item }) => {
                        return <View>
                            <Text style={styles.titleSize}>
                                {item}
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
        margin: 5,
    }
});

export default App;