import React, { PureComponent } from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';

export default class NormalBtn extends PureComponent {
    static defaultProps = {
        title: 'button',
        underlayColor: '#909090',
        style: { flex: 1 },
        textStyle: { textAlign: 'center', textAlignVertical: 'center' }
    }

    render() {
        return (
            <TouchableHighlight
                style={this.props.style}
                onPress={this.btnPress}
                underlayColor={this.props.underlayColor}
            >
                <Text style={this.props.textStyle}>{this.props.title}</Text>
            </TouchableHighlight>
        );
    }

    btnPress = () => {
        if (typeof this.props.btnPress == 'function') {
            this.props.btnPress();
        }
    }
}

const styles = StyleSheet.create({
    default: {
        flex: 1
    },
    textDefault: {
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});