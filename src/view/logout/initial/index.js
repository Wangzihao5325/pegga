import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableHighlight,
    ImageBackground,
    StatusBar,
    Dimensions,
    Platform,
    AsyncStorage,
    Modal,
    Linking,
    ScrollView,
    StyleSheet
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import store from '../../../store';
import { user_login, user_info, update_payment_info } from '../../../store/actions/userAction';
import { chat_info_update } from '../../../store/actions/chatAction';
import Api from '../../../socket';
import Variables from '../../../global/Variables';
import { INFO } from '../../../global/Config';

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

export default class Initial extends Component {
    naviWillFocus = () => {
        if (Platform.OS === 'android') {
            StatusBar.setHidden(true);
        }
    }

    state = {
        isModelShow: false,
        modelContext: '',
        downloadUrl: '',
        isForce: false,
        version: ''
    }

    componentDidMount() {
        this._appInit();
    }

    render() {
        if (Platform.OS === 'android') {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <NavigationEvents
                        onWillFocus={this.naviWillFocus}
                        onWillBlur={this.naviWillBlur}
                    />
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
                    <LinearGradient colors={['#39DFB1', '#6284E4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ height: 250, width: 250 }}>
                                <LottieView source={require('../../../image/animate/open_2.json')} autoPlay loop={false} />
                            </View>
                        </View>
                        <View style={{ flex: 1 }} />
                    </LinearGradient>
                </SafeAreaView>
            );
        } else {
            return (
                <LinearGradient colors={['#39DFB1', '#6284E4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.linear}>
                    <StatusBar backgroundColor='transparent' barStyle='light-content' />
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
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ height: 250, width: 250 }}>
                            <LottieView source={require('../../../image/animate/open_2.json')} autoPlay loop={false} />
                        </View>
                    </View>
                    <View style={{ flex: 1 }} />
                </LinearGradient>
            )
        }
    }

    _appInit = () => {
        let platformKey = 0;
        if (Platform.OS == 'ios') {
            platformKey = 1
            // this._autoLogin();
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
            } else {
                this._autoLogin();
            }
        })

    }

    _modelClose = () => {
        this.setState({
            isModelShow: false
        }, () => {
            this._autoLogin();
        })
    }

    _update = () => {
        Linking.openURL(this.state.downloadUrl);
    }

    _autoLogin = async () => {
        //_todoList:token过期
        (async function () {
            let token = await AsyncStorage.getItem('App_token');
            console.log(`token is ${token}`);
            Variables.account.token = token;
            if (token) {
                store.dispatch(user_login());
                update_payment_info();
                Api.userInfo((result) => {
                    store.dispatch(user_info(result));
                    store.dispatch(chat_info_update({ token: result.rcloudToken, userId: result.uuid }));
                    setTimeout(() => this.props.navigation.navigate('App'), 3000);
                }, () => {
                    //清空token
                    Variables.account.token = '';
                    AsyncStorage.setItem('App_token', '');
                    setTimeout(() => this.props.navigation.navigate('Logout'), 3000);
                });
            } else {
                setTimeout(() => this.props.navigation.navigate('Logout'), 3000);
            }
        }.bind(this)());
    }
}

const styles = StyleSheet.create({
    linear: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'PingFang-SC-Regular',
        fontWeight: 'bold',
    },
    slogan: {
        marginTop: 10,
        color: 'white',
        fontSize: 18,
        fontFamily: 'PingFang-SC-Regular',
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