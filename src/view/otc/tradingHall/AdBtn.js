import React, { PureComponent } from 'react';
import { View, Image, TouchableHighlight, Text, StyleSheet } from 'react-native';

export default class AdBtn extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.btn} underlayColor='rgb(249,251,255)' onPress={this.props.btnPress}>
                <Image style={styles.image} source={require('../../../image/otc/add_ad.png')} />
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        height: 50,
        width: 50,
        borderRadius: 25,
        borderColor: 'rgba(198,198,198,0.5)',
        borderWidth: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 2,
        bottom: 10,
    },
    image: {
        height: 20,
        width: 20
    }
});