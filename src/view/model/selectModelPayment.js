import React, { Component } from 'react';
import { Animated, Image, TouchableHighlight, FlatList, View, Text, Dimensions, StyleSheet } from 'react-native';
import _ from 'lodash';
import Btn from '../../component/btn';
import Select from '../../component/select';
import I18n from '../../global/doc/i18n';

function Item(props) {//index  data:[select,title,key]
    const btnPress = () => {
        props.itemPress(props.item, props.index, props.type);
    }
    let selectImage = props.item.isSelect ? require('../../image/otc/payment/payment_select.png') : require('../../image/otc/payment/payment_unselect.png');
    let iconUrl = require('../../image/otc/payment/pay_alipay.png');
    let title = '支付宝';
    let account = '';
    let name = '';
    switch (props.type) {
        case 'aliPassed':
            iconUrl = require('../../image/otc/payment/pay_alipay.png');
            title = '支付宝';
            account = props.item.no;
            name = props.item.nickName;
            break;
        case 'wexinPassed':
            iconUrl = require('../../image/otc/payment/pay_WeChat.png');
            title = '微信';
            account = props.item.no;
            name = props.item.nickName;
            break;
        case 'bankPassed':
            iconUrl = require('../../image/otc/payment/pay_card.png');
            title = props.item.bank;
            account = props.item.card;
            name = props.item.realName;
            break;
    }
    return (
        <View style={styles.itemContainer}>
            <TouchableHighlight underlayColor='transparent' onPress={btnPress}>
                <View style={styles.itemBody}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width - 60 }}>
                        <Image style={styles.itemIcon} source={iconUrl} />
                        <Text style={styles.itemTitle}>{`${title}`}</Text>
                        <View style={{ flex: 1, flexDirection: 'row-reverse' }}><Image style={{ height: 16, width: 16 }} source={selectImage} /></View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                            <Text style={styles.itemAccount}>{`${account}`}</Text>
                            <Text style={styles.itemAccountName}>{`${name}`}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'flex-end' }}>
                            <Image style={{ height: 25, width: 25 }} source={require('../../image/otc/payment/qrCode.png')} />
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
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
        type: '',
        title: null,
        data: {},
        selectIndexArr: [],
        selectType: 'aliPassed',
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

        const type = this.props.navigation.getParam('type', 'single');//single multiple
        const dataStr = this.props.navigation.getParam('data', '[]');
        const title = this.props.navigation.getParam('title', '请选择');
        let data = JSON.parse(dataStr);
        this.setState({
            type,
            title,
            data,
            listData: data[this.state.selectType]
        });
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
                            <Text style={styles.title}>{this.state.title}</Text>
                        </View>
                        <View style={styles.listWrapper}>
                            <Select.ScrollLinear
                                data={[{ title: I18n.PAY_ALIPAY, key: 'aliPassed' }, { title: I18n.PAY_WECHAT, key: 'wexinPassed' }, { title: I18n.PAY_CARD, key: 'bankPassed' }]}
                                isFlex={true}
                                style={{ backgroundColor: 'white' }}
                                selectValue={this.state.selectType}
                                selectChange={this.selectChange}
                                isControl
                            />
                            <FlatList
                                data={this.state.listData}
                                renderItem={({ item, index }) => <Item itemPress={this.itemPress} index={index} item={item} type={this.state.selectType} />}
                                extraData={this.state.selectType}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <Btn.Linear
                            style={styles.backBtn}
                            textStyle={styles.backBtnText}
                            btnPress={() => this.goBackWithCallback(500)}
                            title='确定'
                        />
                    </View>
                </View>
            </Animated.View>
        )
    }

    itemPress = (item, index, type) => {
        let dataCopy = JSON.parse(JSON.stringify(this.state.data));
        let isSelect = dataCopy[type][index].isSelect;
        dataCopy[type][index].isSelect = !isSelect;
        if (this.state.type == 'multiple') {
            this.setState({
                data: dataCopy,
                listData: dataCopy[this.state.selectType]
            });
        } else if (this.state.type == 'single') {
            let singleList = dataCopy[type].map((item, singleIndex) => {
                if (item.isSelect && singleIndex !== index) {
                    item.isSelect = false;
                }
                return item;
            });
            dataCopy[type] = singleList
            this.setState({
                data: dataCopy,
                listData: dataCopy[this.state.selectType]
            });
        }
    }

    selectChange = (item) => {
        this.setState({
            selectType: item.key,
            listData: this.state.data[item.key]
        })
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

    goBackWithCallback = (delay) => {
        let aliSelect = this.state.data['aliPassed'].filter((item) => {
            if (item.isSelect) {
                return true
            } else {
                return false
            }
        });
        let wexinSelect = this.state.data['wexinPassed'].filter((item) => {
            if (item.isSelect) {
                return true
            } else {
                return false
            }
        });
        let bankSelect = this.state.data['bankPassed'].filter((item) => {
            if (item.isSelect) {
                return true
            } else {
                return false
            }
        });
        let selectData = {
            aliPassed: aliSelect,
            wexinPassed: wexinSelect,
            bankPassed: bankSelect
        }
        this.props.navigation.state.params.callback(selectData, this.state.data);
        this.back(delay);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    itemContainer: {
        height: 45,
        width: Dimensions.get('window').width,
        backgroundColor: 'white'
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
        width: Dimensions.get('window').width,
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
        height: 65,
        width: Dimensions.get('window').width,
    },
    backBtnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15
    },
    listWrapper: {
        height: 300,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgb(243,245,249)'
    },
    itemContainer: {
        height: 120,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemBody: {
        height: 110,
        width: Dimensions.get('window').width - 30,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    itemIcon: {
        height: 22,
        width: 22
    },
    itemTitle: {
        marginLeft: 5,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(68,68,68)'
    },
    itemAccountName: {
        marginTop: 10,
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