import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native';

export default class Separator extends PureComponent {
    render() {
        return (
            <View style={styles.container} />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 10,
        width: Dimensions.get('window').width,
        backgroundColor: '#F1F3F7'
    }
});