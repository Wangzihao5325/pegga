import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

export default class CountrySelect extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>已有账号? <Text style={styles.loginText} onPress={this.loginTextPress}>登陆</Text></Text>
            </View>
        );
    }

    loginTextPress = () => {
        if (typeof this.props.pressCallback == 'function') {
            this.props.pressCallback();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: 19,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35
    },
    text: {
        fontFamily: 'PingFang-SC-Regular',
        fontSize: 15,
        color: 'rgb(179,179,179)',
        marginLeft: 20,
    },
    loginText: {
        color: 'rgb(64,99,213)'
    }
});