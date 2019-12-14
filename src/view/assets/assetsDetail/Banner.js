import React, { PureComponent } from 'react';
import { ImageBackground, Text, Dimensions, StyleSheet } from 'react-native';
import I18n from '../../../global/doc/i18n';

export default class Banner extends PureComponent {
    render() {
        return (
            <ImageBackground style={styles.contaner} source={require('../../../image/assets/assets_details_banner_bg.png')}>
                <Text style={styles.totalText}>{I18n.ASSETS_ALL_ASSETS}</Text>
                <Text style={styles.totalNumText}>{this.props.assets}</Text>
                <Text style={styles.frozenText}>{I18n.ASSETS_FROZEN_ASSETS}</Text>
                <Text style={styles.frozenNum}>{this.props.frozen}</Text>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    contaner: {
        height: (Dimensions.get('window').width - 30) / 690 * 270,
        width: Dimensions.get('window').width - 30,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F2F2F2',
        borderRadius: 10,
        marginTop: 10
    },
    totalText: {
        marginTop: 10,
        fontSize: 15,
        color: 'rgb(133,133,133)',
        fontFamily: 'PingFang-sc-Regular',
        marginLeft: 15
    },
    totalNumText: {
        marginTop: 5,
        marginLeft: 15,
        fontSize: 30,
        //fontFamily: 'DIN',
        color: 'rgb(40,46,60)'
    },
    frozenText: {
        marginTop: 10,
        fontSize: 12,
        color: 'rgb(133,133,133)',
        fontFamily: 'PingFang-sc-Medium',
        marginLeft: 15
    },
    frozenNum: {
        marginTop: 5,
        fontSize: 17,
        color: 'rgb(40,46,60)',
        //fontFamily: 'DIN',
        marginLeft: 15
    }
});
