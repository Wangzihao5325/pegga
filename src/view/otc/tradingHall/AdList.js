import React, { PureComponent } from 'react';
import {
    View,
    FlatList,
    RefreshControl,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import LottieView from 'lottie-react-native';

import store from '../../../store';
import { adListUpdate, adListPush } from '../../../store/actions/adListAction';
import Api from '../../../socket/index';
import AdListItem from './AdListItem';

const DEFAULT_PAGE_LOAD = { current: 1, size: 10 };

class AdList extends PureComponent {

    state = {
        pageload: DEFAULT_PAGE_LOAD,
        isLoading: false
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
        this.state.pageload.current++;
        adListPush(null, this.state.pageload);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents
                    onDidFocus={this.naviDidFocus}
                />
                <FlatList
                    refreshing={this.state.isLoading}
                    onRefresh={() => adListUpdate()}
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
        let itemStr = JSON.stringify(item)
        this.props.navi.navigate('BuyIn', { itemStr });
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
    }
}

export default connect(mapState2Props)(AdList);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 15
    },
});