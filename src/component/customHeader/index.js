import React, { PureComponent } from 'react';
import {
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class CustomHeader extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                    {/* <TouchableHighlight></TouchableHighlight> */}
                </View>
                <View style={styles.center}></View>
                <View style={styles.right}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 25,
        width: Dimensions.get('window').width,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    left: {
        height: 25,
        width: 100,
    },
    right: {
        height: 25,
        width: 100
    },
    center: {
        flex: 1
    }
});