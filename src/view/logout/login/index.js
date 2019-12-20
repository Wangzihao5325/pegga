import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Dimensions,
    StatusBar,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../../global/doc/i18n';

import Colors from '../../../global/Colors';
import Api from '../../../socket/index';
import store from '../../../store';
import { user_login, user_info, update_payment_info } from '../../../store/actions/userAction';
import { storage_update } from '../../../store/actions/storageAction';
import CountrySelect from './CountrySelect';
import Tips from './Tip4Register';
import Input from '../../../component/input';
import Btn from '../../../component/btn';
import Toast from '../../../component/toast';
import Variables from '../../../global/Variables';


const LOGIN_TYPE = { phone: 'phone', mail: 'mail' };

class Login extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        mode: LOGIN_TYPE.phone,
        accountPlaceholder: I18n.PHONE_NUM,
        modeChangePlaceholder: I18n.EMAIL,
        isLoging: false
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <StatusBar backgroundColor='white' barStyle='dark-content' hidden={false} />
                <Text style={styles.titleText}>{I18n.LOGIN}</Text>
                <CountrySelect isShow={this.state.mode === LOGIN_TYPE.phone} callback={this.selectCountry} />
                <Input.Account
                    style={{ marginTop: 25, fontSize: 16, height: 46 }}
                    callback={this.accountInputCallback}
                    placeholder={`${I18n.PLEASE_INPUT}${this.state.accountPlaceholder}`}
                    value={this.props.accountInput}
                    isControl
                />
                <Input.Password
                    style={{ marginTop: 25, height: 46 }}
                    inputStyle={{ fontSize: 16 }}
                    callback={this.passwordInputCallback}
                    placeholder={`${I18n.PLEASE_INPUT}${I18n.PASSWORD}`}
                    value={this.props.pwdInput}
                    isControl
                />
                <View style={styles.naviBtnWrapper} >
                    <Btn.Normal
                        style={[styles.naviBtn, { marginLeft: 20 }]}
                        textStyle={styles.naviBtnText}
                        underlayColor='transparent'
                        title={`${I18n.CHANGE_TO}${this.state.modeChangePlaceholder}`}
                        btnPress={this.loginModeChange}
                    />
                    <Btn.Normal
                        style={[styles.naviBtn, { marginRight: 20 }]}
                        textStyle={styles.naviBtnText}
                        underlayColor='transparent'
                        title={I18n.FORGOT_PWD}
                        btnPress={this.naviToResetPassword}
                    />
                </View>
                <Btn.Linear
                    style={styles.loginBtn}
                    textStyle={styles.loginBtnText}
                    btnPress={this.login}
                    title={I18n.LOGIN}
                />
                <Tips pressCallback={this.naviToRegister} />
            </SafeAreaView>
        );
    }

    selectCountry = () => {
        this.props.navigation.navigate('Country_Code');
    }

    accountInputCallback = (value) => {
        store.dispatch(storage_update({ login_account_input: value }));
    }

    passwordInputCallback = (value) => {
        store.dispatch(storage_update({ login_pwd_input: value }));
    }

    login = () => {
        if (this.state.isLoging) {
            Toast.show(I18n.CLICK_TOO_FAST);
            return;
        }
        this.setState({
            isLoging: true
        });
        Api.login(this.props.accountInput, this.props.pwdInput, (result, code, message) => {
            store.dispatch(user_login());
            update_payment_info();
            Api.userInfo((result) => {
                this.setState({
                    isLoging: false
                });
                store.dispatch(user_info(result));
                this.props.navigation.navigate('App');
            }, () => {
                this.setState({
                    isLoging: false
                });
                Variables.account.token = '';
                AsyncStorage.setItem('App_token', '');
            });
        }, () => {
            this.setState({
                isLoging: false
            });
            Variables.account.token = '';
            AsyncStorage.setItem('App_token', '');
        });
    }

    naviToRegister = () => {
        this.props.navigation.navigate('RegisterView');
    }

    naviToResetPassword = () => {
        this.props.navigation.navigate('RegisterView', { type: 'reset' });
    }

    loginModeChange = () => {
        this.setState((preState) => {
            switch (preState.mode) {
                case LOGIN_TYPE.phone:
                    return {
                        mode: LOGIN_TYPE.mail,
                        accountPlaceholder: I18n.MAIL_ACCOUNT,
                        modeChangePlaceholder: I18n.PHONE
                    }
                case LOGIN_TYPE.mail:
                    return {
                        mode: LOGIN_TYPE.phone,
                        accountPlaceholder: I18n.PHONE_NUM,
                        modeChangePlaceholder: I18n.EMAIL
                    }
                default:
                    return null;
            }
        });
    }
}

const mapStateToProps = (state) => ({
    accountInput: state.storage.login_account_input,
    pwdInput: state.storage.login_pwd_input
})

export default connect(mapStateToProps)(Login);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.MAIN_BG_COLOR,
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(40,46,60)',
        fontSize: 31,
        fontWeight: 'bold',
        marginTop: 44,
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    loginBtn: {
        height: 50,
        width: Dimensions.get('window').width - 40,
        borderRadius: 5,
        marginTop: 66,
    },
    loginBtnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15
    },
    naviBtnWrapper: {
        height: 30,
        width: Dimensions.get('window').width,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    naviBtn: {
        height: 30,
        width: 90,
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    naviBtnText: {
        color: 'rgb(64,99,213)',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 12,
        fontFamily: 'PingFang-SC-Regular'
    }
});