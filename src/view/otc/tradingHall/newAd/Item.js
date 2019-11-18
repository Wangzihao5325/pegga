import React, { PureComponent, useState } from 'react';
import { View, Image, Text, TouchableHighlight, TextInput, Dimensions, StyleSheet } from 'react-native';

function Btn(props) {
    return (
        <View style={[styles.container, props.bottomLine ? styles.borderBottm : null]}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableHighlight style={{ flex: 1 }} underlayColor='transparent' onPress={props.callback}>
                <View style={styles.context} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {props.source && <Image style={{ height: 15, width: 15 }} source={props.source} />}
                        <Text style={styles.contextText}>{props.contextText}</Text>
                        <Image style={{ height: 15, width: 15 }} source={require('../../../../image/arrow/arrow_right.png')} />
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}

function Input(props) {
    return (
        <View style={[styles.container, props.bottomLine ? styles.borderBottm : null]}>
            <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
            <View style={[styles.context, props.contextStyle]} >
                <TextInput secureTextEntry={props.secureTextEntry} style={[{ flex: 1, marginHorizontal: 10, textAlign: 'right' }, props.inputStyle]} placeholder={props.placeholder} value={props.value} onChangeText={(value) => props.callback(value)} editable={props.editable} />
                {typeof props.unit == 'string' && <Text style={styles.unit} >{`| ${props.unit}`}</Text>}
            </View>
        </View>
    );
}

function SelectItemBtn(props) {
    let path = require('../../../../image/otc/unSelect.png');
    if (props.isSelect) {
        path = require('../../../../image/otc/select.png');
    }
    return (
        <TouchableHighlight onPress={props.callback} underlayColor='transparent'>
            <View style={{ height: 30, width: 70, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 15, width: 15 }} source={path} />
                <Text style={{ marginLeft: 5, fontSize: 15, color: 'rgb(51,51,51)', fontFamily: 'PingFang-SC-Medium' }}>{props.title}</Text>
            </View>
        </TouchableHighlight>
    )
}

function Select(props) {
    const itemPress = (index) => {
        if (typeof props.callback == 'function') {
            props.callback(index);
        }
    }
    return (
        <View style={[styles.container, props.bottomLine ? styles.borderBottm : null]}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.context} >
                <SelectItemBtn title='TO C' isSelect={props.defaultValue === 0} callback={() => itemPress(0)} />
                <SelectItemBtn title='TO B' isSelect={props.defaultValue === 1} callback={() => itemPress(1)} />
            </View>
        </View>
    );
}

function SelectType2(props) {
    return (
        <View style={[styles.container, props.bottomLine ? styles.borderBottm : null]}>
            <Text style={styles.title}>{props.title}</Text>
            <TouchableHighlight style={{ flex: 1 }} underlayColor='transparent' onPress={props.callback}>
                <View style={styles.context} >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            props.data.map((item, index) => {
                                let style = { height: 20, width: 20, marginHorizontal: 2 };
                                let source = require('../../../../image/otc/payment/pay_alipay.png');
                                switch (item.key) {
                                    case 'weChat':
                                        source = require('../../../../image/otc/payment/pay_WeChat.png');
                                        break;
                                    case 'bankCard':
                                        source = require('../../../../image/otc/payment/pay_card.png');
                                        break;
                                    default:
                                        break;
                                }
                                return (
                                    <Image key={item.key} style={style} source={source} />
                                )
                            })
                        }
                        <Image style={{ height: 15, width: 15, marginLeft: 5 }} source={require('../../../../image/arrow/arrow_right.png')} />
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    );
}

export default {
    Btn,
    Input,
    Select,
    SelectType2
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: Dimensions.get('window').width - 60,
        flexDirection: 'row',
        alignItems: 'center'
    },
    borderBottm: {
        borderBottomColor: '#F7F7F7',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 14,
        color: 'rgb(73,73,73)',
        fontFamily: 'PingFang-SC-Medium'
    },
    context: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    contextText: {
        marginHorizontal: 10,
        fontSize: 15,
        color: 'rgb(51,51,51)',
        fontFamily: 'PingFang-SC-Medium'
    },
    unit: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)'
    }
});