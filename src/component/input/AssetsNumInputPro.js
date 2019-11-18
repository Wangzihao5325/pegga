import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    StyleSheet
} from 'react-native';

export default class AssetsNumInput extends PureComponent {
    static defaultProps = {
        title: 'title',
        unit: 'unit',
        value: '',
        placeHolder: '',
        isControl: false,
        editable: true
    }

    state = {
        value: this.props.value
    }

    static getDerivedStateFromProps(props, state) {
        if (props.isControl) {
            return {
                value: props.value
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={[styles.text, { textAlign: 'right' }]}>{this.props.title}</Text>
                <TextInput
                    style={styles.input}
                    value={this.state.value}
                    onChangeText={this.textChange}
                    placeholder={this.props.placeHolder}
                    editable={this.props.editable}
                />
                <Text style={[styles.text, { textAlign: 'left' }]}>{this.props.unit}</Text>
            </View>
        );
    }

    textChange = (value) => {
        if (this.props.isControl && typeof this.props.callback == 'function') {
            this.props.callback(value);
        }
        if (!this.props.isControl) {
            this.setState({
                value
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: Dimensions.get('window').width - 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#E9E9E9',
        borderBottomWidth: 1
    },
    text: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)',
        textAlignVertical: 'center',
    },
    input: {
        flex: 1,
        fontFamily: 'PingFang-SC-Regular',
        fontSize: 14,
        color: 'rgb(188,192,203)',
        textAlign: 'right',
        marginHorizontal: 10
    }
})