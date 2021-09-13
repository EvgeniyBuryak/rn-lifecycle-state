import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';

class ViewToast extends Component { // компоненты через классы

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: props.message,
            //toast: undefined
        }
    }

    componentDidMount() {
        this.toast.show(this.state.errorMessage, 2000);
        this.toast.show('Hello World!', 2000);
        
    }

    render() {
        
        return (
            <View>
                <Text ref={(toast) => this.toast = toast} />
            </View>
        )
    }
}

export default ViewToast;