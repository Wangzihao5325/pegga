import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    Platform,
    AsyncStorage,
    StyleSheet
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

import store from '../../../store';
import { user_login, user_info, update_payment_info } from '../../../store/actions/userAction';
import Api from '../../../socket';
import Variables from '../../../global/Variables';

export default class Initial extends Component {
    naviWillFocus = () => {
        if (Platform.OS === 'android') {
            StatusBar.setHidden(true);
        }
    }

    componentDidMount() {
        this._autoLogin();
    }

    render() {
        if (Platform.OS === 'android') {
            return (
                <SafeAreaView style={{ flex: 1 }}>
                    <NavigationEvents
                        onWillFocus={this.naviWillFocus}
                        onWillBlur={this.naviWillBlur}
                    />
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
                //setTimeout(() => this.props.navigation.navigate('App'), 3000);
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
    }
});