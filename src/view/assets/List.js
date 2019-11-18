import React, { PureComponent } from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';

import { assets_info_update } from '../../store/actions/assetsAction';
import Item from './ListItem';

function Header() {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerTitleText}>资产</Text>
        </View>
    );
}

class List extends PureComponent {

    state = {
        refreshing: false
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    renderItem={
                        ({ item }) => <Item
                            title={item[0]}
                            value={item[1].allAmount}
                            money={item[1].legalAmount}
                            callback={() => this.naviToAssetsDetail(item[0], item[1])}
                        />
                    }
                    ListHeaderComponent={<Header />}
                    onRefresh={this.refresh}
                    refreshing={this.state.refreshing}
                />
            </View>
        );
    }

    naviToAssetsDetail = (coinName, coinDetailObj) => {
        let cDetailStr = JSON.stringify(coinDetailObj);
        this.props.navi.navigate('AssetsDetail', { cName: coinName, cDetailStr });
    }

    refresh = () => {
        this.setState({
            refreshing: true
        });

        assets_info_update(
            () => this.setState({
                refreshing: false
            })
        );
    }

}

function mapState2Props(store) {
    return {
        data: _.toPairs(store.assets.legalWallet)
    }
}

export default connect(mapState2Props)(List);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FBFF'
    },
    headerContainer: {
        height: 51,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    headerTitleText: {
        fontSize: 17,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium',
        marginHorizontal: 15
    }
});