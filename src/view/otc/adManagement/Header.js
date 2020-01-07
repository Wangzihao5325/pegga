import React, { Component } from 'react';
import {
    View,
    TouchableHighlight,
    Image,
    Text,
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
import Enum from '../../../global/Enum';


class Header extends Component {
    constructor(props) {
        super(props);
        this.timer = null;
    }

    _autoFitterState = () => {
        Api.adAutoFitter((result) => {
            store.dispatch(otc_state_change_danger({ adAutoFitter: result.open ? 'open' : 'close' }));

            if (result.open) {
                this.timer = setInterval(() => {
                    Api.adAutoFitter((result) => {
                        store.dispatch(otc_state_change_danger({ adAutoFitter: result.open ? 'open' : 'close' }));
                    });
                }, 3000);
            }
        });
    }

    naviDidFocus = () => {
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
                        <TouchableHighlight onPress={this.autoFitterChange} underlayColor='transparent' style={{ height: 20, width: 80 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                {this.props.adAutoFitter == 'open' ? <LottieView style={{ height: 20, width: 20 }} source={require('../../../image/animate/auto_receipt.json')} autoPlay /> : <Image style={{ height: 20, width: 20 }} source={require('../../../image/otc/auto.png')} />}
                                <Text style={[styles.autoBtnText, this.props.adAutoFitter == 'open' ? { color: '#282e3c' } : { color: '#bcc0cb' }]}>{this.props.adAutoFitter == 'open' ? '接单中' : '未开启'}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
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

    autoFitterChange = () => {
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
        }, null, { current: 1, size: 10 });
    }
}

function mapState2Props(store) {
    return {
        adTradeType: store.otcState.adTradeType,
        adStateType: store.otcState.adStateType,
        adAutoFitter: store.otcState.adAutoFitter,
        role: store.user.role
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
    },
    autoBtnText: {
        marginLeft: 5,
        fontSize: 13,
    }
});