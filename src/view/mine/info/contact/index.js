import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import store from '../../../../store';
import { user_info } from '../../../../store/actions/userAction';
import Api from '../../../../socket';
import Header from '../../../../component/header';
import ItemInput from '../../ItemInput';
import Btn from '../../../../component/btn';
import Toast from '../../../../component/toast';
import I18n from '../../../../global/doc/i18n';

class Contact extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        editable: false,
        phoneNum: this.props.contact.mobileContact,
        weChat: this.props.contact.weixinContact,
        aliPay: this.props.contact.aliContact,
        QQ: this.props.contact.qqContact,
        tg: this.props.contact.telegramContact,
        mail: this.props.contact.emailContact,
        other: this.props.contact.otherContact,
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title={I18n.CONTACT}
                    goback={() => this.props.navigation.goBack()}
                />
                <KeyboardAwareScrollView>
                    <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                        <ItemInput
                            margin
                            isControl
                            title={I18n.PHONE_NUM}
                            placeholder={`${I18n.PLEASE_INPUT}${I18n.PHONE_NUM}`}
                            value={this.state.phoneNum}
                            callback={this.stateUpdate('phoneNum')}
                            editable={this.state.editable}
                        />
                        <ItemInput
                            margin
                            bottomLine
                            isControl
                            title={I18n.WECHAT}
                            placeholder={`${I18n.PLEASE_INPUT}${I18n.WECHAT}`}
                            value={this.state.weChat}
                            callback={this.stateUpdate('weChat')}
                            editable={this.state.editable}
                        />
                        <ItemInput
                            bottomLine
                            isControl
                            title={I18n.ALIPAY}
                            placeholder={`${I18n.PLEASE_INPUT}${I18n.ALIPAY}`}
                            value={this.state.aliPay}
                            callback={this.stateUpdate('aliPay')}
                            editable={this.state.editable}
                        />
                        <ItemInput
                            isControl
                            title={I18n.QQ}
                            placeholder={`${I18n.PLEASE_INPUT}${I18n.QQ}`}
                            value={this.state.QQ}
                            callback={this.stateUpdate('QQ')}
                            editable={this.state.editable}
                        />
                        <ItemInput
                            margin
                            bottomLine
                            isControl
                            title={I18n.TG}
                            placeholder={`${I18n.PLEASE_INPUT}${I18n.TG}`}
                            value={this.state.tg}
                            callback={this.stateUpdate('tg')}
                            editable={this.state.editable}
                        />
                        <ItemInput
                            bottomLine
                            isControl
                            title={`${I18n.EMAIL}`}
                            placeholder={`${I18n.PLEASE_INPUT}${I18n.EMAIL}`}
                            value={this.state.mail}
                            callback={this.stateUpdate('mail')}
                            editable={this.state.editable}
                        />
                        <ItemInput
                            isControl
                            title={I18n.OTHER}
                            placeholder={`${I18n.PLEASE_INPUT}${I18n.OTHER}${I18n.CONTACT}`}
                            value={this.state.other}
                            callback={this.stateUpdate('other')}
                            editable={this.state.editable}
                        />
                        <Btn.Linear
                            style={styles.bottomBtn}
                            textStyle={styles.bottomBtnText}
                            btnPress={this.bottomBtnPress}
                            title={this.state.editable ? I18n.SUBMIT : I18n.EDIT}
                        />

                    </View>
                </KeyboardAwareScrollView>
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
        if (this.state.editable) {
            let payload = {
                aliContact: this.state.aliPay,
                emailContact: this.state.mail,
                mobileContact: this.state.phoneNum,
                otherContact: this.state.other,
                qqContact: this.state.QQ,
                telegramContact: this.state.tg,
                weixinContact: this.state.weChat
            };
            Api.updateContact(payload, (result) => {
                this.setState({
                    editable: false
                });
                Api.userInfo((result) => {
                    store.dispatch(user_info(result));
                    Toast.show('更新联系方式成功');
                    this.props.navigation.goBack();
                });
            }, (result, code, message) => {
                let toastText = message ? message : '更新联系方式失败!';
                Toast.show(toastText);
            });
        } else {
            this.setState({
                editable: true
            })
        }
    }
}

function mapState2Props(store) {
    return {
        contact: store.user.contact,
    }
}

export default connect(mapState2Props)(Contact);

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