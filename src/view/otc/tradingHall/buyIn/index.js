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
import Toast from '../../../../component/toast';

import Value2Str from '../../../../global/util/MapValue2Str';
import Header from '../../../../component/header';
import Info from './Info';
import Num from './Num';
import I18n from '../../../../global/doc/i18n';

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
    }

    _rateCal = (failed, end) => {
        if (failed + end <= 0) {
            return '0.00%';
        } else {
            let rateNum = (end / (failed + end) * 100).toFixed(2);
            return `${rateNum}%`
        }
    }

    componentDidMount() {
        const itemStr = this.props.navigation.getParam('itemStr', '{}');
        let itemData = JSON.parse(itemStr);
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
            userNo: itemData.userNo
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
                <Header.Normal title={`${headerTitle}${this.state.coinType}`} goback={() => this.props.navigation.goBack()} />
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

    goToSellerInfo = () => {
        let sellerInfoStr = JSON.stringify({ buyerNo: this.state.userNo, sellerNo: this.state.userNo });
        this.props.navigation.navigate('OTC_SellerDetailInfo', { sellerInfoStr });
    }

    coinNumChange = (value) => {
        if (value || value.length > 0) {
            this.setState({
                coinNum: value,
                moneyNum: `${parseFloat(value) * this.state.price}`
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
        Api.newOrder({
            advertiseNo: this.state.id,
            amount: parseFloat(this.state.coinNum),
            legalAmount: parseFloat(this.state.moneyNum)
        }, (result) => {
            let orderNum = result.orderNo;
            this.props.navigation.pop();
            this.props.navigation.navigate('OTC_OrderDetails', { orderNum });
        }, (result, code, msg) => {
            let message = msg ? msg : '生成订单失败';
            Toast.show(message);
        })
    }

    goBack = () => {
        this.props.navigation.goBack();
    }
}

function mapState2Props(store) {
    return {
        legalWallet: store.assets.legalWallet
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