import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Colors from '../../../../global/Colors';
import Api from '../../../../socket';
import Header from '../../../../component/header';
import VerCodeInput from '../../../../component/input/VerCodeInput';
import Tips from './Tip4SendMsg';
import Toast from '../../../../component/toast';


class VerCodeInputView extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        countryCode: '',
        account: '',
        mode: ''
    }

    componentDidMount() {
        const account = this.props.navigation.getParam('account', '');
        const mode = this.props.navigation.getParam('mode', '');
        this.setState({
            countryCode: mode == 'phone' ? this.props.code : '',
            account,
            mode
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer} >
                <Header.Normal goback={() => this.props.navigation.goBack()} />
                <Text style={styles.titleText}>输入验证码</Text>
                <Text style={styles.sendAddressText}>{`验证码已发送至${this.state.countryCode} ${this.state.account}`}</Text>
                <VerCodeInput inputDone={this.verCodeInputDone} />
                <Tips style={styles.tips} pressCallback={this.sendMsg} />
            </SafeAreaView>
        );
    }

    sendMsg = () => {
        if (this.state.mode == 'phone') {
            Api.sendSignupMsg(this.state.account, (res) => {
                Toast.show('发送验证码成功');
            })
        } else {
            Api.sendMailSignupMsg(this.state.account, (res) => {
                Toast.show('发送验证码成功');
            })
        }
    }

    verCodeInputDone = (verCode) => {
        let { mode, account, countryCode } = this.state;
        this.props.navigation.navigate('PwdInputView', { mode, account, countryCode, verCode });
    }

}

function mapState2Props(store) {
    return {
        code: store.country.code
    }
}

export default connect(mapState2Props)(VerCodeInputView);

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
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    sendAddressText: {
        marginTop: 25,
        fontFamily: 'PingFang-SC-Medium',
        color: 'rgb(40,46,60)',
        fontSize: 15,
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    tips: {
        alignSelf: 'flex-start'
    }
});