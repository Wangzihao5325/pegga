import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    StatusBar,
    ScrollView,
    StyleSheet
} from 'react-native';
import { NavigationEvents } from 'react-navigation';

import { assets_info_update } from '../../../store/actions/assetsAction';
import Colors from '../../../global/Colors';
import Header from './Header';
import Container from './Container';
import AdList from './AdList';
import AdBtn from './AdBtn';
import { connect } from 'react-redux'

class TradingHall extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

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
                <Header goBackCallback={this.goBack} navi={this.props.navigation} />
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
    }
});