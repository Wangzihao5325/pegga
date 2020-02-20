import React, { Component } from 'react';
import {
    View,
    Platform,
    StatusBar,
    Image,
    Dimensions,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import Header from './Header';
import Item from './Item';
import Value2Str from '../../global/util/MapValue2Str';
import Toast from '../../component/toast';
import { update_user_info } from '../../store/actions/userAction';
import I18n from '../../global/doc/i18n';
import Enum from '../../global/Enum';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Api from '../../socket/index';

class Mine extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        messageNum: 0,
        isRedPt: false
    }

    naviWillFocus = () => {
        if (Platform.OS == 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent');
            StatusBar.setBarStyle('dark-content');
        }
    }

    naviDidFocus = () => {
        update_user_info();
        Api.noticeUnread(result => {
            let isRedPt = false;
            if (result > 0) {
                isRedPt = true;
            }
            this.setState({
                isRedPt,
                messageNum: result
            });
        })
    }

    naviWillBlur = () => {
        if (Platform.OS == 'android') {
            StatusBar.setTranslucent(false);
            StatusBar.setBackgroundColor('white');
            StatusBar.setBarStyle('dark-content');
        }
    }

    render() {
        const { kycAuditStatus, kycLevel } = this.props.kyc;
        let kycStatusText = Value2Str.kycStatusText(kycAuditStatus, kycLevel);
        return (
            <View style={styles.unsafeArea}>
                <NavigationEvents
                    onWillFocus={this.naviWillFocus}
                    onDidFocus={this.naviDidFocus}
                    onWillBlur={this.naviWillBlur}
                />
                <Header
                    toNews={() => this.navigate('News')}
                    toService={() => this.navigate('IMChat')}
                    toInfo={() => this.navigate('Info')}
                    isRedPt={this.state.isRedPt}
                />
                <View style={styles.invite}>
                    <TouchableHighlight underlayColor='transparent' onPress={() => this.navigate('Invite')} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Image style={{ height: 68, width: Dimensions.get('window').width - 20, borderTopLeftRadius: 5, borderTopRightRadius: 5 }} source={require('../../image/mine/invite/invite_banner.png')} />
                    </TouchableHighlight>
                </View>
                <KeyboardAwareScrollView>
                    <View>
                        <Item
                            bottomLine
                            title={I18n.SAFETY_CENTER}
                            avater={require('../../image/mine/security_center.png')}
                            btnPress={() => this.navigate('SecurityCenter')}
                        />
                        <Item
                            bottomLine
                            title={I18n.IDENTITY_AUTH}
                            stateText={kycStatusText}
                            avater={require('../../image/mine/identity.png')}
                            btnPress={this.goToIdentity}
                        />
                        <Item
                            bottomLine
                            title={I18n.PAYMENT_MANAGEMENT}
                            stateText={this.props.paymentApplyBack ? '被驳回' : ''}
                            avater={require('../../image/mine/pay_manage.png')}
                            btnPress={() => this.navigate('PayManager')}
                        />
                        <Item
                            bottomLine
                            title={I18n.INVITE_LIST}
                            avater={require('../../image/mine/Invitation_list.png')}
                            btnPress={() => this.navigate('InviteList')}
                        />
                        <Item
                            title={I18n.CUSTOM_CHAT}
                            avater={require('../../image/mine/custom_chat.png')}
                            btnPress={() => this.navigate('IMChat')}
                        />
                        <Item
                            margin
                            title={I18n.MERCHANT_CERTIFICATION}
                            stateText={this.props.roleApplyBack ? '被驳回' : ''}
                            avater={require('../../image/mine/businssCer.png')}
                            btnPress={this.goToBusinessRole}
                        />

                        {/* <Item
                    margin
                    bottomLine
                    title={I18n.HELP_CENTER}
                    avater={require('../../image/mine/help.png')}
                    btnPress={() => this.navigate('HelpCenter')}
                /> */}
                        <Item
                            margin
                            bottomLine
                            title={I18n.ABOUT_US}
                            avater={require('../../image/mine/about.png')}
                            btnPress={() => this.navigate('AboutUs')}
                        />

                        <Item
                            margin
                            title={I18n.SETTINGS}
                            avater={require('../../image/mine/setting.png')}
                            btnPress={() => this.navigate('Setting')}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }

    goToIdentity = () => {
        const { kycAuditStatus, kycLevel } = this.props.kyc;
        if (kycAuditStatus == 0) {//审核中
            Toast.show(I18n.IN_REVIEW_BE_PATIENT);
        } else if (kycAuditStatus == 1) {
            if (kycLevel == 0) {
                this.navigate('Identity');
            } else {
                Toast.show(I18n.HAVE_BEEN_AUTHER);
            }
        } else {
            this.navigate('Identity');
        }
    }

    goToBusinessRole = () => {
        if (this.props.role.roleName == Enum.ROLE.BUSINESS_ROLE[5].key) {//至尊
            Toast.show(I18n.YOU_HAVE_BEEN_SUPREMACY);
            return;
        }
        this.navigate('MerchantCertification');
    }

    navigate = (view) => {
        this.props.navigation.navigate(view);
    }

    test = () => {
        //   console.log('123');
    }
}

function mapState2Props(store) {
    return {
        kyc: store.user.state.kyc,
        role: store.user.role,
        roleApplyBack: store.user.state.roleApplyBack,
        paymentApplyBack: store.user.state.paymentApplyBack,
    }
}

export default connect(mapState2Props)(Mine);

const styles = StyleSheet.create({
    unsafeArea: {
        flex: 1,
        backgroundColor: '#F3F5F9'
    },
    invite: {
        height: 75,
        width: Dimensions.get('window').width,
        backgroundColor: '#F3F5F9'
    }
});