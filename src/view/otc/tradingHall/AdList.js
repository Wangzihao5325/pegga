import React, { PureComponent } from 'react';
import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { adListUpdate, adListPush } from '../../../store/actions/adListAction';
import AdListItem from './AdListItem';

class AdList extends PureComponent {

    state = {
        pageload: { current: 1, size: 10 },
        isLoading: false,
        isFetching: false,
    }

    naviDidFocus = () => {
        adListUpdate(
            null,
            null,
            () => this.setState({ isLoading: true }),
            () => this.setState({ isLoading: false })
        );
    }

    _nextPage = () => {
        if (this.state.pageload.current > this.state.pages) {
            return;
        }
        if (this.state.isFetching) {
            return;
        }
        this.state.pageload.current++;
        adListPush(null, this.state.pageload, () => {
            this.setState({
                isFetching: true
            });
        }, (payloadParam, pageload, result) => {
            this.setState({
                pages: result.pages,
                isFetching: false
            });
        });
    }

    _onFresh = () => {
        adListUpdate();
        this.setState({
            pageload: { current: 1, size: 10 },
            isLoading: false,
            isFetching: false,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents
                    onDidFocus={this.naviDidFocus}
                />
                <FlatList
                    nestedScrollEnabled={true}
                    //style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
                    refreshing={this.state.isLoading}
                    onRefresh={this._onFresh}
                    onEndReached={this._nextPage}
                    onEndReachedThreshold={0.2}
                    showsVerticalScrollIndicator={false}
                    data={this.props.data}
                    renderItem={({ item }) => <AdListItem key={item.advertiseNo} item={item} tradeCallback={() => this.trade(item)} />}
                />
            </View>

        );
    }

    trade = (item) => {
        if (this.props.isBindingPay) {
            let itemStr = JSON.stringify(item)
            this.props.navi.navigate('BuyIn', { itemStr });
        } else {
            this.props.navi.navigate('PopModel', {
                confirm: () => this.props.navi.navigate('PayManager'),
                confirmText: '立即绑定',
                title: '提示',
                context: '需要绑定支付方式才能进行交易!'
            });
        }

    }
}

function mapState2Props(store) {
    return {
        tradeType: store.otcState.tradeType,
        token: store.otcState.coinType,
        payType: store.otcState.payType,
        legalCoin: store.otcState.currencyType,

        isDataLoading: store.adList.isDataLoading,
        data: store.adList.data,
        isBindingPay: store.user.state.isBindingPay
    }
}

export default connect(mapState2Props)(AdList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15
    },
});