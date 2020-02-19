import React, { Component } from 'react';
import { Animated, View, Text, Image, TouchableHighlight, TextInput, Dimensions, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Api from '../../socket/index';
const Confirm = (props) => {
    return (
        <View style={styles.popContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ height: 22, width: 18 }} source={require('../../image/security/security_icon.png')} />
                    <Text style={styles.popTitle}>安全验证</Text>
                </View>
                <TouchableHighlight onPress={props.cancel} underlayColor='transpaent'>
                    <Text style={{ fontSize: 14, color: 'rgb(188,192,203)', fontFamily: 'PingFang-SC-Medium' }}>取消</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.contextWrapper}>
                <Text style={{ color: 'rgb(222,44,88)', fontSize: 11, fontFamily: 'PingFang-SC-Medium' }}>输入密码即可放行,不可撤销,请谨慎操作!</Text>
            </View>
            <Text style={{ marginTop: 15, color: 'rgb(40,46,60)', fontFamily: 'PingFang-SC-Medium', fontSize: 13 }}>资金密码</Text>
            <TextInput style={{ height: 20, marginTop: 12, width: Dimensions.get('window').width - 60, fontSize: 14 }} value={props.value} onChangeText={(value) => props.callback(value)} placeholderTextColor='rgb(188,192,203)' placeholder='请输入资金密码' />
            <View style={{ marginTop: 10, height: StyleSheet.hairlineWidth, width: Dimensions.get('window').width - 60, backgroundColor: 'rgb(188,192,203)' }} />
            <TouchableHighlight onPress={props.done} style={styles.btn}>
                <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btn}>
                    <Text style={styles.confirm}>确认密码</Text>
                </LinearGradient>
            </TouchableHighlight>
        </View>
    );
}

export default class PopModel extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    constructor(props) {
        super(props);
        this.timer = null;
    }

    state = {
        fadeAnim: new Animated.Value(0),
        type: '',
        orderNo: '',
        tradePassword: ''
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', 'Seller_Confrim');
        if (type == 'Seller_Confrim') {
            const orderNo = this.props.navigation.getParam('orderNo', '');
            this.setState({
                type,
                orderNo
            });
        }

        this.timer = setTimeout(() => {
            this.timer = null
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1,
                }
            ).start();

        }, 300);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null
        }
    }

    render() {
        return (
            <Animated.View style={{ flex: 1, opacity: this.state.fadeAnim }}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <Confirm
                        cancel={this.back}
                        done={this.done}
                        value={this.state.tradePassword}
                        callback={this.textChange}
                    />
                </View>
            </Animated.View>
        );
    }

    textChange = (value) => {
        this.setState({
            tradePassword: value
        });
    }

    back = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 400
            }
        ).start();
        this.timer = setTimeout(() => {
            this.timer = null;
            this.props.navigation.goBack();
        }, 500)
    }

    done = () => {
        if (type == 'Seller_Confrim') {
            Api.sellerConfirmOrder(this.state.orderNo, this.state.tradePassword, () => {
                Toast.show('您已经确认收款！');
                this.props.navigation.state.params.confirm();
                this._dismiss();
            })
        }
    }

    _dismiss = () => {
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 0,
                duration: 400
            }
        ).start();
        this.timer = setTimeout(() => {
            this.timer = null;
            this.props.navigation.goBack();
        }, 500)
    }
}

const styles = StyleSheet.create({
    popContainer: {
        height: 220,
        width: Dimensions.get('window').width,
        backgroundColor: 'white',
        borderRadius: 5,
        paddingHorizontal: 30
    },
    popTitle: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 17,
        color: 'rgb(40,46,60)',
        marginLeft: 10
    },
    contextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6
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
        marginTop: 10,
        height: 40,
        width: Dimensions.get('window').width - 60,
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