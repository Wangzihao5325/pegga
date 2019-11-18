import React, { PureComponent } from 'react';
import {
    View,
    TouchableHighlight,
    SafeAreaView,
    Image,
    Text,
    Dimensions,
    Modal,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import store from '../../../store';
import { otc_state_change_danger } from '../../../store/actions/otcStateAction';
import { adListUpdate } from '../../../store/actions/adListAction';
import Select from '../../../component/select';
import Toast from '../../../component/toast';
import Btn from '../../../component/btn';

const CurrencyBtn = (props) => {
    return (
        <TouchableHighlight underlayColor='transparent' onPress={props.callback}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'PingFang-SC-Medium', fontSize: 13, color: 'rgb(102,102,102)', marginHorizontal: 3 }}>{`${props.title}`}</Text>
                <Image style={{ height: 15, width: 15 }} source={require('../../../image/otc/option.png')} />
            </View>
        </TouchableHighlight>
    );
}

const PopTab = (props) => {
    return (
        <View style={styles.popContainer}>
            <Text onPress={props.orderCenter}>订单中心</Text>
            <Text onPress={props.adManage}>广告管理</Text>
            <Text onPress={props.publishAd}>发布广告</Text>
        </View>
    );
}

class Header extends PureComponent {
    state = {
        isModelShow: false
    }

    render() {
        return (
            <View style={{ position: 'relative' }}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.isModelShow}
                    onRequestClose={() => console.log('close')}
                >
                    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <TouchableHighlight style={styles.model} onPress={() => this.setState({ isModelShow: false })}>
                            <PopTab
                                orderCenter={() => this.goToPage('OrderServiceCenterView')}
                                adManage={() => this.goToPage('AdManagementView')}
                                publishAd={() => this.goToPage('NewAd')}
                            />
                        </TouchableHighlight>
                    </SafeAreaView>
                </Modal>
                <View style={[styles.container, { justifyContent: 'flex-end' }]}>
                    <CurrencyBtn
                        title='人民币区'
                        callback={this.currencyTypeChange}
                    />
                </View>
                <View style={[styles.container, { justifyContent: 'space-between', borderBottomColor: '#EEF2F9', borderBottomWidth: 1 }]}>
                    <Select.Swich
                        data={[{ title: '我要买', key: 0 }, { title: '我要卖', key: 1 }]}
                        selectValue={this.props.tradeType}
                        callback={this.tradeTypeChange}
                        isControl
                        itemHighlightStyle={styles.itemContainer}
                        itemNormallightStyle={styles.itemContainer}
                        highlightText={styles.itemHighlightText}
                        normalText={styles.itemNormallightText}
                    />
                    <Btn.Icon
                        source={require('../../../image/otc/breadBar.png')}
                        callback={() => this.setState({ isModelShow: true })}
                    />
                </View>
                <View style={{ height: 45, width: Dimensions.get('window').width }}>
                    <Select.Scroll
                        data={[{ title: 'PQC', key: 'PQC' }, { title: 'USDT', key: 'USDT' }, { title: 'BTC', key: 'BTC' }, { title: 'EOS', key: 'EOS' }, { title: 'ECT', key: 'ETC' }]}
                        selectValue={this.props.coinType}
                        selectChange={this.coinTypeChange}
                        isControl
                        highlightText={styles.highlightText}
                        normallightText={styles.normallightText}
                    />
                </View>
            </View>
        );
    }

    goToPage = (page) => {
        this.setState({
            isModelShow: false
        });
        this.props.navi.navigate(page);
    }

    goBack = () => {
        if (typeof this.props.goBackCallback == 'function') {
            this.props.goBackCallback();
        }
    }

    tradeTypeChange = (item, index) => {
        store.dispatch(otc_state_change_danger({ tradeType: item.key }));
        adListUpdate({ type: item.key });
    }

    coinTypeChange = (item, index) => {
        Toast.show('其他币种尚未开放，敬请期待!');
        // store.dispatch(otc_state_change_danger({coinType: item.key }));
        //adListUpdate({token: item.key });
    }

    currencyTypeChange = (selectKey) => {
        //此处使用 Btn.Control
        // store.dispatch(otc_state_change_danger({ currencyType: selectKey }));
        //adListUpdate({ fiat: selectKey });
        Toast.show('外币区尚未开放，敬请期待!');
    }
}

function mapState2Props(store) {
    return {
        tradeType: store.otcState.tradeType,
        coinType: store.otcState.coinType,
        currencyType: store.otcState.currencyType,//1
        payType: store.otcState.payType,
    }
}

export default connect(mapState2Props)(Header);

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 1
    },
    backBtn: {
        height: 20,
        width: 20
    },
    backBtnImage: {
        height: 20,
        width: 20
    },
    controlBtn: {
        height: 40,
        width: 40,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        backgroundColor: 'white'
    },
    itemHighlightText: {
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        fontSize: 18,
        color: 'rgb(51,51,51)',
        alignSelf: 'flex-end'
    },
    itemNormallightText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 13,
        color: 'rgb(133,133,133)',
        alignSelf: 'flex-end'
    },
    highlightText: {
        fontSize: 15,
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        color: 'rgb(91,135,227)',
    },
    normallightText: {
        fontSize: 15,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(179,179,179)',
    },
    popContainer: {
        position: 'absolute',
        right: 40,
        top: 40,
        height: 150,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#FBFCFF',
        borderWidth: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    model: {
        flex: 1,
        position: 'relative',
        backgroundColor: 'transparent'
    }
});