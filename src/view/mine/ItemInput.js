import React, { PureComponent } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet } from 'react-native';

export default class ItemInput extends PureComponent {
    static defaultProps = {
        placeholder: '',
        bottomLine: false,
        margin: false,
        isControl: false,
        value: '',
        editable: true,
        secureTextEntry: false
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
            <View style={[styles.container, this.props.margin ? { marginTop: 10 } : null, this.props.bottomLine ? styles.bottomLine : null]} >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                    {typeof this.props.tips == 'string' && <Text style={styles.tipsText}>{this.props.tips}</Text>}
                </View>
                <TextInput
                    secureTextEntry={this.props.secureTextEntry}
                    editable={this.props.editable}
                    style={styles.input}
                    placeholder={this.props.placeholder}
                    placeholderTextColor='rgb(133,133,133)'
                    value={this.state.value}
                    onChangeText={this.textChange}
                />
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
        height: 55,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    bottomLine: {
        borderBottomColor: '#FAFAFC',
        borderBottomWidth: 1
    },
    titleText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)',
        //textAlign: 'center',
        textAlignVertical: 'center'
    },
    tipsText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 13,
        color: 'rgb(179,179,179)',
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 5
    },
    input: {
        flex: 1,
        height: 45,
        marginLeft: 20,
        fontSize: 15,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(40,46,60)',
        //fontWeight: 'bold',
        textAlign: 'right'
    }
});