import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import Enum from '../../../global/Enum';

export default class BottomTab extends PureComponent {

    render() {
        let picImage = require('../../../image/mine/merchant/general_icon.png');
        if (this.props.role.roleName == Enum.ROLE.BUSINESS_ROLE[3].key ||
            this.props.role.roleName == Enum.ROLE.BUSINESS_ROLE[4].key ||
            this.props.role.roleName == Enum.ROLE.BUSINESS_ROLE[5].key
        ) {
            picImage = require('../../../image/mine/merchant/trust_icon.png');
        }
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 15, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title}>当前身份</Text>
                    <TouchableHighlight onPress={this.drawBack} underlayColor='transparent' style={styles.drawback}><Text style={styles.drawbackText}>退还激活金</Text></TouchableHighlight>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 40, width: 40 }} source={picImage} />
                        <Text style={styles.role}>{`${this.props.role.roleChainName}`}</Text>
                    </View>
                    <View>
                        <Text style={styles.context}>1.具备TO B发布广告的权限</Text>
                        <Text style={styles.context}>2.交易量达标后自动退还激活金</Text>
                    </View>
                </View>
            </View>
        );
    }

    drawBack = () => {
        if (this.props.role.roleName == Enum.ROLE.BUSINESS_ROLE[2].key) {

        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'white',
        borderRadius: 5,
        marginHorizontal: 15,
        paddingHorizontal: 15,
        marginTop: 10
    },
    title: {
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(40,46,60)',
        fontSize: 16,
    },
    role: {
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(40,46,60)',
        fontSize: 16
    },
    context: {
        fontFamily: 'PingFang-SC-Regular',
        color: 'rgb(133,133,133)',
        fontSize: 13
    },
    drawback: {
        height: 26,
        width: 75,
        borderRadius: 13,
        backgroundColor: '#EFF4FC',
        justifyContent: 'center',
        alignItems: 'center'
    },
    drawbackText: {
        fontSize: 12,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium'
    }
});