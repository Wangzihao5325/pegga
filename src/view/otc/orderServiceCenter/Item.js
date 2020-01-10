import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableHighlight, Dimensions, StyleSheet } from 'react-native';
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
        return (
            <View style={styles.wrapper}>
                <TouchableWithoutFeedback onPress={this.containerPress}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.title}>{`${tradeTypeStr} 点卡/${this.props.item.fiat}`}</Text>
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
                                <Text style={[styles.infoContext, { marginTop: 5 }]}>{`${this.props.item.price} ${this.props.item.fiat}/点卡`}</Text>
                            </View>
                            <View style={{ flex: 9, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={styles.infoTitle}>数量</Text>
                                <Text style={[styles.infoContext, { fontWeight: 'bold', marginTop: 5 }]}>{`${this.props.item.amount} 点卡`}</Text>
                            </View>
                        </View>
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
        height: 225,
        width: Dimensions.get('window').width - 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2F2F2'
    },
    container: {
        height: 210,
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
        width: Dimensions.get('window').width - 60,
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