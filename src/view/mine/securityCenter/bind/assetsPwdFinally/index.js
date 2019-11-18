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
        let subTitle = '资金';
        switch (key) {
            case 'loginPwd':
                subTitle = '登陆';
                break;
            case 'assetsPwd':
                subTitle = '资金';
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
                    title={`设置${this.state.subTitle}密码`}
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    {this.state.key == 'loginPwd' &&
                        <ItemInput
                            margin
                            bottomLine
                            isControl
                            secureTextEntry
                            title='旧密码'
                            placeholder={`请输入旧密码`}
                            value={this.state.oldPwd}
                            callback={this.stateUpdate('oldPwd')}
                        />
                    }
                    <ItemInput
                        margin={this.state.key !== 'loginPwd'}
                        bottomLine
                        isControl
                        secureTextEntry
                        title={`${this.state.subTitle}密码`}
                        placeholder={`请输入${this.state.subTitle}密码`}
                        value={this.state.assetsPwd}
                        callback={this.stateUpdate('assetsPwd')}
                    />
                    <ItemInput
                        isControl
                        secureTextEntry
                        title={`确认${this.state.subTitle}密码`}
                        placeholder={`请确认${this.state.subTitle}密码`}
                        value={this.state.confirmAssetsPwd}
                        callback={this.stateUpdate('confirmAssetsPwd')}
                    />
                    <ItemInput
                        isControl
                        secureTextEntry
                        title='google密码'
                        placeholder='请输入google密码'
                        value={this.state.googlePwd}
                        callback={this.stateUpdate('googlePwd')}
                    />
                    <Btn.Linear
                        style={styles.bottomBtn}
                        textStyle={styles.bottomBtnText}
                        btnPress={this.bottomBtnPress}
                        title='提交'
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
        if (this.state.assetsPwd < 8) {
            Toast.show('密码过短，请至少输入8位密码');
            return;
        }
        if (this.state.assetsPwd != this.state.confirmAssetsPwd) {
            Toast.show('密码不一致，请进行确认');
            return;
        }
        if (this.state.key == 'assetsPwd') {
            let payload = {
                confirmPassword: this.state.assetsPwd,
                googleCode: this.state.googlePwd,
                newPassword: this.state.assetsPwd,
                verifyCode: this.state.verCode
            };
            Api.assetsPwd(payload, () => {
                Toast.show('设置资金密码成功!');
                this.props.navigation.pop(3);
            }, (result, code, message) => {
                let msg = message ? message : '设置资金密码失败';
                Toast.show(msg);
            });
        } else if (this.state.key == 'loginPwd') {
            let payload = {
                confirmPassword: this.state.assetsPwd,
                googleCode: this.state.googlePwd,
                newPassword: this.state.assetsPwd,
                oldPassword: this.state.oldPwd,
                verifyCode: this.state.verCode
            };
            Api.loginPwdUpdate(payload, () => {
                Toast.show('更新登陆密码成功!');
                this.props.navigation.pop(3);
            }, (result, code, message) => {
                let msg = message ? message : '更新登陆密码失败';
                Toast.show(msg);
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