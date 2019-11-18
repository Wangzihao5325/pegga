import React, { PureComponent } from 'react';
import { View, TextInput, Dimensions, Platform, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class VerCodeInput extends PureComponent {

    state = {
        value: '',
        bottomData: [0, 1, 2, 3, 4, 5]
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={this.state.value}
                        onChangeText={this.textChange}
                        keyboardType='number-pad'
                        maxLength={6}
                        caretHidden={true}
                        autoFocus={true}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    {
                        this.state.bottomData.map((e) => {
                            let textLength = this.state.value.length;
                            if (textLength == e) {
                                return (
                                    <LinearGradient key={e} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.bottomItem} />
                                )
                            } else {
                                return (
                                    <View key={e} style={[styles.bottomItem, { backgroundColor: 'rgb(188,192,203)' }]} />
                                );
                            }
                        })
                    }
                </View>
            </View>
        );
    }

    textChange = (value) => {
        this.setState({
            value
        });
        if (value.length == 6 && typeof this.props.inputDone === 'function') {
            this.props.inputDone(value);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: 45,
        width: Dimensions.get('window').width - 40,
    },
    inputContainer: {
        height: 43,
        width: Dimensions.get('window').width - 40,
    },
    input: {
        height: 43,
        width: Dimensions.get('window').width + 100,
        textAlign: 'justify',
        fontSize: 20,
        ...Platform.select({
            ios: {
                paddingLeft: 18,
                letterSpacing: (Dimensions.get('window').width - 60 - 60 - 40) / 5 + 3,
            },
            android: {
                letterSpacing: (Dimensions.get('window').width - 60 - 60 - 40) / 5,
            }
        })
    },
    bottomContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: { justifyContent: 'space-between', },
            android: { justifyContent: 'space-around', }
        })
    },
    bottomItem: {
        height: 2,
        width: 44
    },
});