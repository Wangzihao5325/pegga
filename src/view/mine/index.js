import React, { Component } from 'react';
import {
    View,
    Platform,
    StatusBar,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import Header from './Header';
import Item from './Item';
import Value2Str from '../../global/util/MapValue2Str';

class Mine extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    naviWillFocus = () => {
        if (Platform.OS == 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent');
            StatusBar.setBarStyle('dark-content');
        }
    }

    naviWillBlur = () => {
        if (Platform.OS == 'android') {
            StatusBar.setTranslucent(false);
            StatusBar.setBackgroundColor('white');
            StatusBar.setBarStyle('dark-content');
        }
    }

    render() {
        const { kycAuditStatus, kycLevel } = this.props.kyc;
        let kycStatusText = Value2Str.kycStatusText(kycAuditStatus, kycLevel);
        return (
            <View style={styles.unsafeArea}>
                <NavigationEvents
                    onWillFocus={this.naviWillFocus}
                    onWillBlur={this.naviWillBlur}
                />
                <Header
                    toNews={this.test}
                    toService={this.test}
                    toInfo={() => this.navigate('Info')}
                />
                <Item
                    margin
                    bottomLine
                    title='安全中心'
                    avater={require('../../image/mine/security_center.png')}
                    btnPress={() => this.navigate('SecurityCenter')}
                />
                <Item
                    bottomLine
                    title='身份认证'
                    stateText={kycStatusText}
                    avater={require('../../image/mine/identity.png')}
                    btnPress={() => this.navigate('Identity')}
                />
                <Item
                    title='支付方式管理'
                    avater={require('../../image/mine/pay_manage.png')}
                    btnPress={() => this.navigate('PayManager')}
                />

                <Item
                    margin
                    title='商家认证'
                    avater={require('../../image/mine/businssCer.png')}
                    btnPress={() => this.navigate('MerchantCertification')}
                />

                <Item
                    margin
                    bottomLine
                    title='帮助中心'
                    avater={require('../../image/mine/help.png')}
                    btnPress={() => this.navigate('HelpCenter')}
                />
                <Item
                    title='关于我们'
                    avater={require('../../image/mine/about.png')}
                    btnPress={() => this.navigate('AboutUs')}
                />

                <Item
                    margin
                    title='设置'
                    avater={require('../../image/mine/setting.png')}
                    btnPress={() => this.navigate('Setting')}
                />
            </View>
        );
    }

    navigate = (view) => {
        this.props.navigation.navigate(view);
    }

    test = () => {
     //   console.log('123');
    }
}

function mapState2Props(store) {
    return {
        kyc: store.user.state.kyc
    }
}

export default connect(mapState2Props)(Mine);

const styles = StyleSheet.create({
    unsafeArea: {
        flex: 1,
        backgroundColor: '#F3F5F9'
    },
});