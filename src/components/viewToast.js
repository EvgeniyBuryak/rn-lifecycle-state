import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';

class ViewToast extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMessage: props.message
        }
    }

    componentDidMount() {
        //this.toast.show(this.state.errorMessage, 2000);
        //this.toast.show('Hello World!', 2000);
        
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