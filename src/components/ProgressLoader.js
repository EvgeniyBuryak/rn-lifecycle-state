import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RNProgressLoader from 'rn-progress-loader';

let isVisible, setVisible = null;

const componentDidMount = () => {
    [isVisible, setVisible] = useState(false);
    console.log(isVisible);
    setInterval(() => {
        setVisible(true);
    }, 5000);
};

const ProgressLoader = () => {
    console.log(isVisible);
    return <View style={styles.loader}>
        <RNProgressLoader
            visible={isVisible}
            isModal={true} isHUD={true}
            hudColor={"#000000"}
            color={"#FFFFFF"}
        />
    </View>
};

const styles = StyleSheet.create({
    loader: {
        backgroundColor: "#06566e",
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
});

export default ProgressLoader;