import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, StatusBar, FlatList, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import Api from '../../../socket/index';
import Colors from '../../../global/Colors';
import Header from '../../../component/header';
import Select from './Select';
import Toast from '../../../component/toast';

const Item = (props) => {
    let uri = require('../../../image/arrow/in.png');
    let sign = '+';
    let title = '交易购入';
    let amountColor = { color: 'rgb(40,46,60)' };
    if (props.item.origin == 1) {
        uri = require('../../../image/arrow/in.png');
        sign = '+';
        amountColor = { color: 'rgb(40,46,60)' };
    } else if (props.item.origin == -1) {
        uri = require('../../../image/arrow/out.png');
        sign = '-';
        amountColor = { color: 'rgb(64,99,213)' };
    }
    switch (props.item.type) {
        case 1:
            title = '交易购入';
            break;
        case 2:
            title = '交易卖出';
            break;
        case 3:
            title = '普通商家申请';
            break;
        case 4:
            title = '认证商家申请';
            break;
        case 5:
            title = '大宗商家申请';
            break;
        case 6:
            title = '交易手续费';
            break;
        case 7:
            title = '交易补贴';
            break;
        case 8:
            title = '夜间补贴';
            break;
        case 9:
            title = '达量补贴';
            break;
        case 10:
            title = '分享补贴';
            break;
        case 11:
            title = '退还激活金';
            break;
        case 12:
            title = '退还保证金';
            break;

    }
    return (
        <View style={styles.itemContainer}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderBottomColor: '#F3F3F3', borderBottomWidth: 1 }}>
                <Image style={styles.itemAvater} source={uri} />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, marginLeft: 10, flexDirection: 'column' }}>
                        <Text style={{ fontSize: 15, color: 'rgb(40,46,60)', fontFamily: 'PingFang-SC-Medium' }}>{`${title}`}</Text>
                        {typeof props.item.orderId == 'string' && <Text style={{ fontSize: 13, color: 'rgb(188,192,203)', fontFamily: 'PingFang-SC-Regular', marginTop: 10 }}>{`订单编号${props.item.orderId}`}</Text>}
                    </View>
                    <View style={{ width: 150, height: 80, alignItems: 'flex-end', justifyContent: 'center', flexDirection: 'column' }}>
                        <Text style={[{ fontSize: 16, fontWeight: 'bold' }, amountColor]}>{`${sign} ${props.item.amount} PQC`}</Text>
                        <Text style={{ fontSize: 13, color: 'rgb(188,192,203)', fontFamily: 'PingFang-SC-Regular', marginTop: 10 }}>{`${props.item.createTime}`}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

class MoneyFlow extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: [],
        page: null,
    }

    _flowDataUpdate = (billType, billTime) => {
        let payload = { type: 'ALL', token: 'PQC', days: 7 };
        switch (billType.key) {
            case 0:
                payload.type = 'ALL';
                break;
            case 1:
                payload.type = 'INCOME';
                break;
            case 2:
                payload.type = 'EXPEND';
                break;
            default:
                break;
        }
        switch (billTime.key) {
            case 0:
                payload.days = 7;
                break;
            case 1:
                payload.days = 30;
                break;
            default:
                break;
        }
        Api.moneyFlowList(payload, (result) => {
            this.setState({
                data: result.records,
                page: result.pages
            });
        });
    }

    naviDidFocus = () => {
        this._flowDataUpdate(this.props.billType, this.props.billTime);
    }

    render() {
        return (
            <>
                <NavigationEvents
                    onDidFocus={this.naviDidFocus}
                />
                <SafeAreaView style={styles.safeContainer}>
                    <Header.Normal title='账单信息' goback={() => this.props.navigation.goBack()} />
                    <Select
                        type={this.props.billType}
                        timeType={this.props.billTime}
                        typePress={() => this.goToSelectModel('BILL_TYPE')}
                        timeTypePress={() => this.goToSelectModel('BILL_TIME_TYPE')}
                    />
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.data}
                        renderItem={({ item }) => <Item item={item} key={item.orderId} />}
                    />
                </SafeAreaView>
            </>
        );
    }

    goToSelectModel = (typeKey) => {
        this.props.navigation.navigate('Assets_BillTypeSelect', { type: typeKey });
    }
}

function mapState2Props(store) {
    return {
        billType: store.assets.billType,
        billTime: store.assets.billTime,
    }
}

export default connect(mapState2Props)(MoneyFlow)

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.MAIN_BG_COLOR,
        flexDirection: 'column',
        alignItems: 'center'
    },
    itemContainer: {
        height: 80,
        width: Dimensions.get('window').width,
        paddingHorizontal: 15,
    },
    itemAvater: {
        height: 25,
        width: 25
    }
});