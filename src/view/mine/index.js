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


class Mine extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    naviWillFocus = () => {
        if (Platform.OS == 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent');
            StatusBar.setBarStyle('dark-content');
        }
    }

    naviDidFocus = () => {
        update_user_info();
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
                />
                <View style={styles.invite}>
                    <TouchableHighlight underlayColor='transparent' onPress={() => this.navigate('Invite')} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Image style={{ height: 68, width: Dimensions.get('window').width - 20, borderTopLeftRadius: 5, borderTopRightRadius: 5 }} source={require('../../image/mine/invite/invite_banner.png')} />
                    </TouchableHighlight>
                </View>
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
                    title={I18n.PAYMENT_MANAGEMENT}
                    avater={require('../../image/mine/pay_manage.png')}
                    btnPress={() => this.navigate('PayManager')}
                />

                <Item
                    margin
                    title={I18n.MERCHANT_CERTIFICATION}
                    avater={require('../../image/mine/businssCer.png')}
                    btnPress={this.goToBusinessRole}
                />

                <Item
                    margin
                    bottomLine
                    title={I18n.HELP_CENTER}
                    avater={require('../../image/mine/help.png')}
                    btnPress={() => this.navigate('HelpCenter')}
                />
                <Item
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