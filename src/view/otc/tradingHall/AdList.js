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

const DEFAULT_PAGE_LOAD = { current: 1, size: 10 };

class AdList extends PureComponent {

    state = {
        pageload: DEFAULT_PAGE_LOAD,
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