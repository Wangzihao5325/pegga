import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Api from '../../../../../socket';
import Colors from '../../../../../global/Colors';
import Header from '../../../../../component/header';
import VerCodeInput from '../../../../../component/input/VerCodeInput';
import Tips from './Tip4SendMsg';
import Toast from '../../../../../component/toast';
import I18n from '../../../../../global/doc/i18n';


class VerCodeInputView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    constructor(props) {
        super(props);
        this.timer = null;
    }

    state = {
        countryCode: '',
        account: '',
        mode: '',
        key: '',
        readyForSend: true
    }

    componentDidMount() {
        const account = this.props.navigation.getParam('account', '');
        const mode = this.props.navigation.getParam('mode', '');
        const key = this.props.navigation.getParam('key', '');
        this.setState({
            countryCode: mode == 'phone' ? this.props.code : '',
            account,
            mode,
            key
        });
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer} >
                <Header.Normal goback={() => this.props.navigation.goBack()} />
                <Text style={styles.titleText}>{I18n.INPUT_VER_CODE}</Text>
                <Text style={styles.sendAddressText}>{`${I18n.VER_CODE_SEND_TO}${this.state.countryCode} ${this.state.account}`}</Text>
                <VerCodeInput inputDone={this.verCodeInputDone} />
                <Tips style={styles.tips} pressCallback={this.sendMsg} />
            </SafeAreaView>
        );
    }

    _timerSetting = () => {
        this.setState({
            readyForSend: false
        });
        this.timer = setTimeout(() => {
            this.setState({
                readyForSend: true
            });
        }, 90000);
    }

    sendMsg = () => {
        if (!this.state.readyForSend) {
            Toast.show(I18n.SEND_VER_CODE_MANY_TIMES);
            return;
        }
        if (this.state.key == 'bindAccount') {
            if (this.state.mode == 'phone') {
                let areaCode = parseInt(this.props.code);
                Api.sendPhoneBindMsg(this.state.account, areaCode, (res) => {
                    Toast.show(I18n.RESEND_VER_CODE);
                    this._timerSetting();
                }, (res, code, msg) => {
                    let message = msg ? msg : I18n.SEND_MOBILE_MSG_FAILED;
                    Toast.show(message);
                })
            } else if (this.state.mode == 'mail') {
                Api.sendMailBindMsg(this.state.account, (res) => {
                    Toast.show(I18n.RESEND_VER_CODE);
                    this._timerSetting();
                }, (res, code, msg) => {
                    let message = msg ? msg : I18n.SEND_MOBILE_MSG_FAILED;
                    Toast.show(message);
                })
            }
        } else if (this.state.key == 'assetsPwd') {
            //_todoList:更换资产密码的接口暂无
            /*
            Api.sendChangePwdMsg((res) => {
                Toast.show('已重新发送验证码');
                 this._timerSetting();
            }, (res, code, msg) => {
                let message = msg ? msg : '验证码发送失败';
                Toast.show(message);
            });
            */
        } else if (this.state.key == 'loginPwd') {
            Api.sendChangePwdMsg((res) => {
                Toast.show(I18n.RESEND_VER_CODE);
                this._timerSetting();
            }, (res, code, msg) => {
                let message = msg ? msg : I18n.SEND_MOBILE_MSG_FAILED;
                Toast.show(message);
            });
        }
    }

    verCodeInputDone = (verCode) => {
        if (this.state.key == 'bindAccount') {
            if (this.state.mode == 'phone') {
                let areaCode = parseInt(this.props.code);
                let payload = {
                    phone: this.state.account,
                    verifyCode: verCode,
                    areaCode
                }
                Api.bindPhone(payload, () => {
                    Toast.show(I18n.BIND_SUCCESS);
                    this.props.navigation.pop(2);
                }, (result, code, message) => {
                    let msg = message ? message : I18n.BIND_FAILED;
                    Toast.show(msg);
                });
            } else if (this.state.mode == 'mail') {
                let payload = {
                    email: this.state.account,
                    emailCode: verCode
                }
                Api.bindMail(payload, () => {
                    Toast.show(I18n.BIND_SUCCESS);
                    this.props.navigation.pop(2);
                }, (result, code, message) => {
                    let msg = message ? message : I18n.BIND_FAILED;
                    Toast.show(msg);
                });
            }
        } else if (this.state.key == 'assetsPwd' || this.state.key == 'loginPwd') {
            this.props.navigation.navigate('AssetsPwdFinally', { verCode, key: this.state.key });
        }

        // let { mode, account, countryCode } = this.state;
        // this.props.navigation.navigate('PwdInputView', { mode, account, countryCode, verCode });
    }

}

function mapState2Props(store) {
    return {
        code: store.country.code
    }
}

export default connect(mapState2Props)(VerCodeInputView);

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
    sendAddressText: {
        marginTop: 25,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(40,46,60)',
        fontSize: 15,
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    tips: {
        alignSelf: 'flex-start'
    }
});