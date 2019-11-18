import React, { Component } from 'react';
import { SafeAreaView, Text, Dimensions, StyleSheet } from 'react-native';
import Colors from '../../../../global/Colors';
import Api from '../../../../socket';
import Toast from '../../../../component/toast';

import Header from '../../../../component/header';
import Input from '../../../../component/input';
import Btn from '../../../../component/btn';

const Reg = { mode: '', account: '', countryCode: '', verCode: '', pwd: '', pwdConfirm: '', inviteCode: '' }

export default class PwdInputView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    componentDidMount() {
        const mode = this.props.navigation.getParam('mode', '');
        const account = this.props.navigation.getParam('account', '');
        const countryCode = this.props.navigation.getParam('countryCode', '');
        const verCode = this.props.navigation.getParam('verCode', '');
        Reg.mode = mode;
        Reg.account = account;
        Reg.countryCode = countryCode;
        Reg.verCode = verCode;
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer} >
                <Header.Normal goback={() => this.props.navigation.goBack()} />
                <Text style={styles.titleText}>设置登陆密码</Text>
                <Input.Account
                    style={{ marginTop: 25, fontSize: 16 }}
                    callback={this.pwdInputCallback}
                    placeholder='设置密码'
                    security={true}
                />
                <Text style={styles.rule}>6-20个字符(字母,数字和符号的组合),字母必须同时包含大写和小写字母</Text>
                <Input.Account
                    style={{ marginTop: 25, fontSize: 16 }}
                    callback={this.pwdConfirmInputCallback}
                    placeholder='确认密码'
                    security={true}
                />
                <Input.Account
                    style={{ marginTop: 25, fontSize: 16 }}
                    callback={this.inviteCodeInputCallback}
                    placeholder='输入邀请码(选填)'
                />
                <Btn.Linear
                    style={styles.nextStepBtn}
                    textStyle={styles.nextStepBtnText}
                    btnPress={this.register}
                    title='下一步'
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
            Toast.show('密码不一致，请输入相同的密码!');
            return;
        }
        if (Reg.mode == 'phone') {
            let payload = {
                confirmPassword: Reg.pwdConfirm,
                country: Reg.countryCode,
                password: Reg.pwd,
                phone: Reg.account,
                verifyCode: Reg.verCode
            }
            if (Reg.inviteCode) {
                payload.inviteCode = Reg.inviteCode;
            }
            Api.registerByPhone(payload, (e) => {
                Toast.show('注册成功,请登陆');
                this.props.navigation.popToTop();
            }, (e, code, message) => {
                Toast.show(message ? `注册失败:${message}` : '注册失败');
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
                Toast.show('注册成功,请登陆');
                this.props.navigation.popToTop();
            }, (e, code, message) => {
                Toast.show(message ? `注册失败:${message}` : '注册失败');
            });
        }
    }
}

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