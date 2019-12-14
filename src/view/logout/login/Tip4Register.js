import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import I18n from '../../../global/doc/i18n';

export default class CountrySelect extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{`${I18n.DO_NOT_HAVE_ACCOUNT}`}<Text style={styles.registerText} onPress={this.registerTextPress}>{`${I18n.REGISTER}`}</Text></Text>
            </View>
        );
    }

    registerTextPress = () => {
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
    registerText: {
        color: 'rgb(64,99,213)'
    }
});