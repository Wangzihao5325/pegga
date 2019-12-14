import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux'
import Api from '../../../socket';
import Colors from '../../../global/Colors';
import I18n from '../../../global/doc/i18n';

import Header from '../../../component/header';
import CountrySelect from './CountrySelect';
import Tips from './Tip4Login';
import Input from '../../../component/input';
import Btn from '../../../component/btn';

const FUNC_TYPE = { register: 'register', reset: 'reset' };
const LOGIN_TYPE = { phone: 'phone', mail: 'mail' };
const InputReg = { account: '', password: '' };

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
                title = I18n.WELCOME_REGISTER;
                break;
            case FUNC_TYPE.reset:
                title = I18n.RESET_PWD;
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
                    style={{ marginTop: 25, fontSize: 16, height: 46 }}
                    callback={this.accountInputCallback}
                    placeholder={`${I18n.PLEASE_INPUT}${this.state.accountPlaceholder}`}
                />
                <View style={styles.naviBtnWrapper} >
                    {this.state.type == FUNC_TYPE.register &&
                        <Btn.Normal
                            style={[styles.naviBtn, { marginLeft: 20 }]}
                            textStyle={styles.naviBtnText}
                            underlayColor='transparent'
                            title={`${I18n.CHANGE_TO}${this.state.modeChangePlaceholder}`}
                            btnPress={this.loginModeChange}
                        />
                    }
                </View>
                <Btn.Linear
                    style={styles.registerBtn}
                    textStyle={styles.registerBtnText}
                    btnPress={this.sendMessage}
                    title={I18n.SEND_MESSAGE}
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
                let areaCode = parseInt(this.props.code);
                Api.sendSignupMsg(InputReg.account, areaCode, (res) => {
                    this.props.navigation.navigate('VerCodeInputView', { account: InputReg.account, mode: this.state.mode, type: this.state.type });
                })
            } else {
                Api.sendMailSignupMsg(InputReg.account, (res) => {
                    this.props.navigation.navigate('VerCodeInputView', { account: InputReg.account, mode: this.state.mode, type: this.state.type });
                })
            }
        } else if (this.state.type == FUNC_TYPE.reset) {
            let areaCode = parseInt(this.props.code);
            Api.sendForgotPwdMsg(InputReg.account, areaCode, (res) => {
                this.props.navigation.navigate('VerCodeInputView', { account: InputReg.account, mode: this.state.mode, type: this.state.type });
            })
        }
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
    code: state.country.code
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