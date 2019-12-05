import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableHighlight,
    StatusBar,
    Dimensions,
    Platform,
    AsyncStorage,
    Modal,
    StyleSheet
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import store from '../../../store';
import { user_login, user_info, update_payment_info } from '../../../store/actions/userAction';
import Api from '../../../socket';
import Variables from '../../../global/Variables';
import { INFO } from '../../../global/Config';

const Confirm = (props) => {
    return (
        <View style={styles.popContainer}>
            <Text style={styles.popTitle}>发现新版本</Text>
            <View style={styles.contextWrapper}>
                <Text>{`${props.context}`}</Text>
            </View>
            <View style={styles.btnWrapper}>
                <TouchableHighlight onPress={props.done} style={styles.btn}>
                    <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btn}>
                        <Text style={styles.confirm}>更新</Text>
                    </LinearGradient>
                </TouchableHighlight>
            </View>
        </View>
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
        downloadUrl: ''
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
                                context={this.state.modelContext}
                                done={this._update}
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
                                context={this.state.modelContext}
                                done={this._update}
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
        /*
        if (Platform.OS == 'android') {
            Api.appVersion((res)=>{

            })
        }
        */
        Api.appVersion((res) => {
            let serviceVerNum = parseInt(res.androidVersion.split('.').join(''));
            let loaclVerNum = parseInt(INFO.androidVer.split('.').join(''));
            if (serviceVerNum > loaclVerNum) {
                this.setState({
                    isModelShow: true,
                    modelContext: res.versionDesc,
                    downloadUrl: res.downUrl
                });
            } else {
                this._autoLogin();
            }
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
        height: 210,
        width: Dimensions.get('window').width - 60,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 30
    },
    popTitle: {
        marginTop: 20,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 17,
        color: 'rgb(40,46,60)',
        alignSelf: 'center'
    },
    contextWrapper: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contextText: {
        fontSize: 15,
        color: 'rgb(40,46,60)',
        fontFamily: 'PingFang-SC-Medium'
    },
    btnWrapper: {
        height: 40,
        width: Dimensions.get('window').width - 60 - 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        alignSelf: 'center'
    },
    btn: {
        height: 40,
        width: Dimensions.get('window').width - 60 - 60,
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