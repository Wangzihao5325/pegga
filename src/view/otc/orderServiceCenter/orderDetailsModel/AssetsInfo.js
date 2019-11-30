import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, Dimensions, StyleSheet } from 'react-native';

import Utils from '../../../../global/util';

export default class AssetsInfo extends PureComponent {
    render() {
        let { stateText, stateTextStyle } = Utils.mapValue2Str.orderStateTextWithStyle(this.props.payState, 18);
        return (
            <View style={styles.container}>
                <View style={[styles.wrapper, { flexDirection: 'row' }]}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={styles.title}>交易金额</Text>
                        <Text style={{ marginTop: 10, fontFamily: 'PingFang-SC-medium', fontWeight: 'bold', fontSize: 18, color: 'rgb(40,46,60)' }}>{`${this.props.legalAmount} ${this.props.fiat}`}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end' }}>
                        <Text style={styles.title}>订单号 <Text style={{ color: 'rgb(40,46,60)' }}>{`${this.props.orderNo}`}</Text></Text>
                        <Text style={[stateTextStyle, { marginTop: 10 }]}>{`${stateText}`}</Text>
                    </View>
                </View>
                <View style={styles.separate} />
                <View style={styles.wrapper}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.title}>交易价格</Text>
                        <Text style={styles.context}>{`${this.props.price} ${this.props.fiat}`}</Text>
                    </View>
                    <View style={{ marginBottom:4,flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.title}>交易数量</Text>
                        <Text style={styles.context}>{`${this.props.amount} ${this.props.token}`}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 161,
        width: Dimensions.get('window').width,
        marginTop: 10,
        backgroundColor: 'white'
    },
    separate: {
        height: 1,
        width: Dimensions.get('window').width,
        backgroundColor: '#EDEDED'
    },
    wrapper: {
        flex: 1,
        paddingHorizontal: 15
    },
    title: {
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(133,133,133)',
        fontSize: 13
    },
    context: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(40,46,60)'
    }
});