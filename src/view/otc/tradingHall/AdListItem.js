//虚拟币种 this.props.item.token
//成交率 this.props.item.orderFillRateLastMonth
//备注 this.props.item.remark
//支付方式 this.props.item.payType = '1,2'
// 0-> 支付宝 1->微信 2->银行卡 3->云闪付
import React, { PureComponent } from 'react';
import {
    FlatList,
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import NavigationService from '../../../app/router/NavigationService';
import LinearGradient from 'react-native-linear-gradient';
import Utils from '../../../global/util';
import Btn from '../../../component/btn';

export default class Item extends PureComponent {
    static defaultProps = {
        item: {
            nikeName: '商户名称',
            price: 0,
            maxLimit: 0,
            minLimit: 0,
            token: '--',
            remark: '',
            amount: 0,
        }
    }

    /**
     * warning: 此处 failed 为成交数量 end为非正常成交（失败的数量），
     * 与后端对接口没有沟通好造成的问题
     */
    _orderFailedRateCal = (failed, end) => {
        if (failed + end == 0) {
            return '0%'
        } else {
            let rate = (failed / (failed + end) * 100).toFixed(2);
            return `${rate}%`
        }
    }

    render() {
        let tradeTpeStr = Utils.mapValue2Str.tradeType(this.props.item.type === 1 ? 0 : 1);
        let nickName = this.props.item.nikeName ? this.props.item.nikeName : '游客';
        let alias = nickName.substr(0, 1);
        let remark = this.props.item.remark ? this.props.item.remark : '该用户没有留下备注~';
        if (remark.length >= 20) {
            remark = `${remark.substr(0, 17)}...`;
        }
        let payType = this.props.item.payType ? this.props.item.payType.split(',') : [];
        let orderSuccessRate = this._orderFailedRateCal(this.props.item.orderFilledCount, this.props.item.orderEndCount);
        return (
            <View style={styles.itemContainer}>
                <View style={styles.item}>
                    <View style={styles.itemHeader}>
                        <LinearGradient
                            style={styles.avater}
                            colors={['#39DFB1', '#6284E4']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            <Text onPress={this.goToDetail} style={styles.alias}>{`${alias}`}</Text>
                        </LinearGradient>
                        <Text onPress={this.goToDetail} style={styles.nickName}>{`${nickName}`}</Text>
                        <View style={styles.itemPriceWrapper}>
                            <Text style={styles.itemPriceText}>{this.props.item.price} <Text style={styles.itemUnitText}>{`${this.props.item.fiat}`}</Text></Text>
                        </View>
                    </View>
                    <View style={styles.itemContentContainer}>
                        <View style={styles.itemInfoContainer}>
                            <Text style={styles.itemInfo}>数量   <Text style={styles.itemInfoDetail}>{`${this.props.item.remainAmount} ${this.props.item.token}`}</Text></Text>
                            <Text style={styles.itemInfo}>限额   <Text style={styles.itemInfoDetail}>{`${this.props.item.minLimit} ~ ${this.props.item.maxLimit}`}</Text></Text>
                        </View>
                        <View style={styles.itemTradeContainer}>
                            <Btn.Linear
                                style={styles.itemTradeBtn}
                                textStyle={styles.itemTradeBtnText}
                                title={`${tradeTpeStr}${this.props.item.token}`}
                                btnPress={this.tradeBtnPress}
                            />
                        </View>
                    </View>
                    <View style={styles.itemRemarkContainer}>
                        <Text style={styles.itemInfo}>备注   <Text style={styles.itemInfoDetail}>{`${remark}`}</Text></Text>
                    </View>
                    <View style={styles.itemBottomLine} />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            {
                                payType.map((item) => {
                                    let url = require('../../../image/otc/payment/pay_card.png');
                                    let wrapperStyle = { height: 20, width: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' };
                                    let imageStyle = { height: 20, width: 20, borderRadius: 3 };
                                    if (item == 0) {
                                        url = require('../../../image/otc/payment/pay_alipay.png');
                                    } else if (item == 1) {
                                        url = require('../../../image/otc/payment/pay_WeChat.png');
                                    } else if (item == 2) {
                                        url = require('../../../image/otc/payment/pay_card.png');
                                    }
                                    return (
                                        <View key={item} style={wrapperStyle}>
                                            <Image style={imageStyle} source={url} />
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <Text style={styles.rateText}>{`${orderSuccessRate}成交率`}</Text>
                    </View>
                </View>
            </View>
        );
    }

    tradeBtnPress = () => {
        if (typeof this.props.tradeCallback == 'function') {
            this.props.tradeCallback();
        }
    }

    goToDetail = () => {
        //_todoList:userId字段更换
        let sellerInfoStr = JSON.stringify({ buyerNo: this.props.item.userNo, sellerNo: this.props.item.userNo });
        NavigationService.navigate('OTC_SellerDetailInfo', { sellerInfoStr });
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        height: 220,
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        alignItems: 'center'
    },
    item: {
        height: 205,
        width: Dimensions.get('window').width - 30,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 15
    },
    itemHeader: {
        height: 40,
        width: Dimensions.get('window').width - 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    itemContentContainer: {
        height: 70,
        width: Dimensions.get('window').width - 60,
        display: 'flex',
        flexDirection: 'row'
    },
    itemInfoContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    itemTradeContainer: {
        height: 70,
        width: 100,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemRemarkContainer: {
        height: 35,
        width: Dimensions.get('window').width - 60,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    itemBottomLine: {
        marginTop: 5,
        height: 1,
        width: Dimensions.get('window').width - 60,
        alignSelf: 'center',
        backgroundColor: '#F2F2F2'
    },
    avater: {
        height: 30,
        width: 30,
        borderRadius: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    alias: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 20
    },
    nickName: {
        marginLeft: 10,
        fontSize: 14,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(73,73,73)',
        fontWeight: 'bold'
    },
    itemPriceWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    itemPriceText: {
        fontSize: 21,
        color: 'rgb(40,46,60)'
    },
    itemUnitText: {
        fontSize: 13,
    },
    itemInfo: {
        fontFamily: 'PingFang-SC-Regular',
        fontSize: 12,
        color: 'rgb(179,179,179)'
    },
    itemInfoDetail: {
        fontSize: 15,
        color: 'rgb(133,133,133)'
    },
    itemTradeBtn: {
        height: 33,
        width: 98,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTradeBtnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    rateText: {
        color: 'rgb(200,200,200)',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Medium'
    }
});