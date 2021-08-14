import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import RNProgressLoader from 'rn-progress-loader';

class ProgressLoader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    componentDidMount() {
        this.timeOut = setTimeout(() => {
            this.setState({
                visible: !this.state.visible
            });
        }, 5000);        
    }

    componentWillUnmoun() {
        clearTimeout(this.timeOut);
    }

    render() {
        return (
            <View style={styles.loader}>
            
            <RNProgressLoader
                visible={this.state.visible}
                isModal={true} isHUD={true}
                hudColor={"#000000"}
                color={"#FFFFFF"}
            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loader: {
        backgroundColor: "#06566e",
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default ProgressLoader;