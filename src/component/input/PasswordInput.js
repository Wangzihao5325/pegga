import React, { PureComponent } from 'react';
import {
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Dimensions,
    StyleSheet
} from 'react-native';

export default class PasswordInput extends PureComponent {
    static defaultProps = {
        placeholder: 'PasswordInput Placeholder',
        placeholderTextColor: 'rgb(133,133,133)',
        isControl: false
    }

    state = {
        isSecurty: true,
        value: ''
    }

    render() {
        const securityImagePath = require('../../image/security/security.png');
        const unsecurityImagePath = require('../../image/security/unsecurity.png');
        return (
            <View style={[styles.container, this.props.style ? this.props.style : null]}>
                <TextInput
                    secureTextEntry={this.state.isSecurty}
                    placeholder={this.props.placeholder}
                    placeholderTextColor={this.props.placeholderTextColor}
                    value={this.props.isControl ? this.props.value : this.state.value}
                    onChangeText={this.inputValueChange}
                    style={[styles.input, this.props.inputStyle ? this.props.inputStyle : null]}
                />
                <TouchableHighlight
                    style={styles.securityBtn}
                    onPress={this.securityBtnPress}
                    underlayColor='transparent'
                >
                    <Image
                        style={styles.image}
                        source={this.state.isSecurty ? securityImagePath : unsecurityImagePath}
                    />
                </TouchableHighlight>
            </View>
        );
    }

    inputValueChange = (value) => {
        if (this.props.isControl) {
            if (typeof this.props.callback == 'function') {
                this.props.callback(value);
            }
        } else {
            this.setState({
                value
            }, () => {
                if (typeof this.props.callback == 'function') {
                    this.props.callback(value);
                }
            });
        }
    }

    securityBtnPress = () => {
        this.setState((preState) => {
            return {
                isSecurty: !preState.isSecurty
            }
        });
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: Dimensions.get('window').width - 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#EEE',
        borderBottomWidth: 1
    },
    input: {
        flex: 1
    },
    securityBtn: {
        height: 24,
        width: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 23
    },
    image: {
        height: 24,
        width: 24,
    }
});