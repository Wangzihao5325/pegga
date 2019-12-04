import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput, Dimensions, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Api from '../../../../socket/index';
import Colors from '../../../../global/Colors';
import Btn from '../../../../component/btn';
import Value2Str from '../../../../global/util/MapValue2Str';
import Header from './Header';
import Item from './Item';
import Toast from '../../../../component/toast';

const PRICE_TYPE = [{ select: true, title: '固定价格', key: 0 }, { select: false, title: '灵活定价', key: 1 }];

class NewAd extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        tradeType: 0,               // 0 买 1 卖
        customType: 0,              // advertiseLevel => 0 toc 1 tob
        coinType: 'PQC',
        currencyType: 'CNY',
        priceType: PRICE_TYPE[0],   //0 固定价格 1 灵活定价
        priceTypeData: PRICE_TYPE,
        editable: false,             //editable由priceType决定 0 false 1 true


        inputPrice: '',
        inputTradeNum: '',
        inputMinTrade: '',
        inputMaxTrade: '',
        MEMO: '',

        autoFillPrice: '',
        autoFillMin: '',
        autoFillMax: '',
        priceScopeId: 0,

        payType: [],
        payTypeData: [],
        assetsPassword: '',
        googlePassword: '',

        adNo: null,
    }

    componentDidMount() {
        let iconRatePayload = { dealType: this.state.tradeType, fiat: this.state.currencyType, token: this.state.coinType };
        const itemStr = this.props.navigation.getParam('itemStr', '');
        if (itemStr) {
            let itemData = JSON.parse(itemStr);
            let payArr = itemData.payType.split(',');
            let reg = [];
            payArr.every((item) => {
                switch (item) {
                    case '0':
                        reg.push({ select: true, title: "支付宝", key: "aliPay" });
                        break;
                    case '1':
                        reg.push({ select: true, title: "微信", key: "weChat" });
                        break;
                    case '2':
                        reg.push({ select: true, title: "银行卡", key: "bankCard" });
                        break;
                    default:
                        break;
                }
                return true;
            });

            let reg2 = this.props.passedPayment.map((item) => {
                switch (item.key) {
                    case 'aliPay':
                        {
                            let itemCopy = _.assign({}, item);
                            if (payArr.indexOf('0') >= 0) {
                                itemCopy.select = true;
                            } else {
                                itemCopy.select = false;
                            }
                            return itemCopy;
                        }
                    case 'weChat':
                        {
                            let itemCopy = _.assign({}, item);
                            if (payArr.indexOf('1') >= 0) {
                                itemCopy.select = true;
                            } else {
                                itemCopy.select = false;
                            }
                            return itemCopy;
                        }
                    case 'bankCard':
                        {
                            let itemCopy = _.assign({}, item);
                            if (payArr.indexOf('2') >= 0) {
                                itemCopy.select = true;
                            } else {
                                itemCopy.select = false;
                            }
                            return itemCopy;
                        }
                    default:
                        return item;
                }
            });

            iconRatePayload.dealType = itemData.type;
            //iconRatePayload.fiat = itemData.origin;
            iconRatePayload.token = itemData.token;

            this.setState({
                tradeType: itemData.type,
                customType: itemData.origin,
                coinType: itemData.token,
                MEMO: itemData.remark,
                inputPrice: `${itemData.price}`,
                inputMaxTrade: `${itemData.maxLimit}`,
                inputMinTrade: `${itemData.minLimit}`,
                inputTradeNum: `${itemData.amount}`,
                priceType: { select: true, title: '灵活定价', key: 1 },
                priceTypeData: [{ select: false, title: '固定价格', key: 0 }, { select: true, title: '灵活定价', key: 1 }],
                editable: true,
                payTypeData: reg2,
                payType: reg,
                adNo: itemData.advertiseNo
            });
        } else {
            this.setState({
                payTypeData: this.props.passedPayment,
                payType: this.props.passedPayment,
            });
        }
        Api.iconRate(iconRatePayload, (result) => {
            let regArr = result.filter((item) => {
                return item.token == this.state.coinType
            });
            this.setState({
                autoFillPrice: typeof regArr[0].rate == 'number' ? `${regArr[0].rate}` : '暂无系统定价',//'暂无系统定价'
                autoFillMin: typeof regArr[0].minLimit == 'number' ? `${regArr[0].minLimit}` : '100',
                autoFillMax: typeof regArr[0].maxLimit == 'number' ? `${regArr[0].maxLimit}` : '100000',
                priceScopeId: typeof regArr[0].priceScopeId == 'number' ? regArr[0].priceScopeId : 0,
            })
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header
                    navi={this.props.navigation}
                    tradeType={this.state.tradeType}
                    callback={this.tradeTypeChange}
                />
                <KeyboardAwareScrollView>
                    <View style={{ flex: 1, backgroundColor: '#F2F2F2', flexDirection: 'column', alignItems: 'center' }}>
                        <View style={{ paddingHorizontal: 15, marginHorizontal: 15, backgroundColor: 'white', borderRadius: 5, marginTop: 10 }}>
                            <Item.Select
                                bottomLine
                                title='交易对象'
                                defaultValue={this.state.customType}
                                callback={this.customSelectChange}
                            />
                            <Item.Btn
                                bottomLine
                                title='选择交易币种'
                                contextText={this.state.coinType}
                                callback={this.coinSelectChange}
                            />
                            <Item.Btn
                                bottomLine
                                title='选择法币单位'
                                contextText={this.state.currencyType}
                                callback={this.currencySelectChange}
                            />
                            <Item.Btn
                                bottomLine
                                title='价格类型'
                                contextText={this.state.priceType.title}
                                callback={this.priceTypeSelect}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginHorizontal: 15, backgroundColor: 'white', borderRadius: 5, marginTop: 10 }}>
                            <Item.Input
                                bottomLine
                                editable={this.state.editable}
                                title='价格'
                                unit={this.state.currencyType}
                                placeholder='请输入价格'
                                value={this.state.editable ? this.state.inputPrice : this.state.autoFillPrice}
                                callback={this.priceTextChange}
                                inputStyle={{ color: 'rgb(133,133,133)' }}
                            />
                            <Item.Input
                                title='交易数量'
                                unit={this.state.coinType}
                                placeholder='请输入数量'
                                value={this.state.inputTradeNum}
                                callback={this.tradeNumTextChange}
                                inputStyle={{ color: 'rgb(133,133,133)' }}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginHorizontal: 15, backgroundColor: 'white', borderRadius: 5, marginTop: 10 }}>
                            <Item.Input
                                bottomLine
                                editable={this.state.editable}
                                title='单笔最小成交额'
                                unit={this.state.currencyType}
                                placeholder='请输入最小成交额'
                                value={this.state.editable ? this.state.inputMinTrade : this.state.autoFillMin}
                                callback={this.minTradeTextChange}
                                inputStyle={{ color: 'rgb(133,133,133)' }}
                            />
                            <Item.Input
                                editable={this.state.editable}
                                title='单笔最大成交额'
                                unit={this.state.currencyType}
                                placeholder='请输入最大成交额'
                                value={this.state.editable ? this.state.inputMaxTrade : this.state.autoFillMax}
                                callback={this.maxTradeTextChange}
                                inputStyle={{ color: 'rgb(133,133,133)' }}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginHorizontal: 15, backgroundColor: 'white', borderRadius: 5, marginTop: 10 }}>
                            <Item.SelectType2
                                title='支付方式'
                                data={this.state.payType}
                                callback={this.payTypeSelect}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginHorizontal: 15, backgroundColor: 'white', borderRadius: 5, marginTop: 10 }}>
                            <Item.Input
                                secureTextEntry={true}
                                title='资金密码'
                                placeholder='请输入资金密码'
                                value={this.state.assetsPassword}
                                callback={this.assetsPasswordTextChange}
                                inputStyle={{ color: 'rgb(133,133,133)' }}
                            />
                        </View>
                        <View style={{ marginBottom: 10, marginHorizontal: 15, backgroundColor: 'white', borderRadius: 5, marginTop: 10 }}>
                            <View style={{ marginHorizontal: 15, height: 40, width: Dimensions.get('window').width - 60, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: 'rgb(73,73,73)', fontFamily: 'PingFang-SC-Medium' }}>备注(MEMO)</Text>
                            </View>
                            <TextInput
                                style={{ marginHorizontal: 15, marginBottom: 10, textAlignVertical: 'top', color: 'rgb(186,200,223)', width: Dimensions.get('window').width - 60, height: 40, borderRadius: 5, borderColor: '#C3C7D0', borderWidth: 1, padding: 5 }}
                                numberOfLines={1}
                                maxLength={30}
                                placeholder='输入备注信息'
                                placeholderTextColor='rgb(186,200,223)'
                                value={this.state.MEMO}
                                onChangeText={this.MEMOTextChange}
                            />
                            <View style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, paddingHorizontal: 15, height: 45, width: Dimensions.get('window').width - 30, backgroundColor: 'rgb(226,234,247)', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#4063D5', lineHeight: 20 }}>{'请仔细核对转账来源及转账备注，以免账号被冻结'}</Text>
                            </View>
                        </View>
                        <Btn.Linear
                            style={{ marginBottom: 20, marginTop: 10, borderRadius: 5, height: 40, width: Dimensions.get('window').width - 30, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            textStyle={{ color: 'white' }}
                            title={`立即${Value2Str.tradeType(this.state.tradeType)}`}
                            btnPress={this.publishNewAd}
                        />
                    </View>
                </KeyboardAwareScrollView>

            </SafeAreaView>
        );
    }

    publishNewAd = () => {
        let payType = this.state.payType.map((item) => {
            switch (item.key) {
                case 'aliPay':
                    return 0;
                case 'weChat':
                    return 1;
                case 'bankCard':
                    return 2;
            }
        });
        let payload = {
            amount: parseFloat(this.state.inputTradeNum),
            fiat: this.state.currencyType,
            maxLimit: parseFloat(this.state.priceType.key ? this.state.inputMaxTrade : this.state.autoFillMax),
            minLimit: parseFloat(this.state.priceType.key ? this.state.inputMinTrade : this.state.autoFillMin),
            payType,
            price: parseFloat(this.state.priceType.key ? this.state.inputPrice : this.state.autoFillPrice),
            priceType: this.state.priceType.key,
            remark: this.state.MEMO,
            token: this.state.coinType,
            tradePassword: this.state.assetsPassword
        };
        if (this.state.adNo) {//修改广告
            payload.advertiseNo = this.state.adNo;
            payload.origin = this.state.customType;
            Api.modifyAd(payload, () => {
                Toast.show('广告修改发布成功');
                this.props.navigation.pop();
                //this.props.navigation.navigate('AdManagementStack');
            }, (result, code, message) => {
                let msg = message ? message : '广告修改发布失败';
                Toast.show(msg);
            });
        } else {//发布广告
            switch (this.state.customType) {
                case 1:// to b
                    payload.priceScopeId = this.state.priceScopeId;
                    if (this.state.tradeType === 0) {
                        Api.publishTobAdBuy(payload, (result) => {
                            Toast.show('广告发布成功');
                            this.props.navigation.goBack();
                        }, (result, code, message) => {
                            let msg = message ? message : '广告发布失败';
                            Toast.show(msg);
                        });
                    } else if (this.state.tradeType === 1) {
                        Api.publishTobAdSell(payload, (result) => {
                            Toast.show('广告发布成功');
                            this.props.navigation.goBack();
                        }, (result, code, message) => {
                            let msg = message ? message : '广告发布失败';
                            Toast.show(msg);
                        });
                    }
                    break;
                case 0:// to c
                    if (this.state.tradeType === 0) {
                        Api.publishTocAdBuy(payload, (result) => {
                            Toast.show('广告发布成功');
                            this.props.navigation.goBack();
                        }, (result, code, message) => {
                            let msg = message ? message : '广告发布失败';
                            Toast.show(msg);
                        });
                    } else if (this.state.tradeType === 1) {
                        Api.publishTocAdSell(payload, (result) => {
                            Toast.show('广告发布成功');
                            this.props.navigation.goBack();
                        }, (result, code, message) => {
                            let msg = message ? message : '广告发布失败';
                            Toast.show(msg);
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    }


    tradeTypeChange = (item, index) => {
        if (this.state.adNo) {
            Toast.show('编辑广告不支持修改买/卖方向');
        } else {
            this.setState({
                tradeType: item.key
            });
            let iconRatePayload = { dealType: item.key, fiat: this.state.currencyType, token: this.state.coinType };
            Api.iconRate(iconRatePayload, (result) => {
                let regArr = result.filter((item) => {
                    return item.token == this.state.coinType
                });
                this.setState({
                    autoFillPrice: typeof regArr[0].rate == 'number' ? `${regArr[0].rate}` : '暂无系统定价',//'暂无系统定价'
                    autoFillMin: typeof regArr[0].minLimit == 'number' ? `${regArr[0].minLimit}` : '100',
                    autoFillMax: typeof regArr[0].maxLimit == 'number' ? `${regArr[0].maxLimit}` : '100000',
                    priceScopeId: typeof regArr[0].priceScopeId == 'number' ? regArr[0].priceScopeId : 0,
                })
            });
        }
    }

    customSelectChange = (key) => {
        if (this.state.adNo) {
            Toast.show('编辑广告不支持修改交易对象');
        } else {
            if (this.state.customType === 0 && this.state.priceType.key === PRICE_TYPE[1].key) {
                Toast.show('To B广告不支持灵活定价');
                this.setState({
                    customType: key,
                    priceType: PRICE_TYPE[0],
                    priceTypeData: PRICE_TYPE,
                    editable: PRICE_TYPE[0].key == 1
                });
            } else {
                this.setState({
                    customType: key
                });
            }
        }
    }

    coinSelectChange = (item, index) => {
        Toast.show('其他虚拟币种尚未开放，敬请期待！');
        // this.setState({
        //     coinType: item.key
        // });
    }

    currencySelectChange = (item, index) => {
        Toast.show('外币交易尚未开放，敬请期待！');
        // this.setState({
        //     currencyType: item.key
        // });
    }

    priceTypeSelect = () => {
        if (this.state.customType === 1 && this.state.priceType.key === PRICE_TYPE[0].key) {
            Toast.show('To B广告不支持灵活定价');
            return;
        }

        this.props.navigation.navigate('SelectModel',
            {
                data: JSON.stringify(this.state.priceTypeData),
                //type: 'multiple',
                title: '价格类型',
                callback: (selectDataArr, nowState) => {
                    this.setState({
                        priceType: selectDataArr[0],
                        priceTypeData: nowState,
                        editable: selectDataArr[0].key == 1
                    });
                }
            });
    }

    payTypeSelect = () => {
        if (this.state.payTypeData.length == 0) {
            Toast.show('没有可用的支付方式!');
            return;
        }
        if (this.state.payTypeData.length == 1) {
            Toast.show('没有多余的支付方式可供选择!');
            return;
        }
        this.props.navigation.navigate('SelectModelPay',
            {
                data: JSON.stringify(this.state.payTypeData),
                type: 'multiple',
                title: '支付方式',
                callback: (selectDataArr, nowState) => {
                    this.setState({
                        payType: selectDataArr,
                        payTypeData: nowState,
                    });
                }
            });
    }

    priceTextChange = (value) => {
        this.setState({
            inputPrice: value
        });
    }

    tradeNumTextChange = (value) => {
        this.setState({
            inputTradeNum: value
        });
    }

    minTradeTextChange = (value) => {
        this.setState({
            inputMinTrade: value
        });
    }

    maxTradeTextChange = (value) => {
        this.setState({
            inputMaxTrade: value
        });
    }

    MEMOTextChange = (value) => {
        this.setState({
            MEMO: value
        });
    }

    assetsPasswordTextChange = (value) => {
        this.setState({
            assetsPassword: value
        })
    }

    googlePasswordTextChange = (value) => {
        this.setState({
            googlePassword: value
        });
    }

}

const mapStateToProps = (store) => ({
    passedPayment: store.user.payment.passedPayment,
})

export default connect(mapStateToProps)(NewAd);


const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.MAIN_BG_COLOR,
        flexDirection: 'column',
    }
});