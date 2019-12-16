import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import Enum from '../../../global/Enum';
import Api from '../../../socket';
import Toast from '../../../component/toast';
import I18n from '../../../global/doc/i18n';

export default class BottomTab extends PureComponent {
    render() {
        let picImage = require('../../../image/mine/merchant/general_icon.png');
        switch (this.props.role.roleName) {
            case Enum.ROLE.BUSINESS_ROLE[3].key:
                picImage = require('../../../image/mine/merchant/trust_icon.png');
                break;
            case Enum.ROLE.BUSINESS_ROLE[4].key:
                //
                if (this.props.role.trustStaple) {
                    picImage = require('../../../image/mine/merchant/trustStample_icon.png');
                } else {
                    picImage = require('../../../image/mine/merchant/stample_icon.png');
                }
                break;
            default:
                break;
        }
        return (
            <View style={styles.container}>
                <View style={{ marginTop: 15, marginBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.title}>{`${I18n.CURRENT_IDENTITY}`}</Text>
                    <TouchableHighlight onPress={this.drawBack} underlayColor='transparent' style={styles.drawback}><Text style={styles.drawbackText}>{`${I18n.DOWNGRADE_APPLY}`}</Text></TouchableHighlight>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={{ height: 40, width: 40 }} source={picImage} />
                        <Text style={styles.role}>{`${this.props.role.roleChainName}`}</Text>
                    </View>
                    <View>
                        <Text style={styles.context}>{`${I18n.MERCHANT_TIPS_ONE}`}</Text>
                        <Text style={styles.context}>{`${I18n.MERCHANT_TIPS_TWO}`}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _downgradeConfirmCallback = () => {
        Api.downGrade((resut, code, msg) => {
            Toast.show(I18n.INFO_SUBMIT_SUCCESS);
            this.props.navi.goBack();
        });
    }

    drawBack = () => {
        if (this.props.role.roleName == Enum.ROLE.BUSINESS_ROLE[2].key) {
            Toast.show(I18n.CER_MERCHANT_CAN_NOT_DOENGRADE);
        } else {
            this.props.navi.navigate('PopModel', {
                confirm: () => this._downgradeConfirmCallback(),
                confirmText: I18n.CONFIRM,
                title: I18n.DOWNGRADE,
                context: I18n.MAKE_SURE_DOENGRADE
            });
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