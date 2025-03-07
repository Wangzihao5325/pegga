import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux'
import Colors from '../../../../../global/Colors';
import Api from '../../../../../socket/index';

import Header from '../../../../../component/header';
import CountrySelect from './CountrySelect';
import Input from '../../../../../component/input';
import Btn from '../../../../../component/btn';
import I18n from '../../../../../global/doc/i18n';

const LOGIN_TYPE = { phone: 'phone', mail: 'mail' };
const InputReg = { account: '', password: '' };

class StepOne extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        mode: LOGIN_TYPE.phone,
        accountPlaceholder: I18n.PHONE_NUM,
        headerTitle: '',
        key: ''
    }

    componentDidMount() {
        const bindType = this.props.navigation.getParam('type', 'phone');
        const bindKey = this.props.navigation.getParam('key', 'bindAccount');
        this.setState((preState) => {
            switch (bindType) {
                case 'phone':
                    if (bindKey == 'bindAccount') {
                        return {
                            mode: LOGIN_TYPE.phone,
                            accountPlaceholder: I18n.PHONE_NUM,
                            headerTitle: I18n.BIND_MOBILE_ACCOUNT,
                            key: bindKey
                        }
                    } else if (bindKey == 'assetsPwd') {//_todoList:暂时废弃,待重构
                        return {
                            mode: LOGIN_TYPE.phone,
                            accountPlaceholder: I18n.PHONE_NUM,
                            headerTitle: I18n.SET_FUND_PWD,
                            key: bindKey
                        }
                    } else if (bindKey == 'loginPwd') {//_todoList:暂时废弃,待重构
                        return {
                            mode: LOGIN_TYPE.phone,
                            accountPlaceholder: I18n.PHONE_NUM,
                            headerTitle: I18n.SET_LOGIN_PWD,
                            key: bindKey
                        }
                    }
                case 'mail':
                    return {
                        mode: LOGIN_TYPE.mail,
                        accountPlaceholder: I18n.MAIL_ACCOUNT,
                        headerTitle: I18n.BIND_MAIL_ACCOUNT,
                        key: bindKey
                    }
                default:
                    return null;
            }
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal goback={() => this.props.navigation.goBack()} />
                <Text style={styles.titleText}>{`${this.state.headerTitle}`}</Text>
                <CountrySelect isShow={this.state.mode === LOGIN_TYPE.phone} callback={this.selectCountry} />
                <Input.Account
                    style={{ marginTop: 25, fontSize: 16 }}
                    callback={this.accountInputCallback}
                    placeholder={`${I18n.PLEASE_INPUT}${this.state.accountPlaceholder}`}
                />
                <Btn.Linear style={styles.loginBtn} textStyle={styles.loginBtnText} btnPress={this.sendMessage} title={I18n.SEND_MSG} />
            </SafeAreaView>
        );
    }

    selectCountry = () => {
        this.props.navigation.navigate('Country_Code_Login');
    }

    accountInputCallback = (value) => {
        InputReg.account = value;
    }

    sendMessage = () => {
        //to do 发送验证码 跳转页面
        if (this.state.mode == LOGIN_TYPE.mail) {
            Api.sendMailBindMsg(InputReg.account, (res) => {
                this.props.navigation.navigate('BindStepTwo', { account: InputReg.account, mode: this.state.mode, key: this.state.key });
            });
        } else {
            if (this.state.key == 'bindAccount') {
                let areaCode = parseInt(this.props.code);
                Api.sendPhoneBindMsg(InputReg.account, areaCode, (res) => {
                    this.props.navigation.navigate('BindStepTwo', { account: InputReg.account, mode: this.state.mode, key: this.state.key });
                });
            }
        }
    }

}

const mapStateToProps = (state) => ({
    code: state.country.code
})

export default connect(mapStateToProps)(StepOne);

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
    loginBtn: {
        height: 50,
        width: Dimensions.get('window').width - 40,
        borderRadius: 5,
        marginTop: 66,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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