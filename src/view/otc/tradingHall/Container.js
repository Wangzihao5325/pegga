import React, { Component, Fragment } from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    TextInput,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

import Api from '../../../socket';
import Utils from '../../../global/util';
import Input from '../../../component/input';
import Btn from '../../../component/btn';
import store from '../../../store';
import { otc_state_change_danger } from '../../../store/actions/otcStateAction';
import Toast from '../../../component/toast';
//一键买入暂时废弃 不能开启 不支持多种支付方式
function Payment(props) {
    return (
        <TouchableHighlight underlayColor='transparent' onPress={props.btnPress} >
            <View style={styles.paymentContainer}>
                <Text style={[styles.paymentTitle, { textAlign: 'right' }]}>支付方式</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginLeft: 4 }}>
                    {!props.isBindingPay && <Text style={styles.noBindPayText}>管理支付方式</Text>}
                    {props.isBindingPay &&
                        props.payTypeData.map((item, index) => {
                            let style = { height: 20, width: 20 };
                            let source = require('../../../image/otc/payment/pay_alipay.png');
                            switch (item.key) {
                                case 'weChat':
                                    source = require('../../../image/otc/payment/pay_WeChat.png');
                                    break;
                                case 'bankCard':
                                    source = require('../../../image/otc/payment/pay_card.png');
                                    break;
                                default:
                                    break;
                            }
                            return (
                                <Image key={item.key} style={style} source={source} />
                            )
                        })
                    }
                </View>
                <Image style={{ height: 20, width: 20 }} source={require('../../../image/arrow/arrow_right.png')} />
            </View>
        </TouchableHighlight>
    );
}

class Container extends Component {
    state = {
        rate: '',
        unitType: this.props.coinType,
    }

    _unitType = () => {
        if (this.state.unitType == this.props.coinType) {
            return { titlePart: '数量', resultTitleP: '金额', priceUnit: `${this.props.currencyType}/${this.props.coinType}` }
        } else {
            return { titlePart: '金额', resultTitleP: '数量', priceUnit: `${this.props.coinType}/${this.props.currencyType}` }
        }
    }

    _rateUpdate = () => {
        let iconRatePayload = { dealType: this.props.tradeType, fiat: this.props.currencyType, token: this.props.coinType };
        Api.iconRate(iconRatePayload, (result) => {
            store.dispatch(otc_state_change_danger({ iconPrice: result }));
            let regArr = result.filter((item) => {
                return item.token == this.props.coinType
            });
            this.setState({
                rate: typeof regArr[0].rate == 'number' ? `${regArr[0].rate}` : '未定价',
            })
        });
    }

    componentDidMount() {
        this._rateUpdate();
    }

    render() {
        let tradeTpeStr = Utils.mapValue2Str.tradeType(this.props.tradeType);
        const { titlePart, resultTitleP, priceUnit } = this._unitType();
        const { isBindingPay } = this.props.userState;
        let calNum = this.state.unitType == this.props.coinType ? this.props.totalMoney : this.props.tradeNum;
        return (
            <View style={styles.container}>
                <View style={styles.header} >
                    <Text style={styles.headerTitle}>{`${tradeTpeStr}${titlePart}`}</Text>
                    <Text style={styles.headerContext}>{`单价约 ${this.state.rate} ${priceUnit}`}</Text>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder={`请输入${tradeTpeStr}${titlePart}`}
                        placeholderTextColor='rgb(133,133,133)'
                        onChangeText={this.tradeNumChange}
                        value={this.state.unitType == this.props.coinType ? this.props.tradeNum : this.props.totalMoney}
                    />
                    <Text style={styles.inputUnit}>{`${this.state.unitType == this.props.coinType ? this.props.coinType : this.props.currencyType}`}</Text>
                </View>
                <View style={styles.numWrapper}>
                    {(typeof calNum === 'string' && calNum.length > 0) && <Text>{`${resultTitleP}约 ${calNum} ${this.state.unitType == this.props.coinType ? this.props.currencyType : this.props.coinType}`}</Text>}
                    <View style={{ flex: 1 }} />
                    <TouchableHighlight onPress={this.unitChange} underlayColor='transparent'>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 20, width: 20 }} source={require('../../../image/otc/switch.png')} />
                            <Text style={{ color: 'rgb(45,60,96)', fontSize: 12, fontFamily: 'PingFang-SC-Regular', textAlignVertical: 'center' }}>{`按${resultTitleP}购买`}</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{ height: 5, width: Dimensions.get('window').width - 60 }} />
                <Payment
                    isBindingPay={isBindingPay}
                    payTypeData={this.props.passedPayment}
                    btnPress={() => this.payManager(isBindingPay)}
                />
                <Btn.Linear
                    style={styles.btnTrade}
                    textStyle={styles.btnTradeText}
                    title={`一键${tradeTpeStr}`}
                    btnPress={this.trade}
                />
            </View>
        );
    }

    unitChange = () => {
        this.setState((preState) => {
            if (preState.unitType == this.props.coinType) {
                return {
                    unitType: this.props.currencyType
                }
            } else if (preState.unitType == this.props.currencyType) {
                return {
                    unitType: this.props.coinType
                }
            } else {
                return null
            }
        });
    }

    estimatedPriceChange = (value) => {
        store.dispatch(otc_state_change_danger({ estimatedPrice: value }))
    }

    tradeNumChange = (value) => {
        if (this.state.unitType == this.props.coinType) {
            store.dispatch(otc_state_change_danger({ tradeNum: value }));
            if (!value) {
                store.dispatch(otc_state_change_danger({ totalMoney: '' }));
                return;
            }
            let moneyValue = typeof parseFloat(this.state.rate) == 'number' ? (parseFloat(value) * parseFloat(this.state.rate)).toFixed(2) : 0.00;
            store.dispatch(otc_state_change_danger({ totalMoney: `${moneyValue}` }));
        } else if (this.state.unitType == this.props.currencyType) {
            store.dispatch(otc_state_change_danger({ totalMoney: value }));
            if (!value) {
                store.dispatch(otc_state_change_danger({ tradeNum: '' }));
                return
            }
            let numValue = typeof parseFloat(this.state.rate) == 'number' ? (parseFloat(value) / parseFloat(this.state.rate)).toFixed(2) : 0.00;
            store.dispatch(otc_state_change_danger({ tradeNum: `${numValue}` }));
        }
    }

    payManager = (isBindingPay) => {
        if (isBindingPay) {
            Toast.show('快速交易暂不支持自定义收款方式');
        } else {
            this.props.navi.navigate('PayManager');
        }
    }

    trade = () => {
        if (this.props.tradeNum && this.props.totalMoney && this.state.rate) {
            let payload = {
                amount: parseFloat(this.props.tradeNum),
                money: parseFloat(this.props.totalMoney),
                price: this.state.rate,
                type: this.props.tradeType
            };
            Api.onceCall(payload, (result, code, msg) => {
                Toast.show('广告创建成功!');
            });
        } else {
            Toast.show('请输入正确的数目/金额!');
        }
    }
}

function mapState2Props(store) {
    return {
        currencyType: store.otcState.currencyType,
        coinType: store.otcState.coinType,
        estimatedPrice: store.otcState.estimatedPrice,
        tradeNum: store.otcState.tradeNum,
        totalMoney: store.otcState.totalMoney,
        tradeType: store.otcState.tradeType,
        userState: store.user.state,
        iconPrice: store.otcState.iconPrice,

        passedPayment: store.user.payment.passedPayment
    }
}

export default connect(mapState2Props)(Container);

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        height: 260,
        width: Dimensions.get('window').width - 30,
        borderRadius: 5,
        backgroundColor: 'white',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        height: 25,
        width: Dimensions.get('window').width - 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 10
    },
    headerTitle: {
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'rgb(40,46,60)'
    },
    headerContext: {
        fontFamily: 'PingFang-SC-Regular',
        fontSize: 11,
        color: 'rgb(148,159,184)'
    },
    inputWrapper: {
        height: 45,
        width: Dimensions.get('window').width - 60,
        marginTop: 15,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: '#D9DbE1',
        borderWidth: 1
    },
    inputUnit: {
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'rgb(40,46,60)',
        marginLeft: 15
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: 'rgb(40,46,60)'
    },
    numWrapper: {
        height: 45,
        width: Dimensions.get('window').width - 60,
        borderBottomColor: '#EDEDED',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    btnTrade: {
        marginTop: 5,
        height: 40,
        width: Dimensions.get('window').width - 60,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTradeText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    unitPrice: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 12,
        color: 'rgb(133,133,133)',
        alignSelf: 'flex-start',
        marginLeft: 15,
        marginTop: 10
    },
    paymentContainer: {
        height: 40,
        width: Dimensions.get('window').width - 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentTitle: {
        fontFamily: 'PingFang-SC-Regular',
        fontSize: 15,
        color: 'rgb(40,46,60)',
        textAlignVertical: 'center',
        fontWeight: 'bold'
    },
    noBindPayText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 13,
        color: 'rgb(64,99,213)',
        textAlignVertical: 'center',
        textAlign: 'right'
    },
    fee: {
        height: 20,
        width: Dimensions.get('window').width - 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    feeText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 12,
        color: 'rgb(133,133,133)',
    }
});