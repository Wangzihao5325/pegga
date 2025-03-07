import React, { PureComponent } from 'react';
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native';

import Utils from '../../../global/util';
import Btn from '../../../component/btn';
import BusinessLabel from '../../../component/label';
//上架中 1  已下架 0 已完成 2

export default class Item extends PureComponent {
    render() {
        let tradeTypeStr = Utils.mapValue2Str.tradeType(this.props.item.type);
        let stateTypeStr = Utils.mapValue2Str.adStateType(this.props.item.status);
        let stateStyle = null;
        let btnText = '';
        switch (this.props.item.status) {
            case 0:
                stateStyle = { color: 'rgb(64,99,213)' };
                btnText = '编辑';
                break;
            case 1:
                stateStyle = { color: 'rgb(20,187,91)' };
                btnText = '下架';
                break;
            case 2:
                stateStyle = { color: 'rgb(40,46,60)' };
                break;
            default:
                break;
        }
        let labelType = '';
        let title = '';
        switch (this.props.item.origin) {
            case 0:
                title = 'TOC';
                labelType = 'blue';
                break;
            case 1:
                title = 'TOB';
                labelType = 'green';
                break;
            default:
                title = '';
                labelType = 'white';
                break;
        }
        return (
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.title}>{`${tradeTypeStr} ${this.props.item.token}/${this.props.item.fiat}`}</Text>
                            <BusinessLabel
                                marginLeft={5}
                                type={labelType}
                                title={title}
                            />
                        </View>
                        <Text style={[styles.stateText, stateStyle]}>{`${stateTypeStr}`}</Text>
                    </View>
                    <View style={styles.infoWrapper}>
                        <View style={{ flex: 10, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={styles.infoTitle}>广告ID</Text>
                            <Text style={styles.infoContext}>{`${this.props.item.advertiseNo}`}</Text>
                        </View>
                        <View style={{ flex: 9, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={styles.infoTitle}>发布时间</Text>
                            <Text style={styles.infoContext}>{`${this.props.item.createTime}`}</Text>
                        </View>
                    </View>
                    <View style={[styles.infoWrapper, { marginBottom: 5 }]}>
                        <View style={{ flex: 10, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={styles.infoTitle}>单价</Text>
                            <Text style={styles.infoContext}>{`${this.props.item.price} ${this.props.item.fiat}/${this.props.item.token}`}</Text>
                        </View>
                        <View style={{ flex: 9, height: 54, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={styles.infoTitle}>数量</Text>
                            <Text style={[styles.infoContext, { fontWeight: 'bold' }]}>{`${this.props.item.amount} ${this.props.item.token}`}</Text>
                        </View>
                    </View>
                    <View style={styles.separate} />
                    <View style={styles.bottomContainer}>
                        <Text style={styles.dealingAmountText}>{`已${tradeTypeStr}`}<Text style={styles.dealingAmountTextPart}>{`  ${this.props.item.completeAmount ? this.props.item.completeAmount : 0} 点卡`}</Text></Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text onPress={this.showPayment} style={{ fontSize: 12, color: 'rgb(20,187,91)', fontFamily: 'PingFang-SC-Medium' }}>收款账号</Text>
                            {this.props.item.status === 0 &&
                                <Btn.Linear
                                    style={styles.btn}
                                    textStyle={styles.btnText}
                                    btnPress={this.itemBtnPress}
                                    title={btnText} />
                            }
                            {this.props.item.status === 1 &&
                                <Btn.Normal
                                    style={styles.btn2}
                                    textStyle={styles.btn2Text}
                                    btnPress={this.itemBtnPress}
                                    title={btnText} />
                            }
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    showPayment = () => {
        if (typeof this.props.paymentsCallback == 'function') {
            typeof this.props.paymentsCallback(this.props.item);
        }
    }

    itemBtnPress = () => {
        if (typeof this.props.callback == 'function') {
            this.props.callback(this.props.item, this.props.index);
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
    stateText: {
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        fontSize: 15
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
        fontSize: 14,
        color: 'rgb(40,46,60)',
        marginTop: 5
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
        //backgroundColor: 'rgb(64,99,213)',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 13
    },
    btn2: {//下架
        height: 30,
        width: 70,
        backgroundColor: '#eceffb',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5
    },
    btn2Text: {
        color: '#4063d5',
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