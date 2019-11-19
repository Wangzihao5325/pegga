import React, { PureComponent } from 'react';
import {
    TextInput,
    Dimensions,
    StyleSheet
} from 'react-native';

export default class AccountInput extends PureComponent {
    static defaultProps = {
        placeholder: 'AccountInput Placeholder',
        placeholderTextColor: 'rgb(133,133,133)',
        security: false,
        isControl: false
    }

    state = {
        value: ''
    }

    render() {
        return (
            <TextInput
                secureTextEntry={this.props.security}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                value={this.props.isControl ? this.props.value : this.state.value}
                onChangeText={this.inputValueChange}
                style={[styles.input, this.props.style ? this.props.style : null]}
            />
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

}

const styles = StyleSheet.create({
    input: {
        height: 70,
        width: Dimensions.get('window').width - 40,
        borderBottomColor: '#EEE',
        borderBottomWidth: 1
    }
});