import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../component/header';
import Btn from '../../../component/btn';

export default class CustomService extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title='详细信息'
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <View style={styles.headerContainer}>
                        <Image style={styles.avater} source={require('../../../image/customService/assistant_head.png')} />
                        <View style={{ marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 17, color: 'rgb(40,46,60)', fontFamily: 'PingFang-SC-Medium' }}>客服助手</Text>
                                <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 16, width: 30, justifyContent: 'center', alignItems: 'center', marginLeft: 3, borderRadius: 3 }}>
                                    <Text style={{ color: 'white', fontSize: 12 }}>官方</Text>
                                </LinearGradient>
                            </View>
                            <Text style={{ marginTop: 10, fontSize: 14, color: 'rgb(133,133,133)', fontFamily: 'PingFang-SC-Medium' }}>OTC001</Text>
                        </View>
                    </View>
                    <View style={{ height: 90, width: Dimensions.get('window').width, paddingHorizontal: 15, marginTop: 10, backgroundColor: 'white' }}>
                        <Text style={{ marginTop: 15, fontFamily: 'PingFang-SC-Medium', fontSize: 15, color: 'rgb(40,46,60)' }}>功能介绍</Text>
                        <Text style={{ marginTop: 12, fontFamily: 'PingFang-SC-Medium', fontSize: 13, color: 'rgb(133,133,133)' }}>这里是官方客服号,什么疑问都可向我提问,我都会回复你哦</Text>
                    </View>
                    <View style={{ height: 60, width: Dimensions.get('window').width, paddingHorizontal: 15, marginTop: 10, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'PingFang-SC-Medium', fontSize: 15, color: 'rgb(40,46,60)' }}>类型</Text>
                        <Text style={{ fontFamily: 'PingFang-SC-Medium', fontSize: 14, color: 'rgb(133,133,133)' }}>官方服务号</Text>
                    </View>
                    <Btn.Linear
                        style={styles.btn}
                        textStyle={styles.btnText}
                        btnPress={this.goToChat}
                        title='进入服务号'
                    />
                </View>
            </SafeAreaView>
        );
    }

    goToChat = () => {
        this.props.navigation.navigate('Chat');
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
    headerContainer: {
        height: 110,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avater: {
        height: 65,
        width: 65
    },
    btn: {
        height: 50,
        width: Dimensions.get('window').width - 30,
        borderRadius: 5,
        marginTop: 45,
        alignSelf: 'center'
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 15,
        fontFamily: 'PingFang-SC-Medium'
    },
});