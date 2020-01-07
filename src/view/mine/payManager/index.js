import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Dimensions,
    FlatList,
    Image,
    Text,
    TouchableHighlight
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Header from '../../../component/header';
import Select from '../../../component/select';
import I18n from '../../../global/doc/i18n';
import Btn from '../../../component/btn';
import { connect } from 'react-redux';
import { update_payment_info } from '../../../store/actions/userAction';

class Item extends Component {
    render() {
        let iconUrl = require('../../../image/otc/payment/pay_alipay.png');
        let title = '支付宝';
        let account = '';
        let name = '';
        let stateText = '';
        let stateStyle = {};
        switch (this.props.type) {
            case 'aliPay':
                iconUrl = require('../../../image/otc/payment/pay_alipay.png');
                title = '支付宝';
                account = this.props.item.alipayNo;
                name = this.props.item.alipayNick;
                break;
            case 'wechatPay':
                iconUrl = require('../../../image/otc/payment/pay_WeChat.png');
                title = '微信';
                account = this.props.item.weixinNo;
                name = this.props.item.weixinNick;
                break;
            case 'card':
                iconUrl = require('../../../image/otc/payment/pay_card.png');
                title = this.props.item.bank;
                account = this.props.item.bankCard;
                name = this.props.item.realName;
                break;
        }
        switch (this.props.item.auditStatus) {
            case 0:
                stateText = '审核中';
                stateStyle = { fontFamily: 'PingFang-SC-Medium', fontSize: 14, color: 'rgb(242,106,58)' };
                break;
            case 1:
                break;
            case 2:
                stateText = '未通过';
                stateStyle = { fontFamily: 'PingFang-SC-Medium', fontSize: 14, color: 'rgb(222,44,48)' }
                break;
        }
        return (
            <View style={styles.itemContainer}>
                <TouchableHighlight underlayColor='transparent' onPress={this.props.btnClick}>
                    <View style={styles.itemBody}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width - 60 }}>
                            <Image style={styles.itemIcon} source={iconUrl} />
                            <Text style={styles.itemTitle}>{`${title}`}</Text>
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}><Text style={stateStyle}>{`${stateText}`}</Text></View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                                <Text style={styles.itemAccount}>{`${account}`}</Text>
                                <Text style={styles.itemAccountName}>{`${name}`}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'flex-end' }}>
                                <Image style={{ height: 25, width: 25 }} source={require('../../../image/otc/payment/qrCode.png')} />
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

class PayManager extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: 'aliPay',
        data: this.props.aliPay
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.isControl) {
    //         return {
    //             value: props.value
    //         }
    //     } else {
    //         return null;
    //     }
    // }

    // naviDidFocus = () => {
    //     update_payment_info();
    // }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <NavigationEvents
                    onDidFocus={this.naviDidFocus}
                />
                <Header.Normal
                    title={I18n.PAY_TITLE}
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9', flexDirection: 'column', alignItems: 'center', paddingTop: 1 }}>
                    <Select.ScrollLinear
                        data={[{ title: I18n.PAY_ALIPAY, key: 'aliPay' }, { title: I18n.PAY_WECHAT, key: 'wechatPay' }, { title: I18n.PAY_CARD, key: 'card' }]}
                        isFlex={true}
                        style={{ backgroundColor: 'white' }}
                        selectValue={this.state.type}
                        selectChange={this.selectChange}
                        isControl
                    />
                    <View style={{ flex: 1 }}>
                        <FlatList
                            style={{ marginTop: 5 }}
                            data={this.state.data}
                            extraData={this.state.type}
                            renderItem={({ item }) =>
                                <Item
                                    item={item}
                                    type={this.state.type}
                                    btnClick={() => this.props.navigation.navigate('PaymentAdd', { type: this.state.type, stateType: 'modify', data: JSON.stringify(item) })}
                                />
                            }
                        />
                    </View>
                    <View style={styles.bottomContainer} >
                        <Btn.Linear
                            style={styles.bottomBtn}
                            textStyle={styles.bottomBtnText}
                            btnPress={this.bottomBtnPress}
                            title='添加'
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    selectChange = (item) => {
        this.setState({
            type: item.key,
            data: this.props[item.key]
        })
    }

    bottomBtnPress = () => {
        // stateType: add modify
        // data
        this.props.navigation.navigate('PaymentAdd', { type: this.state.type, stateType: 'add' });
    }
}

const mapStateToProps = (state) => ({
    aliPay: state.user.payment.alipay,
    wechatPay: state.user.payment.weixin,
    card: state.user.payment.bank,
})

export default connect(mapStateToProps)(PayManager);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
    bottomContainer: {
        height: 70,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomBtn: {
        height: 40,
        width: Dimensions.get('window').width - 30,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    bottomBtnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 16
    },
    itemContainer: {
        height: 120,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemBody: {
        height: 110,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    itemIcon: {
        height: 22,
        width: 22
    },
    itemTitle: {
        marginLeft: 5,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(68,68,68)'
    },
    itemAccountName: {
        marginTop: 10,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(133,133,133)'
    },
    itemAccount: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)'
    }
});