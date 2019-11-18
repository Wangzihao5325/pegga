/*
    <Btn.Control
        style={styles.controlBtn}
        selectKey={this.props.currencyType}
        data={{ CNY: 'CNY', USDT: 'USDT' }}
        callback={this.currencyTypeChange}
    />
*/
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

export default class ControlBtn extends PureComponent {

    render() {
        return (
            <TouchableHighlight style={this.props.style} onPress={this.btnPress} underlayColor='transparent'>
                <View><Text>{this.props.data[this.props.selectKey]}</Text></View>
            </TouchableHighlight>
        );
    }

    btnPress = () => {
        if (typeof this.props.callback == 'function') {
            let selectKey = null;
            let keyArr = Object.keys(this.props.data);
            let index = keyArr.indexOf(this.props.selectKey);
            if (index >= 0 && index <= keyArr.length - 1) {
                if (keyArr.length == 1) {
                    selectKey = this.props.selectKey
                } else if (index == keyArr.length - 1) {
                    selectKey = keyArr[0];
                } else {
                    selectKey = keyArr[index + 1];
                }
            }
            this.props.callback(selectKey);
        }
    }
}