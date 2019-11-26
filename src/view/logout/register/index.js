import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import Api from '../../../socket';
import Colors from '../../../global/Colors';

import Header from '../../../component/header';
import CountrySelect from './CountrySelect';
import Tips from './Tip4Login';
import Input from '../../../component/input';
import Btn from '../../../component/btn';
import Toast from '../../../component/toast';

const FUNC_TYPE = { register: 'register', reset: 'reset' };
const LOGIN_TYPE = { phone: 'phone', mail: 'mail' };
const InputReg = { account: '', password: '' };

export default class Login extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        mode: LOGIN_TYPE.phone,
        accountPlaceholder: '手机号码',
        modeChangePlaceholder: '邮箱',
        type: FUNC_TYPE.register//register reset
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', FUNC_TYPE.register);
        this.setState({
            type
        });
    }

    render() {
        let title = '';
        switch (this.state.type) {
            case FUNC_TYPE.register:
                title = '欢迎注册';
                break;
            case FUNC_TYPE.reset:
                title = '重置密码';
                break;
            default:
                break;
        }
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal goback={() => this.props.navigation.goBack()} />
                <Text style={styles.titleText}>{`${title}`}</Text>
                <CountrySelect isShow={this.state.mode === LOGIN_TYPE.phone} callback={this.selectCountry} />
                <Input.Account
                    style={{ marginTop: 25, fontSize: 16 }}
                    callback={this.accountInputCallback}
                    placeholder={`请输入${this.state.accountPlaceholder}`}
                />
                <View style={styles.naviBtnWrapper} >
                    {this.state.type == FUNC_TYPE.register &&
                        <Btn.Normal
                            style={[styles.naviBtn, { marginLeft: 20 }]}
                            textStyle={styles.naviBtnText}
                            underlayColor='transparent'
                            title={`切换到${this.state.modeChangePlaceholder}注册`}
                            btnPress={this.loginModeChange}
                        />
                    }
                </View>
                <Btn.Linear
                    style={styles.registerBtn}
                    textStyle={styles.registerBtnText}
                    btnPress={this.sendMessage}
                    title='发送验证码'
                />
                <Tips pressCallback={() => this.props.navigation.goBack()} />
            </SafeAreaView>
        );
    }

    selectCountry = () => {
        this.props.navigation.navigate('Country_Code');
    }

    accountInputCallback = (value) => {
        InputReg.account = value;
    }

    sendMessage = () => {
        if (this.state.type == FUNC_TYPE.register) {
            if (this.state.mode == LOGIN_TYPE.phone) {
                Api.sendSignupMsg(InputReg.account, (res) => {
                    this.props.navigation.navigate('VerCodeInputView', { account: InputReg.account, mode: this.state.mode, type: this.state.type });
                }, (res, code, msg) => {
                    let message = msg ? msg : '发送验证码失败';
                    Toast.show(message);
                })
            } else {
                Api.sendMailSignupMsg(InputReg.account, (res) => {
                    this.props.navigation.navigate('VerCodeInputView', { account: InputReg.account, mode: this.state.mode, type: this.state.type });
                }, (res, code, msg) => {
                    let message = msg ? msg : '发送验证码失败';
                    Toast.show(message);
                })
            }
            this.props.navigation.navigate('VerCodeInputView', { account: InputReg.account, mode: this.state.mode, type: this.state.type });
        } else if (this.state.type == FUNC_TYPE.reset) {
            Api.sendForgotPwdMsg(InputReg.account, (res) => {
                this.props.navigation.navigate('VerCodeInputView', { account: InputReg.account, mode: this.state.mode, type: this.state.type });
            }, (res, code, msg) => {
                let message = msg ? msg : '发送验证码失败';
                Toast.show(message);
            })
        }
    }

    loginModeChange = () => {
        this.setState((preState) => {
            switch (preState.mode) {
                case LOGIN_TYPE.phone:
                    return {
                        mode: LOGIN_TYPE.mail,
                        accountPlaceholder: '邮箱账号',
                        modeChangePlaceholder: '手机'
                    }
                case LOGIN_TYPE.mail:
                    return {
                        mode: LOGIN_TYPE.phone,
                        accountPlaceholder: '手机号码',
                        modeChangePlaceholder: '邮箱'
                    }
                default:
                    return null;
            }
        });
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
    registerBtn: {
        height: 50,
        width: Dimensions.get('window').width - 40,
        borderRadius: 5,
        marginTop: 66,
    },
    registerBtnText: {
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