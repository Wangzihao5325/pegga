import React, { Component } from 'react';
import { SafeAreaView, Dimensions, StyleSheet, View, Image, Text, TouchableHighlight, FlatList } from 'react-native';
import Header from '../../../../component/header';
import Api from '../../../../socket/index';

const PAY_TYPE_ARR = [0, 1, 2];
const ACCOUNT_STATE_ARR = [0, 1, 2];
const IS_ACCEPT_ARR = [true, false];
const SUCCESS_ARR = [true, false];

const Swich = (props) => {
    let imageSrc;
    switch (props.isOpen) {
        case IS_ACCEPT_ARR[0]:
            imageSrc = require('../../../../image/otc/payment/control/open_but.png');
            break;
        case IS_ACCEPT_ARR[1]:
            imageSrc = require('../../../../image/otc/payment/control/close_but.png');
            break;
    }
    return (
        <TouchableHighlight style={{ height: 24, width: 40 }} underlayColor='transparent' onPress={props.callback}>
            <Image style={{ height: 24, width: 40 }} source={imageSrc} />
        </TouchableHighlight>
    );
}

class Item extends Component {
    render() {
        let showAccount = this.props.account;
        let imageSrc;
        let accountStateTag;
        let nameTextColor;
        let accountTextColor;
        let isAcceptImageSrc;
        let isAcceptText;
        let isAcceptTextColor;
        let successImageSrc;
        let successText;
        switch (this.props.successState) {
            case SUCCESS_ARR[0]:
                successImageSrc = require('../../../../image/otc/payment/control/ok_pic.png');
                successText = '连续成功';
                break;
            case SUCCESS_ARR[1]:
                successImageSrc = require('../../../../image/otc/payment/control/fail_pic.png');
                successText = '连续失败';
                break;
        }
        switch (this.props.isAccept) {
            case IS_ACCEPT_ARR[0]:
                isAcceptImageSrc = require('../../../../image/otc/payment/control/open_pic.png');
                isAcceptText = '接单中';
                isAcceptTextColor = { color: 'rgb(133,133,133)' };
                break;
            case IS_ACCEPT_ARR[1]:
                isAcceptImageSrc = require('../../../../image/otc/payment/control/suspend_pic.png');
                isAcceptText = '暂停中';
                isAcceptTextColor = { color: 'rgb(133,133,133)' };
                break;
        }
        switch (this.props.type) {
            case PAY_TYPE_ARR[0]://ali
                imageSrc = require('../../../../image/otc/payment/pay_alipay.png');
                break;
            case PAY_TYPE_ARR[1]://wechat
                imageSrc = require('../../../../image/otc/payment/pay_WeChat.png');
                break;
            case PAY_TYPE_ARR[2]://card
                if (showAccount && showAccount.length > 12) {
                    showAccount = `${showAccount.substr(0, 4)}****${showAccount.substr(-4, 4)}`
                }
                imageSrc = require('../../../../image/otc/payment/pay_card.png');
                break;
        }
        switch (this.props.accountState) {
            case ACCOUNT_STATE_ARR[0]:
                accountStateTag = null;
                nameTextColor = { color: 'rgb(40,46,60)' };
                accountTextColor = { color: 'rgb(40,46,60)' };
                break;
            case ACCOUNT_STATE_ARR[1]:
                accountStateTag = <View style={{ marginLeft: 5, height: 24, width: 60, backgroundColor: 'rgb(252,237,237)', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}><Text style={{ fontSize: 12, color: 'rgb(227,75,75)', fontFamily: 'PingFang-SC-Medium' }}>账号异常</Text></View>;
                nameTextColor = { color: 'rgb(40,46,60)' };
                accountTextColor = { color: 'rgb(227,75,75)' };
                break;
            case ACCOUNT_STATE_ARR[2]:
                accountStateTag = <View style={{ marginLeft: 5, height: 24, width: 60, backgroundColor: 'rgb(252,237,237)', justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}><Text style={{ fontSize: 12, color: 'rgb(227,75,75)', fontFamily: 'PingFang-SC-Medium' }}>账号冻结</Text></View>;
                nameTextColor = { color: 'rgb(188,192,203)' };
                accountTextColor = { color: 'rgb(188,192,202)' };
                isAcceptImageSrc = require('../../../../image/otc/payment/control/suspend_pic_gray.png');
                isAcceptText = '暂停中';
                isAcceptTextColor = { color: 'rgb(188,192,203)' };
                break;
        }
        return (
            <View style={{ height: 105, width: Dimensions.get('window').width, paddingHorizontal: 15, paddingVertical: 5 }}>
                <View style={{ flex: 1, borderRadius: 5, backgroundColor: 'white', flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 25, width: 25 }} source={imageSrc} />
                            <Text style={[{ fontSize: 16, fontFamily: 'PingFang-SC-Medium', marginLeft: 5 }, nameTextColor]}>{`${this.props.name}`}</Text>
                            {
                                accountStateTag
                            }
                        </View>
                        <Swich isOpen={this.props.isAccept} callback={this.props.callback} />
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 17, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', width: 120, paddingHorizontal: 0, paddingVertical: 0 }}>
                            <Text style={[{ fontSize: 17, fontFamily: 'PingFang-SC-Medium' }, accountTextColor]}>{`${showAccount}`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 15, width: 15 }} source={isAcceptImageSrc} />
                            <Text style={[{ fontSize: 15, fontFamily: 'PingFang-SC-Medium', marginLeft: 5 }, isAcceptTextColor]}>{`${isAcceptText}`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 15, width: 15 }} source={successImageSrc} />
                            <Text style={[{ fontSize: 15, fontFamily: 'PingFang-SC-Medium', marginLeft: 5 }, isAcceptTextColor]}>{`${successText}${this.props.successTimes}次`}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default class PaymentControl extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: []
    }

    _dataRefresh = () => {
        Api.paymentControlList((res) => {
            this.setState({
                data: res
            });
        });
    }

    componentDidMount() {
        this._dataRefresh();
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='接单控制台'
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <View style={{ paddingHorizontal: 15, height: 50, marginBottom: 5, width: Dimensions.get('window').width, backgroundColor: '#DAE1F6', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#4b88e3', lineHeight: 20 }}>当前页面显示发布TOB广告时选择的账号</Text>
                    </View>
                    {(this.state.data && this.state.data.length > 0) ?
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) =>
                                <Item
                                    key={item.payTypeId}
                                    type={item.payType}
                                    name={item.realName}
                                    account={item.account}
                                    isAccept={item.active}
                                    successState={item.count >= 0 ? true : false}
                                    successTimes={Math.abs(item.count)}
                                    accountState={item.matchStatus}
                                    //payTypeId={item.payTypeId}
                                    callback={() => this.itemSwich(item.payTypeId, item.active, item.matchStatus)}
                                />}
                        />
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 110, height: 130 }} source={require('../../../../image/no_image/empty_order.png')} />
                        </View>
                    }
                </View>
            </SafeAreaView>
        );
    }

    itemSwich = (id, active, matchStatus) => {
        if (matchStatus == ACCOUNT_STATE_ARR[2]) {
            return;
        }
        let payload = { active: !active, payTypeId: id };
        Api.paymentControlSwich(payload, (res) => {
            this._dataRefresh();
        })
    }
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    }
});