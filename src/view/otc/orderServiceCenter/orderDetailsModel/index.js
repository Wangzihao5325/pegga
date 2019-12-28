import React, { Component, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableHighlight,
    Image,
    Dimensions,
    StyleSheet,
    Clipboard,
    Linking
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from '../../../../component/header';
import SellerInfo from './SellerInfo';
import AssetsInfo from './AssetsInfo';
import Api from '../../../../socket/index';
import Colors from '../../../../global/Colors';
import Select from '../../../../component/select';
import Toast from '../../../../component/toast';
import NavigationService from '../../../../app/router/NavigationService';

const DetailBtn = (props) => {
    return (
        <TouchableHighlight style={{ height: 50, width: 40 }} onPress={props.onPress} underlayColor='transparent'>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: 29, width: 29 }} source={props.source} />
                <Text style={{ fontSize: 14, color: 'rgb(133,133,133)', fontFamily: 'PingFang-SC-Medium' }}>{`${props.title}`}</Text>
            </View>
        </TouchableHighlight>
    )
}

function ItemDisplay(props) {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{props.title}</Text>
            <Text style={styles.itemContext}>{props.context}</Text>
        </View>
    )
}

function InfoBanner(props) {
    return (
        <View style={{ backgroundColor: 'white' }}>
            {typeof props.tradeMemo == 'string' && <ItemDisplay title='支付备注' context={props.tradeMemo} />}
            {typeof props.tradeMemo == 'string' && <View style={{ height: 1, width: Dimensions.get('window').width, backgroundColor: '#EDEDED' }} />}
            <View style={styles.infoTab}>
                <Image style={{ height: 85, width: 85 }} source={props.source} />
                <View style={{ marginLeft: 15 }}>
                    <Text style={styles.infoTabTitle} >{props.title}</Text>
                    <Text style={styles.infoTabContext}>{props.remark}</Text>
                </View>
            </View>
        </View>
    );
}

function ItemDisplayWithCopy(props) {
    let contextShow = props.context ? props.context : '';
    if (contextShow.length >= 40) {
        contextShow = `${props.context.substr(0, 37)}...`;
    }
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{props.title}</Text>
            <TouchableHighlight underlayColor='transparent' onPress={() => props.callback(props.context)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text ellipsizeMode='middle' style={styles.itemContext}>{contextShow}</Text>
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

function USDTPayInfo(props) {
    const setClipboard = (value) => {
        Clipboard.setString(`${value}`);
        Toast.show('复制成功');
    }
    let platformText = '';
    switch (props.usdtType) {
        case 0:
            platformText = '火币';
            break;
        case 1:
            platformText = '币安';
            break;
        case 2:
            platformText = 'OKEx';
            break;
        default:
            break;
    }

    return (
        <View>
            <ItemDisplay title='付款平台' context={platformText} />
            <ItemDisplayWithCopy title='付款地址' context={props.url} callback={setClipboard} />
        </View>
    )
}

function AliPayInfo(props) {//uuid: props.info.uui memo:props.info.memo
    const setClipboard = (value) => {
        Clipboard.setString(`${value}`);
        Toast.show('复制成功');
    }
    const toQrCode = () => {
        NavigationService.navigate('ImageDetail', { uri: props.info.qrCode });

    }
    return (
        <View style={{ height: 170, width: Dimensions.get('window').width, backgroundColor: 'white', display: 'flex', alignItems: 'center' }}>
            <TouchableHighlight style={{ height: 100, width: 100, marginTop: 15 }} underlayColor='transparent' onPress={toQrCode}>
                <Image style={{ height: 100, width: 100 }} source={{ uri: props.info.qrCode }} />
            </TouchableHighlight>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Text style={{ fontFamily: 'PingFang-SC-Medium', fontSize: 15, color: 'rgb(133,133,133)' }}>付款备注</Text>
                <Text style={{ marginLeft: 8, marginRight: 10, fontFamily: 'PingFang-SC-Medium', fontSize: 15, color: 'black' }}>{`${props.tradeMemo}`}</Text>
                <TouchableHighlight
                    underlayColor='rgb(227,234,247)'
                    style={{ height: 22, width: 45, backgroundColor: 'rgb(227,234,247)', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => setClipboard(props.tradeMemo)}
                >
                    <Text style={{ fontSize: 12, color: 'rgb(64,99,213)', fontFamily: 'PingFang-SC-Medium' }}>复制</Text>
                </TouchableHighlight>
            </View>
            {/* <ItemDisplay title='收款人' context={props.info.realName} />
            <ItemDisplay title='支付宝昵称' context={props.info.nickName} />
            <ItemDisplayWithCopy title='支付宝账号' context={props.info.no} callback={setClipboard} />
            <ItemDisplayQrCode title='收款二维码' callback={toQrCode} />
            <ItemDisplay title='支付备注' context={props.tradeMemo} /> */}
        </View>
    )
}
function WechatPayInfo(props) {
    const setClipboard = (value) => {
        Clipboard.setString(`${value}`);
        Toast.show('复制成功');
    }
    const toQrCode = () => {
        NavigationService.navigate('ImageDetail', { uri: props.info.qrCode });

    }
    return (
        <View style={{ height: 170, width: Dimensions.get('window').width, backgroundColor: 'white', display: 'flex', alignItems: 'center' }}>
            <TouchableHighlight style={{ height: 100, width: 100, marginTop: 15 }} underlayColor='transparent' onPress={toQrCode}>
                <Image style={{ height: 100, width: 100 }} source={{ uri: props.info.qrCode }} />
            </TouchableHighlight>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Text style={{ fontFamily: 'PingFang-SC-Medium', fontSize: 15, color: 'rgb(133,133,133)' }}>付款备注</Text>
                <Text style={{ marginLeft: 8, marginRight: 10, fontFamily: 'PingFang-SC-Medium', fontSize: 15, color: 'black' }}>{`${props.tradeMemo}`}</Text>
                <TouchableHighlight
                    underlayColor='rgb(227,234,247)'
                    style={{ height: 22, width: 45, backgroundColor: 'rgb(227,234,247)', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                    onPress={() => setClipboard(props.tradeMemo)}
                >
                    <Text style={{ fontSize: 12, color: 'rgb(64,99,213)', fontFamily: 'PingFang-SC-Medium' }}>复制</Text>
                </TouchableHighlight>
            </View>
            {/* <ItemDisplay title='收款人' context={props.info.realName} />
            <ItemDisplay title='微信昵称' context={props.info.nickName} />
            <ItemDisplayWithCopy title='微信账号' context={props.info.no} callback={setClipboard} />
            <ItemDisplayQrCode title='收款二维码' callback={toQrCode} />
            <ItemDisplay title='支付备注' context={props.tradeMemo} /> */}
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
            <ItemDisplayWithCopy title='银行卡号' context={props.info.card} callback={() => setClipboard(props.info.card)} />
            <ItemDisplayWithCopy title='付款备注' context={props.tradeMemo} callback={() => setClipboard(props.tradeMemo)} />
        </View>
    )
}

function PaymentSelect(props) {
    if (props.orderType === 0) {
        switch (props.payState) {
            case 0:
                {
                    if (props.adId == -1) {
                        return (
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                                        <USDTPayInfo usdtType={props.usdtType} url={props.url} />
                                    </View>
                                </View>
                                <View style={styles.bottomContainer}>
                                    <DetailBtn onPress={props.cancel} source={require('../../../../image/otc/cancel_order.png')} title='取消' />
                                    {/* <TouchableHighlight onPress={props.contact} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(29,36,52)' }}>
                                        <Text style={styles.bottomBtnText}>联系卖家</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={props.cancel} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                        <Text style={styles.bottomBtnText}>取消订单</Text>
                                    </TouchableHighlight> */}
                                    <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30 - 40 - 15, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                        <TouchableHighlight underlayColor='transparent' onPress={props.buyerConfirm} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                            <Text style={styles.bottomBtnText}>确认付款</Text>
                                        </TouchableHighlight>
                                    </LinearGradient>
                                </View>
                            </View>
                        );
                    }
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
                                        <AliPayInfo tradeMemo={props.tradeMemo} info={props.sellerInfo.aliPayInfo} />
                                    }
                                    {props.paymentSelect === 1 &&
                                        <WechatPayInfo tradeMemo={props.tradeMemo} info={props.sellerInfo.weixinPayInfo} />
                                    }
                                    {props.paymentSelect === 2 &&
                                        <BankCardInfo tradeMemo={props.tradeMemo} info={props.sellerInfo.bankPayInfo} />
                                    }
                                </View>
                            </View>
                            <View style={styles.bottomContainer}>
                                <DetailBtn onPress={props.cancel} source={require('../../../../image/otc/cancel_order.png')} title='取消' />
                                {/* <TouchableHighlight onPress={props.contact} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(29,36,52)' }}>
                                    <Text style={styles.bottomBtnText}>联系卖家</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={props.cancel} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                    <Text style={styles.bottomBtnText}>取消订单</Text>
                                </TouchableHighlight> */}
                                <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30 - 40 - 15, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                    <TouchableHighlight underlayColor='transparent' onPress={props.buyerConfirm} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <Text style={styles.bottomBtnText}>确认付款</Text>
                                    </TouchableHighlight>
                                </LinearGradient>
                            </View>
                        </View>
                    );
                }
            case 7://支付超时
                {
                    if (props.adId == -1) {
                        return (
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1 }}>
                                    <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                                        <USDTPayInfo usdtType={props.usdtType} url={props.url} />
                                    </View>
                                </View>
                                <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                                    {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(29,36,52)' }}>
                                        <Text style={styles.bottomBtnText}>联系卖家</Text>
                                    </TouchableHighlight>
                                     <TouchableHighlight onPress={props.cancel} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                        <Text style={styles.bottomBtnText}>取消订单</Text>
                                    </TouchableHighlight>  */}
                                    <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                        <TouchableHighlight underlayColor='transparent' onPress={props.cancel} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                            <Text style={styles.bottomBtnText}>取消订单</Text>
                                        </TouchableHighlight>
                                    </LinearGradient>
                                </View>
                            </View>
                        );
                    }
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
                                        <AliPayInfo tradeMemo={props.tradeMemo} info={props.sellerInfo.aliPayInfo} />
                                    }
                                    {props.paymentSelect === 1 &&
                                        <WechatPayInfo tradeMemo={props.tradeMemo} info={props.sellerInfo.weixinPayInfo} />
                                    }
                                    {props.paymentSelect === 2 &&
                                        <BankCardInfo tradeMemo={props.tradeMemo} info={props.sellerInfo.bankPayInfo} />
                                    }
                                </View>
                            </View>
                            <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                                {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(29,36,52)' }}>
                                    <Text style={styles.bottomBtnText}>联系卖家</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={props.cancel} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                    <Text style={styles.bottomBtnText}>取消订单</Text>
                                </TouchableHighlight> */}
                                <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                    <TouchableHighlight underlayColor='transparent' onPress={props.cancel} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                        <Text style={styles.bottomBtnText}>取消订单</Text>
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
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系卖家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系卖家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.addAppeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系卖家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系卖家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系卖家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.appeal} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                                tradeMemo={props.tradeMemo}
                            />
                        </View>
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.sellerConfirm} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>确认收款</Text>
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
                                tradeMemo={props.tradeMemo}
                            />
                        </View>
                        <View style={styles.bottomContainer}>
                            <DetailBtn onPress={props.addAppeal} source={require('../../../../image/otc/appeal_order.png')} title='申诉' />
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.sellerConfirm} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                                    <Text style={styles.bottomBtnText}>确认收款</Text>
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
                                tradeMemo={props.tradeMemo}
                            />
                        </View>
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.sellerConfirm} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                                tradeMemo={props.tradeMemo}
                            />
                        </View>
                        <View style={styles.bottomContainer}>
                            <DetailBtn onPress={props.addAppeal} source={require('../../../../image/otc/appeal_order.png')} title='申诉' />
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(29,36,52)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={props.addAppeal} style={{ flex: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>发起申诉</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30 - 40 - 15, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.sellerConfirm} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.goBack} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.goBack} style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
                        <View style={[styles.bottomContainer, { justifyContent: 'center' }]}>
                            {/* <TouchableHighlight onPress={props.contact} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                                <Text style={styles.bottomBtnText}>联系买家</Text>
                            </TouchableHighlight> */}
                            <LinearGradient style={{ height: 50, width: Dimensions.get('window').width - 30, borderRadius: 5 }} colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <TouchableHighlight underlayColor='transparent' onPress={props.appeal} style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
        adId: 0,
        usdtType: 0, //0->火币 1->币安 2->OKEx
        url: '',

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
        paymentSelect: '',

        orderAppealCountLastMonth: 0,
        orderFilledCountLastMonth: 0,
        orderWinAppealCountLastMonth: 0,
        tradeMemo: '',
        isMatch: false
    }

    _orderInfoUpdate = (orderNum) => {
        Api.queryOrderById(orderNum, (result) => {
            let payload = {
                //usdt订单使用
                adId: result.advertiseId,
                usdtType: result.usdtType,
                url: result.url,

                payState: result.orderStatus,
                orderType: result.orderType,

                orderNo: result.orderNo,
                amount: result.amount,
                price: result.price,
                legalAmount: result.legalAmount,
                fiat: result.fiat,
                token: result.token,
                sellerInfo: result.sellerInfo,
                buyerInfo: result.buyerInfo,
                tradeMemo: result.memo,
                isMatch: result.isMatch,// true:toB false:toC
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
                if (result.advertiseId == -1) {//USDT订单 支付方式传null
                    payload.paymentSelect = null;
                } else {
                    payload.paymentSelect = payment[0].key;
                }
            }
            this.setState(payload);
            this._sellerInfoUpdate();
        });
    }

    _sellerInfoUpdate = () => {
        let oppoNo = '';
        if (this.state.orderType === 0) {
            oppoNo = this.state.sellerInfo.sellerNo;
        } else {
            oppoNo = this.state.buyerInfo.buyerNo;
        }
        Api.otherUserInfoById(oppoNo, (result, code, msg) => {
            this.setState({
                orderAppealCountLastMonth: result.orderAppealCountLastMonth,
                orderFilledCountLastMonth: result.orderFilledCountLastMonth,
                orderWinAppealCountLastMonth: result.orderWinAppealCountLastMonth,
            });
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
                        orderAppealCountLastMonth={this.state.orderAppealCountLastMonth}
                        orderFilledCountLastMonth={this.state.orderFilledCountLastMonth}
                        orderWinAppealCountLastMonth={this.state.orderWinAppealCountLastMonth}
                    />
                    <AssetsInfo
                        orderNo={this.state.orderNo}
                        legalAmount={this.state.legalAmount}
                        payState={this.state.payState}
                        price={this.state.price}
                        amount={this.state.amount}
                        fiat={this.state.fiat}
                        token={this.state.token}
                        isMatch={this.state.isMatch}
                    />
                    <PaymentSelect
                        adId={this.state.adId}
                        usdtType={this.state.usdtType}
                        url={this.state.url}

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
                        contact={this.concat}
                        tradeMemo={this.state.tradeMemo}
                    />
                </View>
            </SafeAreaView>
        );
    }

    concat = () => {
        let userNo = this.state.buyerInfo ? this.state.buyerInfo.buyerNo : this.state.sellerInfo.sellerNo;
        Api.otherUserInfoById(userNo, (result) => {
            if (result.mobileContact) {
                Linking.canOpenURL(`tel:${result.mobileContact}`).then((supported) => {
                    if (!supported) {
                        Toast.show('该设备不支持拨打电话');
                    } else {
                        Linking.openURL(`tel:${result.mobileContact}`);
                    }
                })
            } else {
                Toast.show('对方暂时没有留下联系方式');
            }
        })
    }

    selectChange = (item) => {
        this.setState({
            paymentSelect: item.key
        });
    }

    _buyerConfirmCallback = () => {
        Api.buyerConfirmOrder(this.state.orderNo, this.state.paymentSelect, () => {
            Toast.show('您已经确认付款！');
            this._orderInfoUpdate(this.state.orderNo);
        });
    }

    buyerConfirm = () => {
        this.props.navigation.navigate('PopModel', {
            confirm: () => this._buyerConfirmCallback(),
            confirmText: '确认',
            title: '付款确认',
            context: '是否已经将钱款支付给对方'
        });
    }

    _sellerConfirmcallback = () => {
        Api.sellerConfirmOrder(this.state.orderNo, () => {
            Toast.show('您已经确认收款！');
            this._orderInfoUpdate(this.state.orderNo);
        })
    }

    sellerConfirm = () => {
        this.props.navigation.navigate('PopModel', {
            confirm: () => this._sellerConfirmcallback(),
            confirmText: '确认',
            title: '收款确认',
            context: '是否确认已经收到对方支付的钱款'
        });
    }

    cancel = () => {
        Api.cancelOrder(this.state.orderNo, () => {
            Toast.show('订单取消成功')
            this._orderInfoUpdate(this.state.orderNo);
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
        if (this.state.adId == -1) {
            Toast.show('USDT订单暂不支持申诉功能');
            return;
        }
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
        color: 'rgb(40,46,60)',
    },
    bottomContainer: {
        height: 70,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        justifyContent: 'space-between',
        backgroundColor: 'white'
    }
});