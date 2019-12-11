import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Api from '../../../socket';
import Header from '../../../component/header';
import Item from '../Item';
import Toast from '../../../component/toast';
import I18n from '../../../global/doc/i18n';

class SecurityCenter extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        let isShowBindPhone = this.props.info.bindPhone ? false : true;
        let isShowBindEmail = this.props.info.bindEmail ? false : true;
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title={I18n.SAFETY_CENTER}
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <Item
                        margin
                        title={I18n.LOGIN_PWD}
                        btnPress={() => this.pwd('loginPwd')}
                    />
                    <Item
                        margin
                        bottomLine
                        title={I18n.SET_FUND_PWD}
                        btnPress={() => this.pwd('assetsPwd')}
                    />
                    <Item
                        title={I18n.SET_GOOGLE_PWD}
                        btnPress={() => this.navigate('SecurityCenter')}
                    />
                    {isShowBindPhone &&
                        <Item
                            margin
                            bottomLine={isShowBindEmail}
                            title={I18n.BIND_MOBILE_ACCOUNT}
                            btnPress={() => this.bindAccount('phone')}
                        />
                    }
                    {isShowBindEmail &&
                        <Item
                            margin={!isShowBindPhone}
                            title={I18n.BIND_MAIL_ACCOUNT}
                            btnPress={() => this.bindAccount('mail')}
                        />
                    }
                </View>
            </SafeAreaView>
        );
    }

    pwd = (key) => {
        const { isSmsVerified } = this.props.state;
        if (!isSmsVerified) {
            Toast.show(I18n.BIND_PHONE_ACCOUNT_FIRST);
            return;
        }
        const { bindPhone } = this.props.info;
        if (key == 'loginPwd') {
            Api.sendChangePwdMsg((res) => {
                this.props.navigation.navigate('BindStepTwo', { account: bindPhone, mode: 'phone', key });
            }, (res, code, msg) => {
                let message = msg ? msg : I18n.SEND_MOBILE_MSG_FAILED;
                Toast.show(message);
            });
        } else if (key == 'assetsPwd') {
            Api.sendChangeAssetsPwdMsg((res) => {
                this.props.navigation.navigate('BindStepTwo', { account: bindPhone, mode: 'phone', key });
            }, (res, code, msg) => {
                let message = msg ? msg : I18n.SEND_MOBILE_MSG_FAILED;
                Toast.show(message);
            });
        }
    }

    bindAccount = (type) => {
        const { isEmailVerified, isSmsVerified } = this.props.state;
        if (type == 'phone' && isSmsVerified) {
            Toast.show(I18n.HAVE_BEENN_BIND_MOBILE);
            return;
        } else if (type == 'mail' && isEmailVerified) {
            Toast.show(I18n.HAVE_BEENN_BIND_MAIL);
            return;
        }
        this.props.navigation.navigate('BindStepOne', { type });
    }

    navigate = (e) => {
        // console.log(e);
    }
}

function mapState2Props(store) {
    return {
        state: store.user.state,
        info: store.user.info
    }
}

export default connect(mapState2Props)(SecurityCenter);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    }
});