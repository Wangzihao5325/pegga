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

    constructor(props) {
        super(props);
        this.timer = null;
    }

    state = {
        isFetching: false,
        isLoading: false
    }

    _orderListDataUpdate = () => {
        this.setState({ isLoading: true });
        let params = { status: this.props.orderType };
        Api.myOrder(params, (result) => {
            let payload = {
                data: result.records,
                currentPage: result.current,
                totalPage: result.pages,
            }
            store.dispatch(update_order_list_data(payload));
            this.setState({ isLoading: false });
        }, () => {
            this.setState({ isLoading: false });
        }, { current: 1, size: 10 })
    }

    _nextPage = () => {
        if (this.props.totalPage > this.props.currentPage) {
            let params = { status: this.props.orderType };
            Api.myOrder(params, (result) => {
                let newData = this.props.data.concat(result.records);
                let payload = {
                    data: newData,
                    currentPage: result.current,
                    totalPage: result.pages,
                }
                store.dispatch(update_order_list_data(payload));
            }, null, { current: this.props.currentPage + 1, size: 10 })
        }
    }

    _autoFitterState = () => {
        this.setState({
            isFetching: true
        });
        Api.adAutoFitter((result) => {
            store.dispatch(otc_state_change_danger({ adAutoFitter: result.open ? 'open' : 'close' }));
            this.setState({
                isFetching: false
            });
            if (result.open) {
                this.timer = setInterval(() => {
                    Api.adAutoFitter((result) => {
                        store.dispatch(otc_state_change_danger({ adAutoFitter: result.open ? 'open' : 'close' }));
                    });
                }, 3000);
            }
        }, () => {
            this.setState({
                isFetching: false
            });
        });
    }

    _onFresh = () => {
        this._orderListDataUpdate();
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
                                {/* <TouchableHighlight
                                    style={styles.image}
                                    onPress={() => this.props.navigation.goBack()}
                                    underlayColor='transparent'
                                >
                                    <Image
                                        style={styles.image}
                                        source={require('../../../image/arrow/back_arrow_black.png')}
                                    />
                                </TouchableHighlight> */}
                            </View>
                            <View style={styles.centerWrapper}>
                                <Text style={styles.title}>订单中心</Text>
                            </View>
                            <View style={[styles.wrapper, { flexDirection: 'row-reverse' }]}>
                                <TouchableHighlight onPress={this.autoFitterChange} underlayColor='transparent' style={{ height: 20, width: 80 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        {this.props.adAutoFitter == 'open' ? <LottieView style={{ height: 20, width: 20 }} source={require('../../../image/animate/auto_receipt.json')} autoPlay /> : <Image style={{ height: 20, width: 20 }} source={require('../../../image/otc/auto.png')} />}
                                        <Text style={[styles.autoBtnText, this.props.adAutoFitter == 'open' ? { color: '#282e3c' } : { color: '#bcc0cb' }]}>{this.props.adAutoFitter == 'open' ? '接单中' : '未开启'}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        <Select.ScrollLinear
                            data={[{ title: '进行中', key: 'going' }, { title: '已完成', key: 'completed' }, { title: '已取消', key: 'canceled' }]}
                            selectValue={this.props.orderType}
                            selectChange={this.orderTypeChange}
                            isControl
                            isFlex
                        />
                    </View>
                    {
                        (this.props.data && this.props.data.length > 0) ?
                            < FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.props.data}
                                renderItem={({ item }) => <Item item={item} containerPress={() => this.goToOrderDetail(item)} cancelPress={() => this.orderCancel(item)} />}
                                onEndReached={this._nextPage}
                                onEndReachedThreshold={0.2}
                                refreshing={this.state.isLoading}
                                onRefresh={this._onFresh}
                            />
                            :
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Image style={{ width: 110, height: 130 }} source={require('../../../image/no_image/empty_order.png')} />
                            </View>
                    }
                </View>
            </SafeAreaView>
        );
    }

    autoFitterChange = () => {
        if (this.state.isFetching) {
            Toast.show('正在与服务器通信中，请稍后再进行操作');
            return;
        }
        if (this.props.adAutoFitter == 'open') {
            Api.autoFitterSwichoff(() => {
                Toast.show('已关闭自动接单');
                store.dispatch(otc_state_change_danger({ adAutoFitter: 'close' }));
                this.naviWillBlur();
            });

        } else {
            Api.autoFitterSwichon(() => {
                Toast.show('已开启自动接单');
                store.dispatch(otc_state_change_danger({ adAutoFitter: 'open' }));
                this._autoFitterState();
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
        }, null, { current: 1, size: 10 })
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
    },
    autoBtnText: {
        marginLeft: 5,
        fontSize: 13,
    }
});