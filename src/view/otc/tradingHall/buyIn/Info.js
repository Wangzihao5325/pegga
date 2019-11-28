import React, { PureComponent } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function InfoLine(props) {
    return (
        <View style={styles.infoLine}>
            <Text style={styles.lineTitleText}>{props.title}</Text>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginLeft: 5 }}>
                <Text style={[styles.lineTitleText, props.textStyle]}>{props.context}</Text>
            </View>
        </View>
    );
}

export default class Info extends PureComponent {
    render() {
        let payType = this.props.payType ? this.props.payType.split(',') : [];
        let remark = this.props.remark ? this.props.remark : '该用户没有留下任何备注!';
        if (remark.length >= 20) {
            remark = `${remark.substr(0, 17)}...`;
        }
        //此处是对手方信息，因此和常规方向相反
        let priceText = this.props.tradeType ? '买入' : '卖出';
        let typeText = this.props.tradeType ? '买' : '卖';
        return (
            <View style={styles.container}>
                <View style={{ height: 60, width: Dimensions.get('window').width - 60, borderBottomColor: '#F2F2F2', borderBottomWidth: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <LinearGradient
                        style={styles.avater}
                        colors={['#39DFB1', '#6284E4']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                    >
                        <Text onPress={this.goToSellerInfo} style={styles.avaterText}>{this.props.name.substr(0, 1)}</Text>
                    </LinearGradient>
                    <Text onPress={this.goToSellerInfo} style={styles.name}>{this.props.name}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Text style={styles.tradeRate}>{`${this.props.tradeRate}成交率`}</Text>
                    </View>
                </View>
                <InfoLine
                    title={`${priceText}价格`}
                    context={`${this.props.price} ${this.props.currencyType}/${this.props.coinType}`}
                    textStyle={styles.priceText}
                />
                <InfoLine
                    title='交易限额'
                    context={`${this.props.minLimit} ~ ${this.props.maxLimit}`}
                    textStyle={styles.limitText}
                />
                <InfoLine
                    title={`剩余可${typeText}`}
                    context={`${this.props.amount} ${this.props.coinType}`}
                    textStyle={styles.limitText}
                />

                <View style={styles.infoLine}>
                    <Text style={styles.lineTitleText}>付款方式</Text>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {
                            payType.map((item) => {
                                let url = require('../../../../image/otc/payment/pay_card.png');
                                let wrapperStyle = { height: 20, width: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' };
                                let imageStyle = { height: 20, width: 20, borderRadius: 3 };
                                if (item == 0) {
                                    url = require('../../../../image/otc/payment/pay_alipay.png');
                                } else if (item == 1) {
                                    url = require('../../../../image/otc/payment/pay_WeChat.png');
                                } else if (item == 2) {
                                    url = require('../../../../image/otc/payment/pay_card.png');
                                }

                                return (
                                    <View key={item} style={wrapperStyle}>
                                        <Image style={imageStyle} source={url} />
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                <InfoLine
                    title={`${typeText}家备注`}
                    context={remark}
                    textStyle={styles.remark}
                />
            </View>
        );
    }

    goToSellerInfo = () => {
        if (typeof this.props.callback == 'function') {
            this.props.callback();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        height: 290,
        width: Dimensions.get('window').width - 30,
        borderRadius: 5,
        marginTop: 15,
        backgroundColor: 'white',
        paddingHorizontal: 15
    },
    avater: {
        borderRadius: 15,
        height: 30,
        width: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    avaterText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    name: {
        marginLeft: 10,
        color: 'rgb(40,46,60)',
        fontSize: 18,
        fontFamily: 'PingFang-SC-Medium'
    },
    tradeRate: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 13,
        color: 'rgb(100,100,100)'
    },
    infoLine: {
        height: 45,
        width: Dimensions.get('window').width - 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    lineTitleText: {
        fontSize: 16,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(100,100,100)',
        textAlign: 'auto'
    },
    priceText: {
        fontSize: 18,
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        color: 'rgb(40,46,60)'
    },
    limitText: {
        fontSize: 16,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(40,46,60)'
    },
    leftSellText: {
        fontSize: 16,
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        color: 'rgb(40,46,60)'
    },
    remark: {
        fontSize: 15,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(40,46,60)'
    }
});