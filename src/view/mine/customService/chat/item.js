import React, { PureComponent } from 'react';
import { View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import { redBright } from 'colorette';

export default class Item extends PureComponent {
    render() {
        if (this.props.item.fromAdmin) {
            return (
                <View style={[styles.container, { justifyContent: 'flex-start' }]}>
                    <Image style={styles.avater} source={require('../../../../image/customService/assistant_head.png')} />
                    <View style={[styles.wordsContainer, { backgroundColor: 'white', borderWidth: 1, borderColor: 'rgb(179,179,179)' }]}>
                        <Text style={[styles.words, { color: 'rgb(40,46,60)' }]}>{`${this.props.item.message}`}</Text>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={[styles.container, { justifyContent: 'flex-end' }]}>
                    <View style={[styles.wordsContainer, { backgroundColor: 'rgb(97,130,236)' }]}>
                        <Text style={[styles.words, { color: 'white' }]}>{`${this.props.item.message}`}</Text>
                    </View>
                    <Image style={styles.avater} source={require('../../../../image/customService/assistant_head.png')} />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    avater: {
        height: 50,
        width: 50
    },
    wordsContainer: {
        paddingHorizontal: 13,
        paddingVertical: 15,
        borderRadius: 5,
        marginHorizontal: 10
    },
    words: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
    }
});