import React, { Component, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableHighlight,
    Image,
    Dimensions,
    StyleSheet,
    Clipboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../../../../component/header';
import SellerInfo from './SellerInfo';
import AssetsInfo from './AssetsInfo';
import Api from '../../../../socket/index';
import Colors from '../../../../global/Colors';
import Select from '../../../../component/select';
import Toast from '../../../../component/toast';

function InfoBanner(props) {
    return (
        <View style={styles.infoTab}>
            <Image style={{ height: 85, width: 85 }} source={props.source} />
            <View style={{ marginLeft: 15 }}>
                <Text style={styles.infoTabTitle} >{props.title}</Text>
                <Text style={styles.infoTabContext}>{props.remark}</Text>
            </View>
        </View>
    );
}

function ItemDisplay(props) {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{props.title}</Text>
            <Text style={styles.itemContext}>{props.context}</Text>
        </View>
    )
}

function ItemDisplayWithCopy(props) {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{props.title}</Text>
            <TouchableHighlight underlayColor='transparent' onPress={() => props.callback(props.context)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.itemContext}>{props.context}</Text>
                    <Image style={{ height: 15, width: 15, marginLeft: 10 }} source={require('../../../../image/usual/copy.png')} />
                </View>
            </TouchableHighlight>
        </View>
    )
}

function ItemDisplayQrCode(props) {
    return (
        <TouchableHighlight underlayColor='transparent' onPress={props.callback}>
            <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{props.title}</Text>
                <Image style={{ height: 22, width: 22 }} source={require('../../../../image/usual/qrCode.png')} />
            </View>
        </TouchableHighlight>
    )
}

function AliPayInfo(props) {//uuid: props.info.uui memo:props.info.memo
    const setClipboard = (value) => {
        Clipboard.setString(`${value}`);
        Toast.show('复制成功');
    }
    const toQrCode = () => {

    }
    return (
        <View>
            <ItemDisplay title='收款人' context={props.info.realName} />
            <ItemDisplay title='支付宝昵称' context={props.info.nickName} />
            <ItemDisplayWithCopy title='支付宝账号' context={props.info.no} callback={setClipboard} />
            <ItemDisplayQrCode title='收款二维码' callback={toQrCode} />
        </View>
    )
}
function WechatPayInfo(props) {
    const setClipboard = (value) => {
        Clipboard.setString(`${value}`);
        Toast.show('复制成功');
    }
    const toQrCode = () => {

    }
    return (
        <View>
            <ItemDisplay title='收款人' context={props.info.realName} />
            <ItemDisplay title='微信昵称' context={props.info.nickName} />
            <ItemDisplayWithCopy title='微信账号' context={props.info.no} callback={setClipboard} />
            <ItemDisplayQrCode title='收款二维码' callback={toQrCode} />
        </View>
    )
}
function BankCardInfo(props) {
    const setClipboard = (value) => {
        Clipboard.setString(`${value}`);
        Toast.show('复制成功');
    }
    return (
        <View>
            <ItemDisplay title='收款人' context={props.info.realName} />
            <ItemDisplay title='银行名称' context={props.info.bank} />
            <ItemDisplay title='开户支行' context={props.info.branch} />
            <ItemDisplayWithCopy title='银行卡号' context={props.info.card} callback={setClipboard} />
        </View>
    )
}

function PaymentSelect(props) {
    if (props.orderType === 0) {
        switch (props.payState) {
            case 0:
            case 7:
                {
                    if (props.payment.length == 0) {
                        return null;
                    }
                    return (
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                                    <Select.ScrollLinear
                                        data={props.payment}
                                        isFlex={true}
                                        style={{ backgroundColor: 'white' }}
                                        selectValue={props.paymentSelect}
                                        selectChange={props.selectChange}
                                        isControl
                                    />
                                    {props.paymentSelect === 0 &&
                                        <AliPayInfo info={props.sellerInfo.aliPayInfo} />
                                    }
                                    {props.paymentSelect === 1 &&
                                        <WechatPayInfo info={props.sellerInfo.weixinPayInfo} />
                                    }
                                    {props.paymentSelect === 2 &&
                                        <BankCardInfo info={props.sellerInfo.bankPayInfo} />
                                    }
                                </View>
                            </View>
                            <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                                <TouchableHighlight onPress={props.appeal} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(29,36,52)' }}>
                                    <Text style={styles.bottomBtnText}>联系卖家</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={props.cancel} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                    <Text style={styles.bottomBtnText}>取消订单</Text>
                                </TouchableHighlight>
                                <LinearGradient style={{ flex: 8 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                    <TouchableHighlight onPress={props.buyerConfirm} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <Text style={styles.bottomBtnText}>确认付款</Text>
                                    </TouchableHighlight>
                                </LinearGradient>
                            </View>
                        </View>
                    );
                }
            case 1://确认已付款
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_complete.png')}
                                title='您已确认付款'
                                remark='卖方确认收款中,请耐心等待'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系卖家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>返回首页</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 8://收款超时
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_complete.png')}
                                title='确认收款超时'
                                remark='卖方确认收款超时,您可联系卖家或发起申诉'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系卖家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.addAppeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>发起申诉</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 4://已确认收款
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_complete.png')}
                                title='已确认收款'
                                remark='卖方已确认收款'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系卖家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>返回首页</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 5://完成
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_complete.png')}
                                title='订单已完成'
                                remark='订单已完成,若有疑问请联系客服处理'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系卖家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>返回首页</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 2://取消
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_cancel.png')}
                                title='订单已取消'
                                remark='如对该订单有疑问,可联系在线客服'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系卖家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>返回首页</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 6://申诉中
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_Appeal.png')}
                                title='订单申诉中'
                                remark='该订单存在纠纷,官方正在介入中'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>查看申诉</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
        }
    } else if (props.orderType === 1) {//卖房
        switch (props.payState) {
            case 0://待支付
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_Appeal.png')}
                                title='订单待支付'
                                remark='请等待买家进行支付'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>返回首页</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                )
            case 7://支付超时
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_overtime.png')}
                                title='订单支付超时'
                                remark='买家支付超时,您可联系买家,或进行申诉'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.addAppeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>发起申诉</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 1://确认已付款
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_complete.png')}
                                title='买家已确认付款'
                                remark='请尽快确认钱款是否到账'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.sellerConfirm} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>确认收款</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 8://确认收款超时
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_overtime.png')}
                                title='确认收款超时'
                                remark='可继续确认收款或发起申诉'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(29,36,52)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={props.addAppeal} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>发起申诉</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 8 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.sellerConfirm} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>确认收款</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 4://已确认收款
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_complete.png')}
                                title='已确认收款'
                                remark='您已确认收款'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>返回首页</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 5://完成
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_complete.png')}
                                title='订单已完成'
                                remark='订单已完成,若有疑问请联系客服处理'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>返回首页</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 2://取消
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_cancel.png')}
                                title='订单已取消'
                                remark='如对该订单有疑问,可联系在线客服'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.goBack} style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>返回首页</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
            case 6://申诉中
                return (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <InfoBanner
                                source={require('../../../../image/otc/orderState/Order_Appeal.png')}
                                title='订单申诉中'
                                remark='该订单存在纠纷,官方正在介入中'
                            />
                        </View>
                        <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <TouchableHighlight onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight>
                            <LinearGradient style={{ flex: 2 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight onPress={props.appeal} style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>查看申诉</Text>
                                </TouchableHighlight>
                            </LinearGradient>
                        </View>
                    </View>
                );
        }
    }
}

export default class OrderDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        payState: 0,//0 待支付 1:已完成 2:已取消
        orderType: 0, //0买 1卖

        orderNo: '',
        amount: '',
        price: '',
        legalAmount: '',
        fiat: '',
        token: '',

        sellerInfo: {},
        buyerInfo: {},
        payment: [],
        paymentSelect: ''
    }

    _orderInfoUpdate = (orderNum) => {
        Api.queryOrderById(orderNum, (result) => {
            let payload = {
                payState: result.orderStatus,
                orderType: result.orderType,

                orderNo: result.orderNo,
                amount: result.amount,
                price: result.price,
                legalAmount: result.legalAmount,
                fiat: result.fiat,
                token: result.token,
                sellerInfo: result.sellerInfo,
                buyerInfo: result.buyerInfo
            };
            if (result.sellerInfo) {
                let payment = [];
                if (result.sellerInfo.aliPayInfo) {
                    payment.push({ title: '支付宝', key: 0 });
                }
                if (result.sellerInfo.weixinPayInfo) {
                    payment.push({ title: '微信', key: 1 });
                }
                if (result.sellerInfo.bankPayInfo) {
                    payment.push({ title: '银行卡', key: 2 });
                }
                payload.payment = payment;
                payload.paymentSelect = payment[0].key;
            }
            this.setState(payload);
        });
    }

    componentDidMount() {
        const orderNum = this.props.navigation.getParam('orderNum', '');
        if (orderNum) {
            this._orderInfoUpdate(orderNum);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={{ flex: 1, backgroundColor: '#F2F2F2', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white' }}>
                        <Header.Normal
                            title='订单详情'
                            goback={() => this.props.navigation.goBack()}
                        />
                    </View>
                    <SellerInfo
                        orderType={this.state.orderType}
                        sellerInfo={this.state.sellerInfo ? this.state.sellerInfo : {}}
                        buyerInfo={this.state.buyerInfo ? this.state.buyerInfo : {}}
                        seeDetail={this.goToDetailInfo}
                    />
                    <AssetsInfo
                        orderNo={this.state.orderNo}
                        legalAmount={this.state.legalAmount}
                        payState={this.state.payState}
                        price={this.state.price}
                        amount={this.state.amount}
                        fiat={this.state.fiat}
                        token={this.state.token}
                    />
                    <PaymentSelect
                        payState={this.state.payState}
                        orderType={this.state.orderType}
                        sellerInfo={this.state.sellerInfo}
                        buyerInfo={this.state.buyerInfo}

                        payment={this.state.payment}
                        paymentSelect={this.state.paymentSelect}
                        selectChange={this.selectChange}

                        goBack={() => this.props.navigation.pop()}
                        buyerConfirm={this.buyerConfirm}
                        sellerConfirm={this.sellerConfirm}
                        appeal={this.goToAppeal}
                        addAppeal={this.addAppeal}
                        cancel={this.cancel}
                    />
                </View>
            </SafeAreaView>
        );
    }

    selectChange = (item) => {
        this.setState({
            paymentSelect: item.key
        });
    }

    buyerConfirm = () => {
        Api.buyerConfirmOrder(this.state.orderNo, this.state.paymentSelect, () => {
            Toast.show('您已经确认付款！');
            this._orderInfoUpdate(this.state.orderNo);
        }, (result, code, message) => {
            let msg = message ? message : '确认付款失败！';
            Toast.show(msg);
        });
    }

    sellerConfirm = () => {
        Api.sellerConfirmOrder(this.state.orderNo, () => {
            Toast.show('您已经确认收款！');
            this._orderInfoUpdate(this.state.orderNo);
        }, (result, code, message) => {
            let msg = message ? message : '确认付款失败！';
            Toast.show(msg);
        })
    }

    cancel = () => {
        Api.cancelOrder(this.state.orderNo, () => {
            Toast.show('订单取消成功')
            this._orderInfoUpdate(this.state.orderNo);
        }, (result, code, message) => {
            let msg = message ? message : '取消订单失败！';
            Toast.show(msg)
        })
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    goToDetailInfo = () => {
        let sellerInfoStr = JSON.stringify(this.state.sellerInfo);
        if (this.state.orderType === 1) {
            sellerInfoStr = JSON.stringify(this.state.buyerInfo);
        }
        this.props.navigation.navigate('OTC_SellerDetailInfo', { sellerInfoStr });
    }

    goToAppeal = () => {

        this.props.navigation.navigate('Appeal', { orderId: this.state.orderNo, orderType: this.state.orderType });
    }

    addAppeal = () => {//此处提交证据的都为发起者
        this.props.navigation.navigate('AddAppeal', { type: 'source', orderId: this.state.orderNo });
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.MAIN_BG_COLOR,
        flexDirection: 'column',
        alignItems: 'center'
    },
    container: {
        height: 50,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoTab: {
        height: 142,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoTabTitle: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 16,
        color: 'rgb(40,46,60)'
    },
    infoTabContext: {
        marginTop: 15,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 12,
        color: 'rgb(133,133,133)'
    },
    bottomBtnText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'white'
    },
    itemContainer: {
        height: 40,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemTitle: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 13,
        color: 'rgb(133,133,133)'
    },
    itemContext: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)'
    }
});