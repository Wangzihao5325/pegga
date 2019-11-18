import React, { PureComponent } from 'react';
import { View, TouchableHighlight, Image, Text, Dimensions, StyleSheet } from 'react-native';

export default class FunTabs extends PureComponent {
    render() {
        return (
            <View style={styles.bottomBtnContainer}>
                <TouchableHighlight style={styles.btn} onPress={this.trans} underlayColor='transparent'>
                    <View style={styles.btn}>
                        <Image style={styles.icon} source={require('../../image/assets/trans.png')} />
                        <Text style={styles.btnTitle}>转账</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator} />
                <TouchableHighlight style={styles.btn} onPress={this.receive} underlayColor='transparent'>
                    <View style={styles.btn}>
                        <Image style={styles.icon} source={require('../../image/assets/receivables.png')} />
                        <Text style={styles.btnTitle}>收款</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    trans = () => {
        if (typeof this.props.trans == 'function') {
            this.props.trans()
        }
    }

    receive = () => {
        if (typeof this.props.receive == 'function') {
            this.props.receive()
        }
    }
}

const styles = StyleSheet.create({
    bottomBtnContainer: {
        height: 90,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    separator: {
        height: 30,
        width: StyleSheet.hairlineWidth,
        backgroundColor: '#E5F0FD'
    },
    icon: {
        height: 30,
        width: 30
    },
    btnTitle: {
        color: 'rgb(40,46,60)',
        fontSize: 15,
        fontFamily: 'PingFang-SC-Regular',
        marginTop: 10
    }
});