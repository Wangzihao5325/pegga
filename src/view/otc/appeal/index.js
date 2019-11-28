import React, { Component } from 'react';
import { SafeAreaView, ImageBackground, TouchableHighlight, Image, View, Text, Dimensions, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Api from '../../../socket';
import Header from '../../../component/header';
import Select from '../../../component/select';
import Item from '../../otc/tradingHall/newAd/Item';
import Toast from '../../../component/toast';
import Value2Str from '../../../global/util/MapValue2Str';
import EvidenceItem from './EvidenceItem';
import LinearGradient from 'react-native-linear-gradient';

function AppealInfo(props) {
    let beforeStatusTextArr = Value2Str.orderStateTextWithStyle(props.orderStatusBeforeAppeal, 13);
    let appealTypeText = Value2Str.appealStatusText(props.appealType);
    return (
        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 10, alignItems: 'center' }}>
            <KeyboardAwareScrollView>
                <Item.Input
                    titleStyle={styles.itemTitle}
                    contextStyle={styles.itemContext}
                    title='申诉订单号'
                    value={props.orderId}
                    editable={false}
                    bottomLine
                />
                <Item.Input
                    titleStyle={styles.itemTitle}
                    contextStyle={styles.itemContext}
                    title='发起方昵称'
                    value={props.sourceNickName}
                    editable={false}
                    bottomLine
                />
                <Item.Input
                    titleStyle={styles.itemTitle}
                    contextStyle={styles.itemContext}
                    title='对方昵称'
                    value={props.targetNickName}
                    editable={false}
                    bottomLine
                />
                <Item.Input
                    titleStyle={styles.itemTitle}
                    contextStyle={styles.itemContext}
                    title='对方姓名'
                    value={props.targetRealName}
                    editable={false}
                    bottomLine
                />
                <Item.Input
                    titleStyle={styles.itemTitle}
                    contextStyle={styles.itemContext}
                    title='支付备注'
                    value={props.orderMemo}
                    editable={false}
                    bottomLine
                />
                <Item.Input
                    titleStyle={styles.itemTitle}
                    contextStyle={styles.itemContext}
                    title='对方联系电话'
                    value={props.targetPhone}
                    editable={false}
                    bottomLine
                />
                <Item.Input
                    titleStyle={styles.itemTitle}
                    contextStyle={styles.itemContext}
                    title='申诉前订单状态'
                    value={beforeStatusTextArr.stateText}
                    editable={false}
                    bottomLine
                />
                <Item.Input
                    titleStyle={styles.itemTitle}
                    contextStyle={styles.itemContext}
                    title='申诉类型'
                    value={appealTypeText}
                    editable={false}
                    bottomLine
                />
            </KeyboardAwareScrollView>
        </View>
    );
}

function OrderInfo(props) {//payType
    let payTypeText = Value2Str.payType(props.payType);
    return (
        <View style={{ flex: 1, marginTop: 10, alignItems: 'center' }}>
            <KeyboardAwareScrollView>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 30 }} >
                    <Item.Input
                        titleStyle={styles.itemTitle}
                        contextStyle={styles.itemContext}
                        title='下单时间'
                        value={props.orderCreateTime}
                        editable={false}
                        bottomLine
                    />
                    <Item.Input
                        titleStyle={styles.itemTitle}
                        contextStyle={styles.itemContext}
                        title='确认支付时间'
                        value={props.orderPayConfirmTime}
                        editable={false}
                        bottomLine
                    />
                    <Item.Input
                        titleStyle={styles.itemTitle}
                        contextStyle={styles.itemContext}
                        title='申诉时间'
                        value={props.appealBeginTime}
                        editable={false}
                    />
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 10, paddingHorizontal: 30 }} >
                    <Item.Input
                        titleStyle={styles.itemTitle}
                        contextStyle={styles.itemContext}
                        title='交易单价'
                        value={`${props.price} ${props.fiat}/${props.token}`}
                        editable={false}
                        bottomLine
                    />
                    <Item.Input
                        titleStyle={styles.itemTitle}
                        contextStyle={styles.itemContext}
                        title='交易数量'
                        value={`${props.amount} ${props.token}`}
                        editable={false}
                        bottomLine
                    />
                </View>
                <View style={{ backgroundColor: 'white', marginTop: 10, paddingHorizontal: 30 }} >
                    <Item.Input
                        titleStyle={styles.itemTitle}
                        contextStyle={styles.itemContext}
                        title='支付方式'
                        value={payTypeText}
                        editable={false}
                        bottomLine
                    />
                    <Item.Input
                        titleStyle={styles.itemTitle}
                        contextStyle={styles.itemContextBlue}
                        title='交易金额'
                        value={`${props.legalAmount} ${props.fiat}`}
                        editable={false}
                        bottomLine
                    />
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}

function EvidenceInfo(props) {
    return (
        <View style={{ flex: 1 }}>
            {typeof props.sellerAppealReason == 'string' &&
                <EvidenceItem
                    role='卖方'
                    name={props.sellerName}
                    time={props.sellerAppealTime}
                    context={props.sellerAppealReason}
                    images={props.sellerAppealPics}
                />
            }
            {typeof props.buyerAppealReason == 'string' &&
                <EvidenceItem
                    role='买方'
                    name={props.buyerName}
                    time={props.buyerAppealTime}
                    context={props.buyerAppealReason}
                    images={props.buyerAppealPics}
                />
            }
        </View>
    );
}

export default class Appeal extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: 'appeal',//tab 页状态

        appealNo: '',//申诉id
        appealType: 0,//申诉类型
        appealBeginTime: '',

        buyerAppealPics: [],
        buyerAppealReason: '',
        buyerAppealTime: '',
        buyerName: '',

        sellerAppealPics: [],
        sellerAppealReason: '',
        sellerAppealTime: '',
        sellerName: '',

        sourceNickName: '',
        sourceNo: '',
        targetNickName: '',
        targetNo: '',
        targetPhone: '',
        targetRealName: '',
        targetAppeal: false,

        //orderType: 0,//0买1卖
        orderNo: '',
        orderPayConfirmTime: '',
        orderStatusBeforeAppeal: 0,
        orderCreateTime: '',
        orderMemo: '',
        amount: 0,
        fiat: '',
        token: '',
        legalAmount: 0,
        payType: 0,
        price: 0,

    }

    componentDidMount() {
        const orderId = this.props.navigation.getParam('orderId', '');
        //const orderType = this.props.navigation.getParam('orderType', 0);
        if (orderId) {
            Api.appealDetail(orderId, (result, code, msg) => {
                this.setState((oldState) => {
                    return {
                        ...oldState,
                        ...result,
                        // orderType: orderType
                    }
                });
            }, (result, code, msg) => {
                let message = msg ? msg : '获取申诉信息失败';
                Toast.show(`${message}`);
            })
        }
    }

    render() {
        let btnText = this.state.targetAppeal ? '上传证据' : '返回首页';
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
                    <View style={{ backgroundColor: 'white' }}>
                        <Header.Normal title='申诉详情' goback={() => this.props.navigation.goBack()} />
                    </View>
                    <ImageBackground style={styles.imageBg} source={require('../../../image/otc/appeal/Appeal_bg.png')}>
                        <Image style={{ height: 42, width: 42 }} source={require('../../../image/otc/appeal/Appeal_icon.png')} />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.bgTitle}>申诉中</Text>
                            <Text style={styles.bgContext}>该订单存在纠纷,官方会尽快进行处理</Text>
                        </View>
                    </ImageBackground>
                    <Select.ScrollLinear
                        data={[{ title: '申诉信息', key: 'appeal' }, { title: '订单信息', key: 'order' }, { title: '证据', key: 'evidence' }]}
                        isFlex={true}
                        style={{ backgroundColor: 'white' }}
                        selectValue={this.state.type}
                        selectChange={this.selectChange}
                        isControl
                    />
                    {this.state.type == 'appeal' &&
                        <AppealInfo
                            orderId={this.state.orderNo}
                            sourceNickName={this.state.sourceNickName}
                            targetNickName={this.state.targetNickName}
                            targetRealName={this.state.targetRealName}
                            orderMemo={this.state.orderMemo}
                            targetPhone={this.state.targetPhone}
                            orderStatusBeforeAppeal={this.state.orderStatusBeforeAppeal}
                            appealType={this.state.appealType}
                        />
                    }
                    {this.state.type == 'order' &&
                        <OrderInfo
                            orderCreateTime={this.state.orderCreateTime}
                            orderPayConfirmTime={this.state.orderPayConfirmTime}
                            appealBeginTime={this.state.appealBeginTime}
                            price={this.state.price}
                            fiat={this.state.fiat}
                            token={this.state.token}
                            amount={this.state.amount}
                            payType={this.state.payType}
                            legalAmount={this.state.legalAmount}
                        />
                    }
                    {this.state.type == 'evidence' &&
                        <EvidenceInfo
                            sellerAppealPics={this.state.sellerAppealPics}
                            sellerAppealReason={this.state.sellerAppealReason}
                            sellerAppealTime={this.state.sellerAppealTime}
                            sellerName={this.state.sellerName}

                            buyerAppealPics={this.state.buyerAppealPics}
                            buyerAppealReason={this.state.buyerAppealReason}
                            buyerAppealTime={this.state.buyerAppealTime}
                            buyerName={this.state.buyerName}
                        />
                    }
                    <View style={{ height: 50, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                        <TouchableHighlight onPress={this.connect} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(40,46,60)' }}>
                            <Text style={styles.bottomBtnText}>联系买家</Text>
                        </TouchableHighlight>
                        <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 2, position: 'relative', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableHighlight onPress={this.btnPress} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.bottomBtnText}>{`${btnText}`}</Text>
                            </TouchableHighlight>
                        </LinearGradient>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    selectChange = (item) => {
        this.setState({
            type: item.key
        })
    }

    connect = () => {

    }

    btnPress = () => {
        if (this.state.targetAppeal) {
            this.props.navigation.navigate('AddAppeal', { type: 'target', orderId: this.state.orderNo });
        } else {
            this.props.navigation.goBack();
        }
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column'
    },
    imageBg: {
        height: Dimensions.get('window').width / 375 * 100,
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    bgTitle: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    bgContext: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 13,
        marginTop: 6,
        color: 'white'
    },
    itemTitle: {
        fontSize: 15,
        color: 'rgb(133,133,133)',
        fontFamily: 'PingFang-SC-Medium'
    },
    itemContext: {
        fontSize: 15,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium'
    },
    itemContextBlue: {
        fontSize: 15,
        color: 'rgb(64,99,213)',
        fontFamily: 'PingFang-SC-Medium'
    },
    bottomBtnText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'white'
    },
});