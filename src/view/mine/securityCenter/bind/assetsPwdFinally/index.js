import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';

import Api from '../../../../../socket';
import Header from '../../../../../component/header';
import ItemInput from '../../../ItemInput';
import Btn from '../../../../../component/btn';
import Toast from '../../../../../component/toast';
import I18n from '../../../../../global/doc/i18n';

export default class AssetsPwdFinally extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        oldPwd: '',
        assetsPwd: '',
        confirmAssetsPwd: '',
        googlePwd: '',
        verCode: '',
        key: '',
        subTitle: ''
    }

    componentDidMount() {
        const verCode = this.props.navigation.getParam('verCode', '');
        const key = this.props.navigation.getParam('key', '');
        let subTitle = I18n.ASSETS;
        switch (key) {
            case 'loginPwd':
                subTitle = I18n.LOGIN;
                break;
            case 'assetsPwd':
                subTitle = I18n.ASSETS;
                break;
            default:
                break;
        }
        this.setState({
            verCode,
            key,
            subTitle
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title={`${this.state.subTitle}${I18n.PASSWORD}`}
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    {this.state.key == 'loginPwd' &&
                        <ItemInput
                            margin
                            bottomLine
                            isControl
                            secureTextEntry
                            title={I18n.OLD_PWD}
                            placeholder={`${I18n.PLEASE_INPUT}${I18n.OLD_PWD}`}
                            value={this.state.oldPwd}
                            callback={this.stateUpdate('oldPwd')}
                        />
                    }
                    <ItemInput
                        margin={this.state.key !== 'loginPwd'}
                        bottomLine
                        isControl
                        secureTextEntry
                        title={`${this.state.subTitle}${I18n.PASSWORD}`}
                        placeholder={`${I18n.PLEASE_INPUT}${this.state.subTitle}${I18n.PASSWORD}`}
                        value={this.state.assetsPwd}
                        callback={this.stateUpdate('assetsPwd')}
                    />
                    <ItemInput
                        isControl
                        secureTextEntry
                        title={`${this.state.subTitle}${I18n.PASSWORD}`}
                        placeholder={`${I18n.PLEASE_CONFIRM}${this.state.subTitle}${I18n.PASSWORD}`}
                        value={this.state.confirmAssetsPwd}
                        callback={this.stateUpdate('confirmAssetsPwd')}
                    />
                    <ItemInput
                        isControl
                        secureTextEntry
                        title={I18n.GOOGLE_PWD}
                        placeholder={`${I18n.PLEASE_INPUT}${I18n.GOOGLE_PWD}`}
                        value={this.state.googlePwd}
                        callback={this.stateUpdate('googlePwd')}
                    />
                    <Btn.Linear
                        style={styles.bottomBtn}
                        textStyle={styles.bottomBtnText}
                        btnPress={this.bottomBtnPress}
                        title={I18n.SUBMIT}
                    />
                </View>
            </SafeAreaView>
        );
    }

    stateUpdate = (key) => {
        return (value) => {
            this.setState({
                [key]: value
            });
        }
    }

    bottomBtnPress = () => {
        if (this.state.assetsPwd != this.state.confirmAssetsPwd) {
            Toast.show(I18n.PWD_INCONSISTENT);
            return;
        }
        if (this.state.key == 'assetsPwd') {
            if (this.state.assetsPwd < 6) {
                Toast.show(I18n.PWD_SHORT);
                return;
            }
            let payload = {
                confirmPassword: this.state.assetsPwd,
                googleCode: this.state.googlePwd,
                newPassword: this.state.assetsPwd,
                verifyCode: this.state.verCode
            };
            Api.assetsPwd(payload, () => {
                Toast.show(I18n.SET_ASSETS_PWD_SUCCESS);
                this.props.navigation.pop(3);
            });
        } else if (this.state.key == 'loginPwd') {
            let regExp1 = /[0-9]/;
            let regExp2 = /[a-z]/;
            let regExp3 = /[A-Z]/;
            if (this.state.assetsPwd.length < 6 || this.state.assetsPwd.length > 20) {
                Toast.show('密码长度不合规范(6-18位)');
                return;
            }
            if (!regExp1.test(this.state.assetsPwd)) {
                Toast.show('请至少包含一个数字');
                return;
            }
            if (!regExp2.test(this.state.assetsPwd)) {
                Toast.show('请至少包含一个小写字母');
                return;
            }
            if (!regExp3.test(this.state.assetsPwd)) {
                Toast.show('请至少包含一个大写字母');
                return;
            }
            let payload = {
                confirmPassword: this.state.assetsPwd,
                googleCode: this.state.googlePwd,
                newPassword: this.state.assetsPwd,
                oldPassword: this.state.oldPwd,
                verifyCode: this.state.verCode
            };
            Api.loginPwdUpdate(payload, () => {
                Toast.show(I18n.UPDATE_LOGIN_PWD_SUCCESS);
                this.props.navigation.pop(3);
            });
        }
    }
}
const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    },
    btn: {
        width: Dimensions.get('window').width - 30,
        height: 40,
        backgroundColor: '#4266D2',
        borderRadius: 10
    },
    btnText: {
        color: 'white',
        fontSize: 15
    },
    itemTitle: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(133,133,133)'
    },
    itemState: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 14,
        color: 'rgb(40,46,60)'
    },
    bottomBtn: {
        height: 40,
        width: Dimensions.get('window').width - 30,
        borderRadius: 5,
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    bottomBtnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15
    },
});