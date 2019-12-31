import React, { Component } from 'react';
import {
    SafeAreaView,
    FlatList,
    View,
    TouchableHighlight,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import Api from '../../../socket/index';
import store from '../../../store';
import { otc_state_change_danger } from '../../../store/actions/otcStateAction';
import { update_order_list_data } from '../../../store/actions/orderListAction'
import Colors from '../../../global/Colors';
import Select from '../../../component/select';
import Item from './Item';
import Header from '../../../component/header';
import Toast from '../../../component/toast';
import LottieView from 'lottie-react-native';
import Enum from '../../../global/Enum';

class OrderManagement extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _orderListDataUpdate = () => {
        let params = { status: this.props.orderType };
        Api.myOrder(params, (result) => {
            let payload = {
                data: result.records,
                currentPage: result.current,
                totalPage: result.pages,
            }
            store.dispatch(update_order_list_data(payload));
        })
    }

    _autoFitterState = () => {
        Api.adAutoFitter((result) => {
            store.dispatch(otc_state_change_danger({ adAutoFitter: result.open ? 'open' : 'close' }));
        });
        this.timer = setInterval(() => {
            Api.adAutoFitter((result) => {
                store.dispatch(otc_state_change_danger({ adAutoFitter: result.open ? 'open' : 'close' }));
            });
        }, 3000);
    }

    naviDidFocus = () => {
        this._orderListDataUpdate();
        if (this.props.role.roleName != Enum.ROLE.BUSINESS_ROLE[0].key && this.props.role.roleName != Enum.ROLE.BUSINESS_ROLE[1].key) {
            this._autoFitterState();
        }
    }

    naviWillBlur = () => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <NavigationEvents
                    //onDidFocus={this._orderListDataUpdate}
                    onDidFocus={this.naviDidFocus}
                    onWillBlur={this.naviWillBlur}
                />
                <View style={{ flex: 1, backgroundColor: '#F2F2F2', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white' }}>
                        <View style={styles.header}>
                            <View style={styles.wrapper}>
                                <TouchableHighlight
                                    style={styles.image}
                                    onPress={() => this.props.navigation.goBack()}
                                    underlayColor='transparent'
                                >
                                    <Image
                                        style={styles.image}
                                        source={require('../../../image/arrow/back_arrow_black.png')}
                                    />
                                </TouchableHighlight>
                            </View>
                            <View style={styles.centerWrapper}>
                                <Text style={styles.title}>订单中心</Text>
                            </View>
                            <View style={[styles.wrapper, { justifyContent: 'center' }]}>
                                <TouchableHighlight onPress={this.autoFitterChange} underlayColor='transparent' style={{ height: 20, width: 20 }}>
                                    {this.props.adAutoFitter == 'open' ? <LottieView style={{ height: 20, width: 20 }} source={require('../../../image/animate/auto_receipt.json')} autoPlay /> : <Image style={{ height: 20, width: 20 }} source={require('../../../image/otc/auto.png')} />}
                                </TouchableHighlight>
                            </View>
                        </View>
                        {/* <Header.Normal title='订单中心' goback={() => this.props.navigation.goBack()} /> */}
                        <Select.ScrollLinear
                            data={[{ title: '进行中', key: 'going' }, { title: '已完成', key: 'completed' }, { title: '已取消', key: 'canceled' }]}
                            selectValue={this.props.orderType}
                            selectChange={this.orderTypeChange}
                            isControl
                            isFlex
                        />
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.props.data}
                        renderItem={({ item }) => <Item item={item} containerPress={() => this.goToOrderDetail(item)} cancelPress={() => this.orderCancel(item)} />}
                    />
                </View>
            </SafeAreaView>
        );
    }

    autoFitterChange = () => {
        if (this.props.adAutoFitter == 'open') {
            Api.autoFitterSwichoff(() => {
                Toast.show('已关闭自动接单');
                store.dispatch(otc_state_change_danger({ adAutoFitter: 'close' }));
            });

        } else {
            Api.autoFitterSwichon(() => {
                Toast.show('已开启自动接单');
                store.dispatch(otc_state_change_danger({ adAutoFitter: 'open' }));
            });
        }
    }

    orderTypeChange = (item, index) => {
        store.dispatch(otc_state_change_danger({ orderType: item.key }));
        let params = { status: item.key };
        Api.myOrder(params, (result) => {
            let payload = {
                data: result.records,
                currentPage: result.current,
                totalPage: result.pages,
            }
            store.dispatch(update_order_list_data(payload));
        })
    }

    goToOrderDetail = (item) => {
        this.props.navigation.navigate('OTC_OrderDetails', { orderNum: item.orderNo });
    }

    _cancelConfirmCallback = (item) => {
        Api.cancelOrder(item.orderNo, () => {
            Toast.show('订单取消成功')
            this._orderListDataUpdate();
        })
    }

    orderCancel = (item) => {
        this.props.navigation.navigate('PopModel', {
            confirm: () => this._cancelConfirmCallback(item),
            confirmText: '确认',
            title: '确认取消',
            context: '是否确认取消该订单?'
        });

    }
}

function mapState2Props(store) {
    return {
        orderType: store.otcState.orderType,
        data: store.orderList.data,
        currentPage: store.orderList.currentPage,
        totalPage: store.orderList.totalPage,
        adAutoFitter: store.otcState.adAutoFitter,
        role: store.user.role
    }
}

export default connect(mapState2Props)(OrderManagement);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.MAIN_BG_COLOR,
        flexDirection: 'column',
        alignItems: 'center'
    },
    header: {
        height: 44,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderBottomColor: 'rgb(238,242,249)',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    wrapper: {
        height: 44,
        width: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    centerWrapper: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 20,
        width: 20
    },
    title: {
        fontSize: 20
    }
});