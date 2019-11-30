import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import Api from '../../../socket/index';
import store from '../../../store';
import { otc_state_change_danger } from '../../../store/actions/otcStateAction';
import { update_ad_list_data } from '../../../store/actions/adListAction';
import Select from '../../../component/select';
import Btn from '../../../component/btn';
import Toast from '../../../component/toast/index';
import LottieView from 'lottie-react-native';


class Header extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
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
        this._autoFitterState();
    }

    naviWillBlur = () => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }


    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <NavigationEvents
                    onDidFocus={this.naviDidFocus}
                    onWillBlur={this.naviWillBlur}
                />
                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <TouchableHighlight style={styles.backBtn} onPress={this.btnPress} underlayColor='transparent'>
                            <Image style={styles.backBtnImage} source={require('../../../image/arrow/back_arrow_black.png')} />
                        </TouchableHighlight>
                    </View>
                    <Select.SwichLinear
                        data={[{ title: '买入', key: 0 }, { title: '卖出', key: 1 }]}
                        selectValue={this.props.adTradeType}
                        callback={this.tradeTypeChange}
                        isControl
                    />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <LottieView style={{ height: 20, width: 20 }} source={require('../../../image/animate/auto.json')} autoPlay />
                        {/* <Btn.Control
                            style={styles.controlBtn}
                            selectKey={this.props.adAutoFitter}
                            data={{ open: '自动接单', close: '开启接单' }}
                            callback={this.autoFitterChange}
                        /> */}
                    </View>
                    {/* <TouchableHighlight style={[styles.backBtn]} onPress={this.btnPress} underlayColor='transparent'>
                        <Image style={styles.backBtnImage} source={require('../../../image/no_image/logo_default.png')} />
                    </TouchableHighlight> */}
                </View>
                <Select.ScrollLinear
                    data={[{ title: '全部', key: 3 }, { title: '上架中', key: 1 }, { title: '已下架', key: 0 }, { title: '完成', key: 2 }]}
                    selectValue={this.props.adStateType}
                    selectChange={this.adStateChange}
                    isControl
                    isFlex
                />
            </View >
        );
    }

    btnPress = () => {
        if (typeof this.props.goBackCallback == 'function') {
            this.props.goBackCallback();
        }
    }

    tradeTypeChange = (item, index) => {
        store.dispatch(otc_state_change_danger({ adTradeType: item.key }));
        this.myAdListUpdate(item.key, null);
    }

    adStateChange = (item, index) => {
        store.dispatch(otc_state_change_danger({ adStateType: item.key }));
        this.myAdListUpdate(null, item.key);
    }

    autoFitterChange = (selectKey) => {
        store.dispatch(otc_state_change_danger({ adAutoFitter: selectKey }));
        if (selectKey == 'open') {
            Api.autoFitterSwichon(() => {
                Toast.show('已开启自动接单');
            });
        } else {
            Api.autoFitterSwichoff(() => {
                Toast.show('已关闭自动接单');
            });
        }
    }

    myAdListUpdate = (tradeType, stateType) => {
        let payload = {
            type: typeof tradeType == 'number' ? tradeType : this.props.adTradeType,
            status: typeof stateType == 'number' ? stateType : this.props.adStateType
        };
        if (stateType == 3) {
            delete payload.status;
        }
        Api.myAd(payload, (result) => {
            let storePayload = {
                myAdData: result.records,
                myAdCurrentPage: result.current,
                myAdTotalPage: result.pages
            };
            store.dispatch(update_ad_list_data(storePayload));
        });
    }
}

function mapState2Props(store) {
    return {
        adTradeType: store.otcState.adTradeType,
        adStateType: store.otcState.adStateType,
        adAutoFitter: store.otcState.adAutoFitter
    }
}

export default connect(mapState2Props)(Header);

const styles = StyleSheet.create({
    container: {
        height: 44,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        justifyContent: 'space-between'
    },
    backBtn: {
        height: 20,
        width: 20
    },
    backBtnImage: {
        height: 20,
        width: 20
    }
});