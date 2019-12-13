import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../../../global/Colors';
import Api from '../../../../socket';
import Header from '../../../../component/header';
import VerCodeInput from '../../../../component/input/VerCodeInput';
import Tips from './Tip4SendMsg';
import Toast from '../../../../component/toast';


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
        type: '',
        readyForSend: true
    }

    componentDidMount() {
        const account = this.props.navigation.getParam('account', '');
        const mode = this.props.navigation.getParam('mode', '');
        const type = this.props.navigation.getParam('type', '');
        this.setState({
            countryCode: mode == 'phone' ? this.props.code : '',
            account,
            mode,
            type
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
                <Text style={styles.titleText}>输入验证码</Text>
                <Text style={styles.sendAddressText}>{`验证码已发送至${this.state.countryCode} ${this.state.account}`}</Text>
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
            Toast.show('发送二维码过于频繁，请稍后再尝试');
            return;
        }
        if (this.state.type == 'register') {
            if (this.state.mode == 'phone') {
                let areaCode = parseInt(this.props.code);
                Api.sendSignupMsg(this.state.account, areaCode, (res) => {
                    Toast.show('发送验证码成功');
                    this._timerSetting();
                })
            } else {
                Api.sendMailSignupMsg(this.state.account, (res) => {
                    Toast.show('发送验证码成功');
                    this._timerSetting();
                })
            }
        } else if (this.state.type == 'reset') {
            let areaCode = parseInt(this.props.code);
            Api.sendForgotPwdMsg(this.state.account, areaCode, (res) => {
                Toast.show('发送验证码成功');
                this._timerSetting();
            })
        }
    }

    verCodeInputDone = (verCode) => {
        let { mode, account, countryCode, type } = this.state;
        this.props.navigation.navigate('PwdInputView', { mode, account, countryCode, verCode, type });
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