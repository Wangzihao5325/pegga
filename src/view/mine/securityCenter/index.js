import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import Api from '../../../socket';
import Header from '../../../component/header';
import Item from '../Item';
import Toast from '../../../component/toast';

class SecurityCenter extends Component {
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
                    title='安全中心'
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9' }}>
                    <Item
                        margin
                        title='登陆密码'
                        btnPress={() => this.pwd('loginPwd')}
                    />
                    <Item
                        margin
                        bottomLine
                        title='资金密码设置'
                        btnPress={() => this.pwd('assetsPwd')}
                    />
                    <Item
                        title='谷歌验证码设置'
                        btnPress={() => this.navigate('SecurityCenter')}
                    />
                    <Item
                        margin
                        bottomLine
                        title='绑定手机号'
                        btnPress={() => this.bindAccount('phone')}
                    />
                    <Item
                        title='绑定邮箱号'
                        btnPress={() => this.bindAccount('mail')}
                    />
                </View>
            </SafeAreaView>
        );
    }

    pwd = (key) => {
        const { isSmsVerified } = this.props.state;
        if (!isSmsVerified) {
            Toast.show('请先绑定手机号!');
            return;
        }
        const { bindPhone } = this.props.info;
        if (key == 'loginPwd') {
            Api.sendChangePwdMsg((res) => {
                this.props.navigation.navigate('BindStepTwo', { account: bindPhone, mode: 'phone', key });
            });
        } else if (key == 'assetsPwd') {
            //_todoList:更换资产密码的接口暂无
            this.props.navigation.navigate('BindStepTwo', { account: bindPhone, mode: 'phone', key });
        }
    }

    bindAccount = (type) => {
        const { isEmailVerified, isSmsVerified } = this.props.state;
        if (type == 'phone' && isSmsVerified) {
            Toast.show('您已经绑定过手机号,无需再次绑定!');
            return;
        } else if (type == 'mail' && isEmailVerified) {
            Toast.show('您已经绑定过邮箱,无需再次绑定!');
            return;
        }
        this.props.navigation.navigate('BindStepOne', { type });
    }

    navigate = (e) => {
        // console.log(e);
    }
}

function mapState2Props(store) {
    return {
        state: store.user.state,
        info: store.user.info
    }
}

export default connect(mapState2Props)(SecurityCenter);

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center'
    }
});