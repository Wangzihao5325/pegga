import React, { PureComponent } from 'react';
import { View, TouchableHighlight, Image, Text, Dimensions, StyleSheet } from 'react-native';
import I18n from '../../../global/doc/i18n';
class Item extends PureComponent {
    render() {
        return (
            <TouchableHighlight onPress={this.btnPress} underlayColor='transparent'>
                <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={this.props.source} />
                    <Text style={{ marginTop: 5, fontWeight: 'normal', color: 'rgb(133,133,133)' }}>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    btnPress = () => {
        if (typeof this.props.callback == 'function') {
            this.props.callback();
        }
    }
}

export default class CapitalOperation extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Item
                    title={I18n.ASSETS_RECHARGE}
                    source={require('../../../image/assets/Recharge.png')}
                    callback={this.props.recharge}
                />
                <Item
                    title={I18n.ASSETS_WITHDRAW}
                    source={require('../../../image/assets/Cash-out.png')}
                    callback={this.props.cashOut}
                />
                <Item
                    title={I18n.ASSETS_TRANSFER}
                    source={require('../../../image/assets/Transfer.png')}
                    callback={this.props.transfer}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 60,
        width: 65,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemImage: {
        height: 30,
        width: 30,
    },
    container: {
        height: 78,
        width: Dimensions.get('window').width - 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 15
    }
});