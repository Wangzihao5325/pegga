import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Header from '../../../component/header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AliPay from './AliPay';
import WechatPay from './WechatPay';
import BankCardPay from './BankCardPay';
import Api from '../../../socket/index';
import Toast from '../../../component/toast';
const default_ali = {
    alipayNick: '',
    alipayNo: '',
    alipayUuid: '',
    aliQrCode: '',
    auditStatus: 1,
    commonStatus: '',
    countryId: '',
    provinceId: '',
    cityId: '',
    reason: '',
    realName: ''
};

const default_weixin = {
    weixinNick: '',
    weixinNo: '',
    weixinQrCode: '',
    auditStatus: 1,
    commonStatus: '',
    countryId: '',
    provinceId: '',
    cityId: '',
    reason: '',
    realName: ''
};

const default_bank = {
    bank: '',
    bankBranch: '',
    bankCard: '',
    auditStatus: 1,
    commonStatus: '',
    dailyAmount: '',
    reason: '',
    realName: ''
};

export default class PaymentAdd extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: '',
        data: {},
        isAdd: false
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', 'aliPay');
        const stateType = this.props.navigation.getParam('stateType', 'add');
        if (stateType == 'add') {
            let default_data = '';
            switch (type) {
                case 'aliPay':
                    default_data = JSON.stringify(default_ali);
                    break;
                case 'wechatPay':
                    default_data = JSON.stringify(default_weixin);
                    break;
                case 'card':
                    default_data = JSON.stringify(default_bank);
                    break;
            }
            this.setState({
                type,
                data: JSON.parse(default_data),
                isAdd: true
            });
        } else if (stateType == 'modify') {
            let dataStr = this.props.navigation.getParam('data', '{}');
            this.setState({
                type,
                data: JSON.parse(dataStr),
                isAdd: false
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title={this.state.isAdd ? '添加支付方式' : '修改支付方式'}
                    goback={() => this.props.navigation.goBack()}
                    rightBtnTitle={this.state.isAdd ? null : '删除'}
                    rightBtnPress={this.delete}
                />
                <KeyboardAwareScrollView>
                    {this.state.type == 'aliPay' && <AliPay alipay={this.state.data} navi={this.props.navigation} />}
                    {this.state.type == 'wechatPay' && <WechatPay wechat={this.state.data} navi={this.props.navigation} />}
                    {this.state.type == 'card' && <BankCardPay bank={this.state.data} navi={this.props.navigation} />}
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }

    delete = () => {
        let payload = null;
        switch (this.state.type) {
            case 'aliPay':
                payload = { payId: this.state.data.alipayId, payType: 0 };
                break;
            case 'wechatPay':
                payload = { payId: this.state.data.weixinId, payType: 1 };
                break;
            case 'card':
                payload = { payId: this.state.data.bankId, payType: 2 };
                break;
        }
        Api.delPayment(payload, () => {
            Toast.show('删除支付方式成功');
            this.props.navigation.goBack();
        })
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    }
});