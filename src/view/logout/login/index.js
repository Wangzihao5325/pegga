import React, { Component } from 'react';
import {
    SafeAreaView,
    TouchableHighlight,
    ScrollView,
    View,
    Text,
    Modal,
    Platform,
    Linking,
    ImageBackground,
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
import { chat_info_update } from '../../../store/actions/chatAction';
import { storage_update } from '../../../store/actions/storageAction';
import CountrySelect from './CountrySelect';
import Tips from './Tip4Register';
import Input from '../../../component/input';
import Btn from '../../../component/btn';
import Toast from '../../../component/toast';
import Variables from '../../../global/Variables';
import LinearGradient from 'react-native-linear-gradient';
import { INFO } from '../../../global/Config';

const LOGIN_TYPE = { phone: 'phone', mail: 'mail' };

const Confirm = (props) => {
    return (
        <ImageBackground style={{ width: 295, height: 366 }} resizeMode='contain' source={require('../../../image/usual/upgrade_bg.png')}>
            <View style={styles.popContainer}>
                <Text style={styles.popTitle}>发现新版本</Text>
                <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ height: 20, width: 60, borderRadius: 10, marginLeft: 20, marginTop: 14, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: 'white' }}>{`V ${props.version}`}</Text>
                </LinearGradient>
                <ScrollView style={styles.contextWrapper}>
                    <Text style={{ fontSize: 14, color: 'rgb(110,110,115)', fontFamily: 'PingFang-SC-Medium' }}>{`${props.context}`}</Text>
                </ScrollView>
                <View style={styles.btnWrapper}>
                    <TouchableHighlight onPress={props.done} style={styles.btn}>
                        <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btn}>
                            <Text style={styles.confirm}>更新</Text>
                        </LinearGradient>
                    </TouchableHighlight>
                </View>
                {!props.isForce &&
                    <Text onPress={props.close} style={{ color: 'rgb(54,203,188)', fontSize: 13, fontFamily: 'PingFang-SC-Medium', alignSelf: 'center', marginBottom: 22 }}>忽略此版本</Text>
                }
            </View>
        </ImageBackground>
    );
}

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

    componentDidMount() {
        let platformKey = 0;
        if (Platform.OS == 'ios') {
            platformKey = 1
        }
        Api.appVersion(platformKey, (res) => {
            let serviceVerNum = parseInt(res.version.split('.').join(''));
            let loaclVerNum = Platform.OS == 'ios' ? parseInt(INFO.iosVer.split('.').join('')) : parseInt(INFO.androidVer.split('.').join(''));
            if (serviceVerNum > loaclVerNum) {
                this.setState({
                    isModelShow: true,
                    modelContext: res.versionDesc,
                    downloadUrl: res.downUrl,
                    isForce: res.forceUpdate,
                    version: res.version
                });
            }
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <StatusBar backgroundColor='white' barStyle='dark-content' hidden={false} />
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.isModelShow}
                    onRequestClose={() => console.log('close')}
                >
                    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <Confirm
                            version={this.state.version}
                            context={this.state.modelContext}
                            done={this._update}
                            close={this._modelClose}
                            isForce={this.state.isForce}
                        />
                    </SafeAreaView>
                </Modal>
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

    _modelClose = () => {
        this.setState({
            isModelShow: false
        });
    }

    _update = () => {
        Linking.openURL(this.state.downloadUrl);
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
        let fullAccount = '';
        if (this.state.mode == LOGIN_TYPE.phone) {
            fullAccount = `${this.props.code}-${this.props.accountInput}`;
        } else {
            fullAccount = `email-${this.props.accountInput}`;
        }

        Api.login(fullAccount, this.props.pwdInput, (result, code, message) => {
            store.dispatch(user_login());
            update_payment_info();
            Api.userInfo((result) => {
                this.setState({
                    isLoging: false
                });
                store.dispatch(user_info(result));
                store.dispatch(chat_info_update({ token: result.rcloudToken, userId: result.uuid }));
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
    pwdInput: state.storage.login_pwd_input,
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
    },
    popContainer: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    popTitle: {
        marginTop: 30,
        marginLeft: 20,
        fontFamily: 'PingFang-SC-Medium',
        fontWeight: 'bold',
        fontSize: 22,
        color: 'rgb(40,46,60)',
    },
    contextWrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 28
    },
    contextText: {
        fontSize: 15,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium'
    },
    btnWrapper: {
        marginBottom: 22,
        height: 40,
        width: 295 - 46,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    btn: {
        height: 40,
        width: 295 - 46,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancel: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 16,
        color: 'rgb(94,131,229)'
    },
    confirm: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 16,
        color: 'white'
    }
});