import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { update_payment_info } from '../../../store/actions/userAction';
import Header from '../../../component/header';
import Select from '../../../component/select';

import AliPay from './AliPay';
import WechatPay from './WechatPay';
import BankCardPay from './BankCardPay';
import I18n from '../../../global/doc/i18n';

export default class PayManager extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: 'aliPay'
    }

    componentDidMount() {
        update_payment_info();
    }

    render() {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <Header.Normal
                    title={I18n.PAY_TITLE}
                    goback={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, backgroundColor: '#F3F5F9', flexDirection: 'column', alignItems: 'center', paddingTop: 1 }}>
                    <KeyboardAwareScrollView>
                        <Select.ScrollLinear
                            data={[{ title: I18n.PAY_ALIPAY, key: 'aliPay' }, { title: I18n.PAY_WECHAT, key: 'wechatPay' }, { title: I18n.PAY_CARD, key: 'card' }]}
                            isFlex={true}
                            style={{ backgroundColor: 'white' }}
                            selectValue={this.state.type}
                            selectChange={this.selectChange}
                            isControl
                        />
                        {this.state.type == 'aliPay' && <AliPay navi={this.props.navigation} />}
                        {this.state.type == 'wechatPay' && <WechatPay navi={this.props.navigation} />}
                        {this.state.type == 'card' && <BankCardPay navi={this.props.navigation} />}
                    </KeyboardAwareScrollView>
                </View>
            </SafeAreaView>
        );
    }

    selectChange = (item) => {
        this.setState({
            type: item.key
        })
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
    btn: {
        width: Dimensions.get('window').width - 30,
        height: 40,
        backgroundColor: '#4266D2',
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    btnText: {
        color: 'white',
        fontSize: 15
    }
});