import React, { PureComponent } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions } from 'react-native'
export default class Item extends PureComponent {
    render() {
        return (
            <View style={styles.wrapper}>
                <TouchableHighlight onPress={() => this.props.callback(this.props.item)}>
                    <View style={styles.container}>
                        <Text style={{ fontSize: 16, color: 'rgb(40,46,60)', fontFamily: 'PingFang-SC-Medium' }}>{`${this.props.item.title}`}</Text>
                        <Text style={{color:'rgb(133,133,133)'}}>></Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 80,
        width: Dimensions.get('window').width,
        backgroundColor: '#F3F5F9',
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    container: {
        height: 70,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    }
});