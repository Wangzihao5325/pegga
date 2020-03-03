import React, { Component } from 'react';
import { SafeAreaView, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import Colors from '../../../../global/Colors';
import Api from '../../../../socket';
import Toast from '../../../../component/toast';
import store from '../../../../store';
import { storage_update } from '../../../../store/actions/storageAction';
import Header from '../../../../component/header';
import Input from '../../../../component/input';
import Btn from '../../../../component/btn';
import I18n from '../../../../global/doc/i18n';

const Reg = { mode: '', account: '', countryCode: '', verCode: '', pwd: '', pwdConfirm: '', inviteCode: '' }

class PwdInputView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: ''
    }

    componentDidMount() {
        const mode = this.props.navigation.getParam('mode', '');
        const account = this.props.navigation.getParam('account', '');
        const countryCode = this.props.navigation.getParam('countryCode', '');
        const verCode = this.props.navigation.getParam('verCode', '');
        const type = this.props.navigation.getParam('type', '');
        Reg.mode = mode;
        Reg.account = account;
        Reg.countryCode = countryCode;
        Reg.verCode = verCode;
        this.setState({
            type
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer} >
                <Header.Normal goback={() => this.props.navigation.goBack()} />
                <Text style={styles.titleText}>{`${I18n.SET_LOGIN_PWD}`}</Text>
                <Input.Account
                    style={{ marginTop: 25, fontSize: 16 }}
                    callback={this.pwdInputCallback}
                    placeholder={I18n.SET_PWD}
                    security={true}
                />
                <Text style={styles.rule}>{`${I18n.PWD_RULE}`}</Text>
                <Input.Account
                    style={{ marginTop: 25, fontSize: 16 }}
                    callback={this.pwdConfirmInputCallback}
                    placeholder={I18n.CONFIRM_PWD}
                    security={true}
                />
                {this.state.type == 'register' &&
                    <Input.Account
                        style={{ marginTop: 25, fontSize: 16 }}
                        callback={this.inviteCodeInputCallback}
                        placeholder={I18n.INVITE_CODE}
                    />
                }
                <Btn.Linear
                    style={styles.nextStepBtn}
                    textStyle={styles.nextStepBtnText}
                    btnPress={this.register}
                    title={I18n.NEXT}
                />
            </SafeAreaView>
        );
    }

    pwdInputCallback = (value) => {
        Reg.pwd = value
    }

    pwdConfirmInputCallback = (value) => {
        Reg.pwdConfirm = value;
    }

    inviteCodeInputCallback = (value) => {
        Reg.inviteCode = value;
    }

    register = () => {
        if (Reg.pwd !== Reg.pwdConfirm) {
            Toast.show(I18n.PWD_INCONSISTENT);
            return;
        }
        let regExp1 = /[0-9]/;
        let regExp2 = /[a-z]/;
        let regExp3 = /[A-Z]/;
        if (Reg.pwd.length < 6 || Reg.pwd.length > 20) {
            Toast.show('密码长度不合规范');
            return;
        }
        if (!regExp1.test(Reg.pwd)) {
            Toast.show('请至少包含一个数字');
            return;
        }
        if (!regExp2.test(Reg.pwd)) {
            Toast.show('请至少包含一个小写字母');
            return;
        }
        if (!regExp3.test(Reg.pwd)) {
            Toast.show('请至少包含一个大写字母');
            return;
        }
        if (this.state.type == 'register') {
            if (Reg.mode == 'phone') {
                let payload = {
                    confirmPassword: Reg.pwdConfirm,
                    areaCode: parseInt(this.props.code),
                    password: Reg.pwd,
                    phone: Reg.account,
                    verifyCode: Reg.verCode
                }
                if (Reg.inviteCode) {
                    payload.inviteCode = Reg.inviteCode;
                }
                Api.registerByPhone(payload, (e) => {
                    Toast.show(I18n.REGISTER_SUCCESS);
                    store.dispatch(storage_update({ login_account_input: Reg.account, login_pwd_input: Reg.pwd }));
                    this.props.navigation.popToTop();
                });
            } else {
                let payload = {
                    confirmPassword: Reg.pwdConfirm,
                    password: Reg.pwd,
                    email: Reg.account,
                    emailOtp: Reg.verCode
                }
                if (Reg.inviteCode) {
                    payload.inviteCode = Reg.inviteCode;
                }
                Api.registerByMail(payload, (e) => {
                    Toast.show(I18n.REGISTER_SUCCESS);
                    store.dispatch(storage_update({ login_account_input: Reg.account, login_pwd_input: Reg.pwd }));
                    this.props.navigation.popToTop();
                });
            }
        } else if (this.state.type == 'reset') {
            let payload = {
                confirmPassword: Reg.pwdConfirm,
                newPassword: Reg.pwd,
                verifyCode: Reg.verCode,
                phone: Reg.account
            }
            Api.resetPassword(payload, (e) => {
                Toast.show(I18n.RESET_PWD_SUCCESS);
                store.dispatch(storage_update({ login_account_input: Reg.account, login_pwd_input: Reg.pwd }));
                this.props.navigation.popToTop();
            });

        }
    }
}

const mapStateToProps = (state) => ({
    code: state.country.code
})

export default connect(mapStateToProps)(PwdInputView);

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
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    rule: {
        fontSize: 13,
        color: 'rgb(222,44,48)',
        fontFamily: 'PingFang-SC-Regular',
        marginHorizontal: 20,
        marginTop: 15
    },
    nextStepBtn: {
        height: 50,
        width: Dimensions.get('window').width - 40,
        borderRadius: 5,
        marginTop: 66,
    },
    nextStepBtnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15
    },
});