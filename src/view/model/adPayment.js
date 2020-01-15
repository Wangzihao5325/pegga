import React, { Component } from 'react';
import { Animated, Image, TouchableHighlight, FlatList, View, Text, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import Btn from '../../component/btn';
import Select from '../../component/select';
import I18n from '../../global/doc/i18n';
import Api from '../../socket';

function Item(props) {//index  data:[select,title,key]
    let iconUrl = require('../../image/otc/payment/pay_alipay.png');
    let title = '支付宝';
    let account = '';
    let name = '';
    switch (props.item.type) {
        case 'ali':
            iconUrl = require('../../image/otc/payment/pay_alipay.png');
            title = '支付宝';
            account = props.item.no;
            name = props.item.nickName;
            break;
        case 'wexin':
            iconUrl = require('../../image/otc/payment/pay_WeChat.png');
            title = '微信';
            account = props.item.no;
            name = props.item.nickName;
            break;
        case 'bank':
            iconUrl = require('../../image/otc/payment/pay_card.png');
            title = props.item.bank;
            account = props.item.card;
            name = props.item.realName;
            break;
    }
    return (
        <View style={styles.itemBody}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <Image style={styles.itemIcon} source={iconUrl} />
                <Text style={styles.itemTitle}>{`${title}`}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 15 }}>
                <Text style={styles.itemAccountName}>{`${name}`}</Text>
                <Text style={styles.itemAccount}>{`${account}`}</Text>
            </View>
        </View>
    );
}

export default class SelectModel extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    constructor(props) {
        super(props);
        this.timer = null;
    }

    state = {
        fadeAnim: new Animated.Value(0),
        listData: []
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.timer = null
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1,
                }
            ).start();

        }, 300);

        const adId = this.props.navigation.getParam('adId', '');
        if (adId) {
            Api.adPayment(adId, (result) => {
                let ali = [];
                let wexin = [];
                let bank = [];
                if (result.aliPayInfo) {
                    ali = result.aliPayInfo.map((item) => {
                        let itemReg = _.assign({}, item);
                        itemReg.type = 'ali';
                        return itemReg;
                    })
                }
                if (result.weixinPayInfo) {
                    wexin = result.weixinPayInfo.map((item) => {
                        let itemReg = _.assign({}, item);
                        itemReg.type = 'wexin';
                        return itemReg;
                    })
                }
                if (result.bankPayInfo) {
                    bank = result.bankPayInfo.map((item) => {
                        let itemReg = _.assign({}, item);
                        itemReg.type = 'bank';
                        return itemReg;
                    })
                }
                let bbb = ali.concat(wexin, bank);
                this.setState({
                    listData: ali.concat(wexin, bank)
                });
            });
        }
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null
        }
    }

    render() {
        return (
            <Animated.View style={{ flex: 1, opacity: this.state.fadeAnim }}>
                <View style={styles.container}>
                    <View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>收款方式</Text>
                        </View>
                        <View style={styles.listWrapper}>
                            <FlatList
                                data={this.state.listData}
                                renderItem={({ item, index }) => <Item index={index} item={item} />}
                                extraData={this.state.selectType}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, height: 85, width: Dimensions.get('window').width - 30, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                            <Btn.Linear
                                style={styles.backBtn}
                                textStyle={styles.backBtnText}
                                btnPress={() => this.back(500)}
                                title='确定'
                            />
                        </View>
                    </View>
                </View>
            </Animated.View>
        )
    }

    back = (value) => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 400
            }
        ).start();
        this.timer = setTimeout(() => {
            this.timer = null;
            this.props.navigation.goBack();
        }, value)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTextNormal: {
        fontFamily: 'PingFang-SC-Regular',
        fontSize: 16,
        color: 'rgb(40,46,60)'
    },
    itemTextHighlight: {
        fontFamily: 'PingFang-SC-Regular',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'rgb(64,99,213)'
    },
    titleContainer: {
        height: 60,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        marginTop: 20,
        alignSelf: 'center',
        fontFamily: 'PingFang-SC-Regular',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'rgb(40,46,60)'
    },
    backBtn: {
        height: 45,
        width: Dimensions.get('window').width - 60,
        borderRadius: 5
    },
    backBtnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15
    },
    listWrapper: {
        height: 300,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'rgb(243,245,249)'
    },
    itemContainer: {
        height: 90,
        width: Dimensions.get('window').width - 30,
    },
    itemBody: {
        height: 90,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'white',
        borderBottomColor: '#F1F1F1',
        borderBottomWidth: 1
    },
    itemIcon: {
        height: 22,
        width: 22,
        marginLeft: 15
    },
    itemTitle: {
        marginLeft: 5,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(68,68,68)'
    },
    itemAccountName: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(133,133,133)'
    },
    itemAccount: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)'
    }
});