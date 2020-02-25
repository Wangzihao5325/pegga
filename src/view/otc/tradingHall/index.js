import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    ScrollView,
    Modal,
    Platform,
    Text,
    TouchableHighlight,
    ImageBackground,
    Linking,
    StyleSheet,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { assets_info_update } from '../../../store/actions/assetsAction';
import Colors from '../../../global/Colors';
import Header from './Header';
import Container from './Container';
import AdList from './AdList';
import AdBtn from './AdBtn';
import { connect } from 'react-redux';
import { INFO } from '../../../global/Config';
import Api from '../../../socket/index';
import LinearGradient from 'react-native-linear-gradient';

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

class TradingHall extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        isModelShow: false,
        modelContext: '',
        downloadUrl: '',
        isForce: false,
        version: ''
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

    naviDidFocus = () => {
        assets_info_update();
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <NavigationEvents
                    onDidFocus={this.naviDidFocus}
                />
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
                <Header goBackCallback={this.goBack} navi={this.props.navigation} addAdd={this.addAd} />
                <View style={{ flex: 1, backgroundColor: '#F2F2F2', flexDirection: 'column', alignItems: 'center' }}>
                    {/* <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                    > */}
                    {/* <Container navi={this.props.navigation} /> 不能开启，，开启需要考虑多个ali wexin支付账号的问题 */}
                    <AdList navi={this.props.navigation} />
                    {/* </ScrollView> */}
                    <AdBtn btnPress={this.addAd} />
                </View>
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

    addAd = () => {
        if (this.props.isBindingPay) {
            this.props.navigation.navigate('NewAd')
        } else {
            this.props.navigation.navigate('PopModel', {
                confirm: () => this.props.navigation.navigate('PayManager'),
                confirmText: '立即绑定',
                title: '提示',
                context: '需要绑定支付方式才能进行交易!'
            });
        }
    }

    goBack = () => {
        this.props.navigation.pop();
    }
}

const mapStateToProps = (state) => ({
    isBindingPay: state.user.state.isBindingPay
})

export default connect(mapStateToProps)(TradingHall);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: Colors.MAIN_BG_COLOR,
        flexDirection: 'column'
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