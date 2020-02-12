import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
import BusinessLabel from '../../../component/label';
import Btn from '../../../component/btn';
import Utils from '../../../global/util';

const CustomizeBtnArea = (props) => {
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            {props.orderType === 0 && props.orderStatus === 0 &&
                <View style={{ flexDirection: 'row' }}>
                    <Btn.Normal
                        style={styles.whiteBtn}
                        textStyle={styles.whiteBtnText}
                        btnPress={props.cancel}
                        title='取消' />
                    {!props.isPayVoucher &&
                        < Btn.Linear
                            style={styles.btn}
                            textStyle={styles.btnText}
                            btnPress={props.buyerConfirm}
                            title='确认' />
                    }
                </View>
            }
        </View>
    )
}

export default class Item extends PureComponent {
    render() {
        let tradeTypeStr = Utils.mapValue2Str.tradeType(this.props.item.orderType);
        let { stateText, stateTextStyle } = Utils.mapValue2Str.orderStateTextWithStyle(this.props.item.orderStatus, 15);
        let labelType = this.props.item.isMatch ? 'green' : 'blue';
        let labelTitle = this.props.item.isMatch ? 'TOB' : 'TOC';
        let payTypeIcon = '';
        let realName = this.props.item.payTypeNick ? this.props.item.payTypeNick : '';
        if (this.props.item.payType != null) {
            switch (this.props.item.payType) {
                case 0:
                    payTypeIcon = require('../../../image/otc/payment/pay_alipay.png');
                    break;
                case 1:
                    payTypeIcon = require('../../../image/otc/payment/pay_WeChat.png');
                    break;
                case 2:
                    payTypeIcon = require('../../../image/otc/payment/pay_card.png');
                    realName = this.props.item.realName ? this.props.item.realName : '';
                    break;
                default:
                    payTypeIcon = require('../../../image/otc/payment/pay_alipay.png');
                    break;
            }
        }
        return (
            <View style={[styles.wrapper, this.props.item.orderType === 1 ? { height: 225 + 59 + 5 } : { height: 225 }]}>
                <TouchableWithoutFeedback onPress={this.containerPress}>
                    <View style={[styles.container, this.props.item.orderType === 1 ? { height: 210 + 59 + 5, } : { height: 210 }]}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.title}>{`${tradeTypeStr} ${this.props.item.token}/${this.props.item.fiat}`}</Text>
                                <BusinessLabel
                                    marginLeft={5}
                                    type={labelType}
                                    title={labelTitle}
                                />
                            </View>
                            <Text style={stateTextStyle}>{`${stateText}`}</Text>
                        </View>

                        <View style={styles.infoWrapper}>
                            <View style={{ flex: 10, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={styles.infoTitle}>订单号</Text>
                                <Text style={[styles.infoContext, { marginTop: 5 }]}>{`${this.props.item.orderNo}`}</Text>
                            </View>
                            <View style={{ flex: 9, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={styles.infoTitle}>发布时间</Text>
                                <Text style={[styles.infoContext, { marginTop: 5 }]}>{`${this.props.item.createTime}`}</Text>
                            </View>
                        </View>
                        <View style={[styles.infoWrapper, { marginBottom: 5 }]}>
                            <View style={{ flex: 10, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={styles.infoTitle}>单价</Text>
                                <Text style={[styles.infoContext, { marginTop: 5 }]}>{`${this.props.item.price} ${this.props.item.fiat}/${this.props.item.token}`}</Text>
                            </View>
                            <View style={{ flex: 9, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={styles.infoTitle}>数量</Text>
                                <Text style={[styles.infoContext, { fontWeight: 'bold', marginTop: 5 }]}>{`${this.props.item.amount} ${this.props.item.token}`}</Text>
                            </View>
                        </View>
                        {this.props.item.orderType === 1 &&
                            <View style={[styles.infoWrapper, { marginBottom: 10, backgroundColor: 'rgb(243,245,249)', borderRadius: 5, paddingHorizontal: 15 }]}>
                                <View style={{ flex: 10, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                        {this.props.item.payType != null && <Image style={{ height: 18, width: 18 }} source={payTypeIcon} />}
                                        <Text style={{ marginLeft: 5, fontSize: 13, color: 'rgb(133,133,133)', fontFamily: 'PingFang-SC-Medium' }}>{`${realName}`}</Text>
                                    </View>
                                    <Text style={[styles.infoContext]}>{this.props.item.account ? `${this.props.item.account}` : ''}</Text>
                                </View>
                                <View style={{ flex: 9, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-end' }}>
                                    <Text style={styles.infoTitle}>付款备注</Text>
                                    <Text style={[styles.infoContext]}>{this.props.item.memo ? `${this.props.item.memo}` : ''}</Text>
                                </View>
                            </View>
                        }
                        <View style={styles.separate} />
                        <View style={styles.bottomContainer}>
                            <Text style={styles.dealingAmountText}>总价<Text style={styles.dealingAmountTextPart}>{`  ${this.props.item.legalAmount} ${this.props.item.fiat}`}</Text></Text>
                            <CustomizeBtnArea
                                isPayVoucher={this.props.item.isPayVoucher}
                                orderType={this.props.item.orderType}
                                orderStatus={this.props.item.orderStatus}
                                cancel={this.cancelPress}
                                buyerConfirm={this.containerPress}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        );
    }

    containerPress = () => {
        if (typeof this.props.containerPress == 'function') {
            this.props.containerPress()
        }
    }

    cancelPress = () => {
        if (typeof this.props.cancelPress == 'function') {
            this.props.cancelPress()
        }
    }
}

const styles = StyleSheet.create({
    wrapper: {
        height: 225 + 59 + 5,
        width: Dimensions.get('window').width - 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    container: {
        height: 210 + 59 + 5,
        width: Dimensions.get('window').width - 30,
        borderRadius: 10,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    header: {
        height: 40,
        width: Dimensions.get('window').width - 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5
    },
    title: {
        fontSize: 15,
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        color: 'rgb(40,46,60)'
    },
    infoWrapper: {
        height: 54,
        width: Dimensions.get('window').width - 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoTitle: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 13,
        color: 'rgb(133,133,133)'
    },
    infoContext: {
        fontFamily: 'PingFang-SC-Medium',
        //fontWeight: 'bold',
        fontSize: 14,
        color: 'rgb(40,46,60)'
    },
    separate: {
        height: 1,
        width: Dimensions.get('window').width - 30,
        backgroundColor: '#F2F2F2'
    },
    bottomContainer: {
        flex: 1,
        width: Dimensions.get('window').width - 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        height: 30,
        width: 70,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 13
    },
    whiteBtn: {
        height: 30,
        width: 70,
        backgroundColor: 'white',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    whiteBtnText: {
        color: 'rgb(64,99,213)',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 13
    },
    dealingAmountText: {
        fontSize: 12,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(133,133,133)'
    },
    dealingAmountTextPart: {
        fontSize: 16,
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        color: 'rgb(64,99,213)'
    }
});