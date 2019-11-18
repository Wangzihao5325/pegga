import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';


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
        setTimeout(() => {
            this.props.navigation.navigate('Logout');
            //this.props.navigation.navigate('App');
        }, 3000)

        //to do list
        //根据上次登陆的时间,7 day 判断是直接登陆('App')，还是跳转登陆页面('Logout')
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