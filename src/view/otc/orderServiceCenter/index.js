import React, { Component } from 'react';
import {
    SafeAreaView,
    FlatList,
    View,
    Text,
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

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <NavigationEvents
                    onDidFocus={this._orderListDataUpdate}
                />
                <View style={{ flex: 1, backgroundColor: '#F2F2F2', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white' }}>
                        <Header.Normal title='订单中心' goback={() => this.props.navigation.goBack()} />
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
                        renderItem={({ item }) => <Item item={item} containerPress={() => this.goToOrderDetail(item)} />}
                    />
                </View>
            </SafeAreaView>
        );
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


}

function mapState2Props(store) {
    return {
        orderType: store.otcState.orderType,

        data: store.orderList.data,
        currentPage: store.orderList.currentPage,
        totalPage: store.orderList.totalPage
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
    }
});