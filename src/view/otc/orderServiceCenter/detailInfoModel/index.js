import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Api from '../../../../socket';
import Colors from '../../../../global/Colors';
import Header from '../../../../component/header';
import Toast from '../../../../component/toast';

export default class DetailInfo extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        orderAppealCount: 0,
        orderAppealCountLastMonth: 0,
        orderFilledCount: 0,
        orderFilledCountLastMonth: 0,
        orderWinAppealCount: 0,
        orderWinAppealCountLastMonth: 0,
        isEmailVerified: false,
        isSmsVerified: false,
        kycLevel: 0,

        nickName: '游客'
    }

    componentDidMount() {
        const sellerInfoStr = this.props.navigation.getParam('sellerInfoStr', '{}');
        let seller = JSON.parse(sellerInfoStr);
        let sellerNum = seller.buyerNo ? seller.buyerNo : seller.sellerNo;
        Api.otherUserInfoById(sellerNum, (result, code, msg) => {
            this.setState({
                orderAppealCount: result.orderAppealCount,
                orderAppealCountLastMonth: result.orderAppealCountLastMonth,
                orderFilledCount: result.orderFilledCount,
                orderFilledCountLastMonth: result.orderFilledCountLastMonth,
                orderWinAppealCount: result.orderWinAppealCount,
                orderWinAppealCountLastMonth: result.orderWinAppealCountLastMonth,
                isEmailVerified: result.isEmailVerified,
                isSmsVerified: result.isSmsVerified,
                kycLevel: result.kycLevel,
                nickName: result.nickName ? result.nickName : '游客'
            });
        }, (result, code, msg) => {
            let message = msg ? msg : '获取信息失败';
            Toast.show(message);
        });
    }

    render() {
        let nameSource = this.state.kycLevel === 0 ? require('../../../../image/otc/userIdentifyState/name_gray.png') : require('../../../../image/otc/userIdentifyState/name_normal.png');
        let mailSource = this.state.isEmailVerified ? require('../../../../image/otc/userIdentifyState/mail_normal.png') : require('../../../../image/otc/userIdentifyState/mail_gray.png');
        let phoneSource = this.state.isSmsVerified ? require('../../../../image/otc/userIdentifyState/phone_normal.png') : require('../../../../image/otc/userIdentifyState/phone_gray.png');
        let rate = '0.00 %';
        if (this.state.orderFilledCountLastMonth + this.state.orderAppealCountLastMonth > 0) {
            rate = `${(this.state.orderFilledCountLastMonth / (this.state.orderFilledCountLastMonth + this.state.orderAppealCountLastMonth) * 100).toFixed(2)} %`;
        }
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
                    <View style={{ backgroundColor: 'white' }}>
                        <Header.Normal title='用户信息' goback={() => this.props.navigation.goBack()} />
                    </View>
                    <View style={{ height: 90, width: Dimensions.get('window').width, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                        <LinearGradient
                            style={{ height: 60, width: 60, marginHorizontal: 15, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}
                            colors={['#39DFB1', '#6284E4']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                        >
                            <Text style={{ fontSize: 45, color: 'white', textAlign: 'center', textAlignVertical: 'center' }}>{`${this.state.nickName.substr(0, 1)}`}</Text>
                        </LinearGradient>
                        <Text style={{ fontFamily: 'PingFang-SC-Medium', fontSize: 17, color: 'rgb(79,84,96)' }}>{`${this.state.nickName}`}</Text>
                    </View>
                    <View style={{ backgroundColor: 'white' }}>
                        <View style={{ height: 60, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={styles.context}>{`${rate}`}</Text>
                                <Text style={styles.title}>近30日成交率</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={styles.context}>{`${this.state.orderAppealCountLastMonth}`}</Text>
                                <Text style={styles.title}>近30日申诉</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={styles.context}>{`${this.state.orderWinAppealCountLastMonth}`}</Text>
                                <Text style={styles.title}>近30日胜诉</Text>
                            </View>
                        </View>
                        <View style={{ height: 60, width: Dimensions.get('window').width, flexDirection: 'row', marginTop: 10, marginBottom: 20 }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={styles.context}>{`${this.state.orderFilledCount}`}</Text>
                                <Text style={styles.title}>总成交量</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={styles.context}>{`${this.state.orderAppealCount}`}</Text>
                                <Text style={styles.title}>总申诉量</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Text style={styles.context}>{`${this.state.orderWinAppealCount}`}</Text>
                                <Text style={styles.title}>总胜诉量</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                        <View style={{ height: 65, width: Dimensions.get('window').width, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Image style={{ height: 21, width: 21 }} source={nameSource} />
                                <Text style={styles.identifyTitle}>实名认证</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Image style={{ height: 21, width: 21 }} source={mailSource} />
                                <Text style={styles.identifyTitle}>邮箱认证</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Image style={{ height: 21, width: 21 }} source={phoneSource} />
                                <Text style={styles.identifyTitle}>手机认证</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    goBack = () => {
        this.props.navigation.goBack();
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
    title: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 13,
        color: 'rgb(133,133,133)'
    },
    context: {
        fontSize: 17,
        color: 'rgb(40,46,60)'
    },
    identifyTitle: {
        fontSize: 14,
        color: 'rgb(79,84,96)',
        fontFamily: 'PingFang-SC-Regular',
    }
});