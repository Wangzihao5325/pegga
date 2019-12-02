import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    FlatList,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux'
import Header from '../../../component/header';
import Banner from './Banner';
import Api from '../../../socket';
import Toast from '../../../component/toast';
import Enum from '../../../global/Enum';
import BottomTab from './BottomTab';

const DEFAULT_APPLY_INFO = { activeBalance: 0, balance: 0, token: 'PQC' };

const isBottomTabShow = (roleName, trustStaple) => {
    if (trustStaple) {//信任大宗
        return false
    }
    switch (roleName) {
        case Enum.ROLE.BUSINESS_ROLE[0].key:
            return false
        case Enum.ROLE.BUSINESS_ROLE[1].key:
            return false
        case Enum.ROLE.BUSINESS_ROLE[2].key:
            return true
        case Enum.ROLE.BUSINESS_ROLE[3].key:
            return false
        case Enum.ROLE.BUSINESS_ROLE[4].key:
            return true
        case Enum.ROLE.BUSINESS_ROLE[5].key:
            return false
    }
}

class MerchantCertification extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        isApply: false,
        listData: []//pageState WAIT/0 审核中 PASS/1 可申请  BACK/2 申请失败
    }

    _updatePageState = (pageType, applyInfoData) => {
        Api.userBusinessApply(result => {
            let pageState = 1;
            if (result) {
                switch (result.status) {
                    case 0:
                        pageState = 0;
                        break;
                    case 1:
                        pageState = 1;
                        break;
                    case 2:
                        Toast.show('您上次提交的申请未通过审核！')
                        pageState = 2;
                        break;
                    default:
                        break;
                }
            }
            this.setState({
                listData: [{ pageType, pageState, applyInfoData }]
            });
        });
    }

    _updateUpgradePagesState = (applyInfoData) => {
        Api.userBusinessApply(result => {
            let pageState = 1;
            if (result) {
                switch (result.status) {
                    case 0:
                        pageState = 0;
                        let payload = { balance: applyInfoData.balance, activeBalance: applyInfoData.trustDeposit, token: applyInfoData.token };
                        if (result.applyRoleName == Enum.ROLE.BUSINESS_ROLE[4]) {
                            payload = { balance: applyInfoData.balance, activeBalance: applyInfoData.stapleDeposit, token: applyInfoData.token };
                        }
                        this.setState({
                            listData: [{ pageType: result.applyRoleName, pageState: pageState, applyInfoData: payload }]
                        });
                        break;
                    case 1:
                        {
                            pageState = 1;
                            let payload3 = { balance: applyInfoData.balance, activeBalance: applyInfoData.trustDeposit, token: applyInfoData.token };
                            let payload4 = { balance: applyInfoData.balance, activeBalance: applyInfoData.stapleDeposit, token: applyInfoData.token };
                            this.setState({
                                listData:
                                    [
                                        { pageType: Enum.ROLE.BUSINESS_ROLE[3].key, pageState: pageState, applyInfoData: payload3 },
                                        { pageType: Enum.ROLE.BUSINESS_ROLE[4].key, pageState: pageState, applyInfoData: payload4 }
                                    ]
                            });
                        }
                        break;
                    case 2:
                        {
                            Toast.show('您上次提交的申请未通过审核！')
                            pageState = 1;
                            let payload3 = { balance: applyInfoData.balance, activeBalance: applyInfoData.trustDeposit, token: applyInfoData.token };
                            let payload4 = { balance: applyInfoData.balance, activeBalance: applyInfoData.stapleDeposit, token: applyInfoData.token };
                            this.setState({
                                listData:
                                    [
                                        { pageType: Enum.ROLE.BUSINESS_ROLE[3].key, pageState: pageState, applyInfoData: payload3 },
                                        { pageType: Enum.ROLE.BUSINESS_ROLE[4].key, pageState: pageState, applyInfoData: payload4 }
                                    ]
                            });
                        }
                        break;
                    default:
                        break;
                }
            }
        });
    }

    /*
    _updateFinalPageState = (pageType, applyInfoData) => {
        Api.userBusinessApply(result => {
            this.setState({
                listData: [{ pageType, pageState: result.status, applyInfoData }]
            });
        });
    }

    _updateStaplePageState = (pageType, applyInfoData) => {
        Api.userBusinessApply(result => {
            this.setState({
                listData: [{ pageType, pageState: result.status, applyInfoData }]
            });
        });
    }
    */

    _trust = () => {
        Api.userBusinessApply(result => {//当前身份 信任
            if (result.roleStatus == -2 && result.status == 0) {//展示页面 普通商家
                Api.bussinessApplyInfo(applyInfoData => {
                    let applyInfoPayload = { balance: applyInfoData.balance, activeBalance: applyInfoData.activeBalance, token: applyInfoData.token }
                    this.setState({
                        listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[2].key, pageState: result.status, applyInfoData: applyInfoPayload }]
                    });
                })
            } else {
                Api.bussinessUpgradeApplyInfo(applyInfoData => {
                    let applyInfoPayload = { balance: applyInfoData.balance, activeBalance: applyInfoData.trustDeposit, token: applyInfoData.token }
                    this.setState({
                        listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[3].key, pageState: result.status, applyInfoData: applyInfoPayload }]
                    });
                })
            }
        });
    }

    _staple = () => {
        Api.userBusinessApply(result => {//当前身份 大宗
            if (result.roleStatus == -2 && result.status == 0) {//展示页面 普通商家
                Api.bussinessApplyInfo(applyInfoData => {
                    let applyInfoPayload = { balance: applyInfoData.balance, activeBalance: applyInfoData.activeBalance, token: applyInfoData.token }
                    this.setState({
                        listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[2].key, pageState: result.status, applyInfoData: applyInfoPayload }]
                    });
                })
            } else {//展示页面 信任大宗
                Api.bussinessUpgradeApplyInfo(applyInfoData => {
                    let applyInfoPayload = { balance: applyInfoData.balance, activeBalance: applyInfoData.trustStapleDeposit, token: applyInfoData.token }
                    this.setState({
                        listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[6].key, pageState: result.status, applyInfoData: applyInfoPayload }]
                    });
                });
            }
        });
    }

    _trustStaple = () => {
        Api.bussinessUpgradeApplyInfo(applyInfoData => {
            Api.userBusinessApply(result => {//当前身份 信任大宗
                if (result.roleStatus == -1 && result.status == 0) {//展示页面 大宗
                    let applyInfoPayload = { balance: applyInfoData.balance, activeBalance: applyInfoData.stapleDeposit, token: applyInfoData.token }
                    this.setState({
                        listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[4].key, pageState: result.status, applyInfoData: applyInfoPayload }]
                    });
                } else {//展示页面 信任大宗
                    this.setState({
                        listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[6].key, pageState: result.status, applyInfoData: applyInfoPayload }]
                    });
                }
            });
        })
    }

    _dataUpdate = () => {
        switch (this.props.role.roleName) {//判断当前身份
            case Enum.ROLE.BUSINESS_ROLE[0].key:
            case Enum.ROLE.BUSINESS_ROLE[1].key:
                this.setState({
                    listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[2].key, pageState: 1, applyInfoData: DEFAULT_APPLY_INFO }]
                });
                Api.bussinessApplyInfo(applyInfoData => {
                    this._updatePageState(Enum.ROLE.BUSINESS_ROLE[2].key, applyInfoData);
                });
                break;
            case Enum.ROLE.BUSINESS_ROLE[2].key:
                this.setState({
                    listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[3].key, pageState: 1, applyInfoData: DEFAULT_APPLY_INFO }, { pageType: Enum.ROLE.BUSINESS_ROLE[4].key, pageState: 1, applyInfoData: DEFAULT_APPLY_INFO }]
                });
                Api.bussinessUpgradeApplyInfo(applyInfoData => {
                    this._updateUpgradePagesState(applyInfoData);
                })
                break;
            case Enum.ROLE.BUSINESS_ROLE[3].key:
                this.setState({
                    listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[3].key, pageState: 1, applyInfoData: DEFAULT_APPLY_INFO }]
                });
                /*
                Api.bussinessUpgradeApplyInfo(applyInfoData => {
                    let applyInfoPayload = { balance: applyInfoData.balance, activeBalance: applyInfoData.trustDeposit, token: applyInfoData.token }
                    this._updateFinalPageState(Enum.ROLE.BUSINESS_ROLE[3].key, applyInfoPayload);
                })
                */
                this._trust();
                break;
            case Enum.ROLE.BUSINESS_ROLE[4].key:
                if (this.props.role.trustStaple) {//信任大宗(信任大宗的枚举值后台并不存在，是app自定义的)
                    this.setState({
                        listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[6].key, pageState: 1, applyInfoData: DEFAULT_APPLY_INFO }]
                    });
                    /*
                    Api.bussinessUpgradeApplyInfo(applyInfoData => {
                        let applyInfoPayload = { balance: applyInfoData.balance, activeBalance: applyInfoData.trustStapleDeposit, token: applyInfoData.token }
                        this._updateFinalPageState(Enum.ROLE.BUSINESS_ROLE[6].key, applyInfoPayload);
                    })
                    */
                    this._trustStaple();
                } else {//普通大宗
                    this.setState({
                        listData: [{ pageType: Enum.ROLE.BUSINESS_ROLE[6].key, pageState: 1, applyInfoData: DEFAULT_APPLY_INFO }]
                    });
                    /*
                    Api.bussinessUpgradeApplyInfo(applyInfoData => {
                        let applyInfoPayload = { balance: applyInfoData.balance, activeBalance: applyInfoData.trustStapleDeposit, token: applyInfoData.token }
                        this._updateStaplePageState(Enum.ROLE.BUSINESS_ROLE[6].key, applyInfoPayload);
                    })
                    */
                    this._staple();
                }
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        this._dataUpdate();
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <View style={{ backgroundColor: 'white' }}>
                        <Header.Normal
                            title='商家认证'
                            goback={() => this.props.navigation.goBack()}
                            rightBtnTitle='退还激活金'
                            rightBtnPress={this.drawbackActiveBalance}
                        />
                    </View>
                    <View style={styles.flatListWrapper}>
                        <FlatList
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={this.state.listData}
                            renderItem={({ item, index }) => <Banner {...item} index={index} dataLength={this.state.listData.length} btnPress={this.callback} />}
                        />
                    </View>
                    {isBottomTabShow(this.props.role.roleName, this.props.role.trustStaple) &&
                        <BottomTab
                            role={this.props.role}
                            navi={this.props.navigation}
                        />
                    }
                </View>
            </SafeAreaView>
        );
    }

    drawbackActiveBalance = () => {
        Api.activeBalanceInfo(info => {
            if (info.orderAmount >= info.backNeedAmount) {
                Api.drawBackActiveBalance((res, code, msg) => {
                    let message = msg ? msg : '退款成功';
                    Toast.show(message);
                }, (res, code, msg) => {
                    let message = msg ? msg : '退款失败';
                    Toast.show(message);
                })
            } else {
                Toast.show(`尚未具有退还资质,当前进度 ${info.orderAmount}/${info.backNeedAmount}`)
            }
        })
    }

    callback = (pageType, pageState, applyInfoData) => {
        if (pageState == 0) {
            Toast.show('正在审核中请您耐心等待!');
            return;
        } else {
            let payload = { deposit: applyInfoData.activeBalance, token: applyInfoData.token };
            switch (pageType) {
                case Enum.ROLE.BUSINESS_ROLE[2].key:
                    if (applyInfoData.activeBalance > applyInfoData.balance) {
                        Toast.show('账号余额不足');
                        return;
                    }
                    Api.dealerApply(payload, (result) => {
                        Toast.show('提交成功，请等待审核');
                        this.props.navigation.goBack();
                        // to do刷新数据
                    }, (result, code, message) => {
                        let msg = message ? message : '提交失败';
                        Toast.show(msg);
                    });
                    break;
                case Enum.ROLE.BUSINESS_ROLE[3].key:
                    if (this.props.role.roleName == Enum.ROLE.BUSINESS_ROLE[3].key) {
                        //降级
                        Api.downGrade((result, code, message) => {
                            Toast.show('提交成功,请等待审核');
                            this.props.navigation.goBack();
                        }, (result, code, message) => {
                            let msg = message ? message : '提交失败';
                            Toast.show(msg);
                        });
                    } else {
                        if (applyInfoData.activeBalance > applyInfoData.balance) {
                            Toast.show('账号余额不足');
                            return;
                        }
                        Api.trustApply(payload, (result) => {
                            Toast.show('提交成功，请等待审核');
                            this.props.navigation.goBack();
                            // to do刷新数据
                        }, (result, code, message) => {
                            let msg = message ? message : '提交失败';
                            Toast.show(msg);
                        });
                    }
                    break;
                case Enum.ROLE.BUSINESS_ROLE[4].key:
                    if (this.props.role.roleName == Enum.ROLE.BUSINESS_ROLE[4].key) {
                        //大宗商家的退款通过bottom tab
                    } else {
                        if (applyInfoData.activeBalance > applyInfoData.balance) {
                            Toast.show('账号余额不足');
                            return;
                        }
                        Api.stapleApply(payload, (result) => {
                            Toast.show('提交成功,请等待审核');
                            this.props.navigation.goBack();
                            // to do刷新数据
                        }, (result, code, message) => {
                            let msg = message ? message : '提交失败';
                            Toast.show(msg);
                        });
                    }
                    break;
                case Enum.ROLE.BUSINESS_ROLE[6].key:
                    if (this.props.role.trustStaple) {//是信任大宗 降级
                        Api.downGrade((result, code, message) => {
                            Toast.show('提交成功,请等待审核');
                            this.props.navigation.goBack();
                        }, (result, code, message) => {
                            let msg = message ? message : '提交失败';
                            Toast.show(msg);
                        });
                    } else {
                        if (applyInfoData.activeBalance > applyInfoData.balance) {
                            Toast.show('账号余额不足');
                            return;
                        }
                        payload.deposit = 5000;
                        Api.trustStapleApply(payload, (result) => {
                            Toast.show('提交成功,请等待审核');
                            this.props.navigation.goBack();
                            // to do刷新数据
                        }, (result, code, message) => {
                            let msg = message ? message : '提交失败';
                            Toast.show(msg);
                        });
                    }
                    break;
            }
        }
    }

    _downGrade = () => {
        Api.downGrade((result) => {
            Toast.show('资金解冻申请已提交');
        }, () => { })
    }

}

const mapStateToProps = (state) => ({
    role: state.user.role
})

export default connect(mapStateToProps)(MerchantCertification);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
    btn: {
        width: Dimensions.get('window').width - 30,
        height: 40,
        backgroundColor: '#4266D2',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    btnText: {
        color: 'white',
        fontSize: 15
    },
    banner: {
        alignSelf: 'center',
        marginTop: 15
    },
    flatListWrapper: {
        width: Dimensions.get('window').width,//-12
        height: (Dimensions.get('window').width - 30) / 690 * 328 + 250 + 15,
        //marginLeft: 12,
        marginTop: 10
    }
});