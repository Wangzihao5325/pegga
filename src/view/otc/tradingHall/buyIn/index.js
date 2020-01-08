import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Api from '../../../../socket/index';
import Colors from '../../../../global/Colors';
import Btn from '../../../../component/btn';

import Value2Str from '../../../../global/util/MapValue2Str';
import Header from '../../../../component/header';
import Info from './Info';
import Num from './Num';
import I18n from '../../../../global/doc/i18n';
import Toast from '../../../../component/toast';
import Item from '../newAd/Item';


class BuyIn extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        name: '',
        tradeType: 0,
        coinType: '',
        currencyType: '',
        price: 0,
        maxLimit: 0,
        minLimit: 0,
        amount: 0,
        payType: '',
        remark: '',
        orderFillRateLastMonth: '',
        id: '',
        userNo: '',

        coinNum: '',
        moneyNum: '',
        isBuying: false,
        myPayTypeData: {},
        myPayType: {},
        myDefaultCPayType: {}
    }

    _rateCal = (failed, end) => {
        if (failed + end <= 0) {
            return '0.00%';
        } else {
            let rateNum = (end / (failed + end) * 100).toFixed(2);
            return `${rateNum}%`
        }
    }

    _toCDefaultPaymentSelect = (passedPayment) => {
        let passPayCopy = JSON.parse(JSON.stringify(passedPayment));
        let passPayReg = JSON.parse(JSON.stringify(passedPayment));
        if (passPayCopy.aliPassed.length >= 1) {
            passPayCopy.aliPassed.length = 1;
            passPayReg.aliPassed[0].isSelect = true;
        }
        if (passPayCopy.wexinPassed.length >= 1) {
            passPayCopy.wexinPassed.length = 1;
            passPayReg.wexinPassed[0].isSelect = true;
        }
        if (passPayCopy.bankPassed.length >= 1) {
            passPayCopy.bankPassed.length = 1;
            passPayReg.bankPassed[0].isSelect = true;
        }
        return { passPayCopy, passPayReg };
    }

    componentDidMount() {
        const itemStr = this.props.navigation.getParam('itemStr', '{}');
        let itemData = JSON.parse(itemStr);
        let { passPayCopy, passPayReg } = this._toCDefaultPaymentSelect(this.props.passedPayment);
        this.setState({
            name: itemData.nikeName ? itemData.nikeName : '游客',
            tradeType: itemData.type,
            coinType: itemData.token,
            currencyType: itemData.fiat,
            price: itemData.price,
            maxLimit: itemData.maxLimit,
            minLimit: itemData.minLimit,
            amount: itemData.remainAmount,
            payType: itemData.payType,
            remark: itemData.remark,
            orderFillRateLastMonth: this._rateCal(itemData.orderFilledCount, itemData.orderEndCount),
            id: itemData.advertiseNo,
            userNo: itemData.userNo,
            myPayTypeData: passPayReg,
            myPayType: passPayCopy,
            myDefaultCPayType: passPayCopy
        });
    }

    render() {
        let headerTitle = Value2Str.tradeType(this.state.tradeType === 1 ? 0 : 1);
        let btnTitle = this.state.tradeType ? I18n.BUY_RIGHT_NOW : I18n.SELL_RIGHT_NOW;
        let myAmount = 0;
        if (this.state.tradeType == 1 && this.props.legalWallet[this.state.coinType]) {
            myAmount = this.props.legalWallet[this.state.coinType].available;
        }
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal title={`${headerTitle}`} goback={() => this.props.navigation.goBack()} />
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', backgroundColor: '#F2F2F2' }}>
                    <KeyboardAwareScrollView>
                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                            <Info
                                name={this.state.name}
                                tradeType={this.state.tradeType}
                                tradeRate={this.state.orderFillRateLastMonth}
                                price={this.state.price}
                                currencyType={this.state.currencyType}
                                coinType={this.state.coinType}
                                maxLimit={this.state.maxLimit}
                                minLimit={this.state.minLimit}
                                amount={this.state.amount}
                                payType={this.state.payType}
                                remark={this.state.remark}
                                callback={this.goToSellerInfo}
                            />
                            <Num
                                tradeType={this.state.tradeType}
                                coinType={this.state.coinType}
                                currencyType={this.state.currencyType}
                                amount={this.state.amount}
                                myAmount={myAmount}
                                tradeAll={this.tradeAll}
                                coinNum={this.state.coinNum}
                                moneyNum={this.state.moneyNum}
                                coinNumCallback={this.coinNumChange}
                            //moneyNumCallback={this.moneyNumChange}
                            />
                            {this.state.tradeType === 0 &&
                                <View style={{ backgroundColor: 'white', width: Dimensions.get('window').width - 30, borderRadius: 5, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Item.SelectType2
                                        title='支付方式'
                                        data={this.state.myPayType}
                                        callback={this.payTypeSelect}
                                    />
                                </View>
                            }
                        </View>
                    </KeyboardAwareScrollView>
                </View>
                <View style={styles.btnWrapper}>
                    <Btn.Linear
                        style={styles.btn}
                        textStyle={{ color: 'white' }}
                        btnPress={this.buyIn}
                        title={btnTitle}
                    />
                </View>
            </SafeAreaView>
        );
    }

    payTypeSelect = () => {

        if (this.state.myPayTypeData.aliPassed.length == 0 &&
            this.state.myPayTypeData.wexinPassed.length == 0 &&
            this.state.myPayTypeData.bankPassed.length == 0) {
            Toast.show('没有可用的支付方式!');
            return;
        }
        if (this.state.myPayTypeData.aliPassed.length +
            this.state.myPayTypeData.wexinPassed.length +
            this.state.myPayTypeData.bankPassed.length
            == 1) {
            Toast.show('没有多余的支付方式可供选择!');
            return;
        }
        this.props.navigation.navigate('SelectModelPay',
            {
                data: JSON.stringify(this.state.myPayTypeData),
                type: 'single',
                title: '选择支付方式',
                callback: (selectDataArr, nowState) => {
                    this.setState({
                        myPayType: selectDataArr,
                        myPayTypeData: nowState,
                    });
                }
            });
    }

    goToSellerInfo = () => {
        let sellerInfoStr = JSON.stringify({ buyerNo: this.state.userNo, sellerNo: this.state.userNo });
        this.props.navigation.navigate('OTC_SellerDetailInfo', { sellerInfoStr });
    }

    coinNumChange = (value) => {
        if (value || value.length > 0) {
            this.setState({
                coinNum: value,
                moneyNum: `${parseFloat((parseFloat(value) * this.state.price).toFixed(8))}`
            });
        } else {
            this.setState({
                coinNum: '',
                moneyNum: ''
            });
        }
    }

    tradeAll = (maxValue) => {
        this.setState({
            coinNum: `${maxValue}`,
            moneyNum: `${parseFloat(maxValue) * this.state.price}`
        });
    }

    buyIn = () => {
        if (this.state.isBuying) {
            Toast.show(I18n.CLICK_TOO_FAST);
            return;
        }
        this.setState({
            isBuying: true
        });

        let payType = [];
        let payload_ali = null;
        let payload_wx = null;
        let payload_bank = null;
        if (this.state.tradeType === 0) {
            let aliPaySelect = this.state.myPayType['aliPassed'];
            if (aliPaySelect.length >= 1) {
                let aliPayTypeInfo = aliPaySelect.map((item) => {
                    return item.id
                });
                payload_ali = { payType: 0, payTypeInfo: aliPayTypeInfo };
                payType.push(payload_ali);
            }
            let weixinSelect = this.state.myPayType['wexinPassed'];
            if (weixinSelect.length >= 1) {
                let weixinTypeInfo = weixinSelect.map((item) => {
                    return item.id
                });
                payload_wx = { payType: 1, payTypeInfo: weixinTypeInfo };
                payType.push(payload_wx);
            }
            let bankSelect = this.state.myPayType['bankPassed'];
            if (bankSelect.length >= 1) {
                let bankTypeInfo = bankSelect.map((item) => {
                    return item.id
                });
                payload_bank = { payType: 2, payTypeInfo: bankTypeInfo };
                payType.push(payload_bank);
            }

            let buyerPayType = this.state.payType.split('#');

            let noSamePayment = buyerPayType.every((item) => {
                let key = item.split(':')[0];
                switch (key) {
                    case '0':
                        if (!payload_ali) {
                            return true
                        } else {
                            return false
                        }
                    case '1':
                        if (!payload_wx) {
                            return true
                        } else {
                            return false
                        }
                    case '2':
                        if (!payload_bank) {
                            return true
                        } else {
                            return false
                        }
                }
            });
            if (noSamePayment) {
                Toast.show('请至少选择一种对方支持的支付方式！');
                this.setState({
                    isBuying: false
                });
                return;
            }
        }

        Api.newOrder({
            advertiseNo: this.state.id,
            amount: parseFloat(this.state.coinNum),
            legalAmount: parseFloat(this.state.moneyNum),
            payType: this.state.tradeType === 0 ? payType : null
        }, (result) => {
            this.setState({
                isBuying: false
            });
            let orderNum = result.orderNo;
            this.props.navigation.pop();
            this.props.navigation.navigate('OTC_OrderDetails', { orderNum });
        }, () => {
            this.setState({
                isBuying: false
            });
        })
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
}

function mapState2Props(store) {
    return {
        legalWallet: store.assets.legalWallet,
        passedPayment: store.user.passedPayment,
    }
}

export default connect(mapState2Props)(BuyIn);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.MAIN_BG_COLOR,
        flexDirection: 'column'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2F2F2',
        alignSelf: 'center'

    },
    flexContainer: {
        height: 50,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    icon: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: '#909090',
        borderWidth: 1
    },
    btnWrapper: {
        height: 90,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        height: 45,
        width: Dimensions.get('window').width - 30,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});