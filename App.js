import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, ActivityIndicator } from 'react-native';
import ProgressLoader from './src/components/ProgressLoader';

// resourse - имя запрашиваемого ресурса
// id - опциональный идентификатор ресурса
async function getVacancy() {

    const axios = require('axios');
    const array = [];

    try {
        const response = await axios.get('https://api.zp.ru/v1/vacancies/?geo_id=826&limit=10'
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
            vacancy: new Promise((resolve, reject) => { }),
            //loader: true 
        };
    }

    componentDidMount() {
        const promiseArray = getVacancy();

        promiseArray.then(result => {
            console.log(`What this: ${Array.isArray(result)}`);

            if (Array.isArray(result) && result.length) {
                this.setState({
                    vacancy: result,
                });
            }
        });
    }

    componentWillUnmount() {
        this.arrVacancies = null;
    }

    render() {

        //console.log(`Render: ${typeof this.state.vacancy}`);

        return (
            <View style={styles.container}>
                
                <Text style={{ fontSize: 22 }}>Вакансий:</Text>
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