import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import store from '../../../store';
import { update_ad_list_data } from '../../../store/actions/adListAction';
import Api from '../../../socket/index';
import Item from './Item';
import Toast from '../../../component/toast';

class List extends Component {

    _updateListData = () => {
        let payload = {
            type: this.props.adTradeType,
            status: this.props.adStateType
        };
        Api.myAd(payload, (result) => {
            let storePayload = {
                myAdData: result.records,
                myAdCurrentPage: result.current,
                myAdTotalPage: result.pages
            };
            store.dispatch(update_ad_list_data(storePayload));
        });
    }

    naviDidFocus = () => {
        this._updateListData();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents
                    onDidFocus={this.naviDidFocus}
                />
                <FlatList
                    data={this.props.myAdData}
                    renderItem={({ item, index }) => <Item key={item.advertiseNo} item={item} index={index} callback={this.itemPress} />}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    itemPress = (item, index) => {
        if (item.status === 0) {//已下架广告->去编辑
            let itemStr = JSON.stringify(item);
            this.props.navi.navigate('NewAd', { itemStr });
        } else if (item.status === 1) {//正上架广告->下架
            Api.cancelAd(item.advertiseNo, (result, code, mes) => {
                this._updateListData();
            }, (result, code, message) => {
                let msg = message ? message : '下架广告失败';
                Toast.show(msg);
            })
        }
    }
}

function mapState2Props(store) {
    return {
        adTradeType: store.otcState.adTradeType,
        adStateType: store.otcState.adStateType,

        myAdData: store.adList.myAdData,
        myAdCurrentPage: store.otcState.myAdCurrentPage,
        myAdTotalPage: store.otcState.myAdTotalPage
    }
}

export default connect(mapState2Props)(List);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    }
});