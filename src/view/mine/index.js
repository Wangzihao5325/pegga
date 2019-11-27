import React, { Component } from 'react';
import {
    View,
    Platform,
    StatusBar,
    Image,
    Dimensions,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';

import Header from './Header';
import Item from './Item';
import Value2Str from '../../global/util/MapValue2Str';
import Toast from '../../component/toast';

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
                    toService={() => this.navigate('CustomService')}
                    toInfo={() => this.navigate('Info')}
                />
                <View style={styles.invite}>
                    <TouchableHighlight underlayColor='transparent' onPress={() => this.navigate('Invite')} style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Image style={{ height: 68, width: Dimensions.get('window').width - 20, borderTopLeftRadius: 5, borderTopRightRadius: 5 }} source={require('../../image/mine/invite/invite_banner.png')} />
                    </TouchableHighlight>
                </View>
                <Item
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
                    btnPress={this.goToIdentity}
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

    goToIdentity = () => {
        const { kycAuditStatus, kycLevel } = this.props.kyc;
        if (kycAuditStatus == 0) {//审核中
            Toast.show('信息审核中,请耐心等待');
        } else if (kycAuditStatus == 1) {
            if (kycLevel == 0) {
                this.navigate('Identity');
            } else {
                Toast.show('您已进行过身份认证');
            }
        } else {
            this.navigate('Identity');
        }
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
    invite: {
        height: 75,
        width: Dimensions.get('window').width,
        backgroundColor: '#F3F5F9'
    }
});