import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Toast from '../../../component/toast';
import Api from '../../../socket';
import ItemInput from '../ItemInput';
import Btn from '../../../component/btn';
import I18n from '../../../global/doc/i18n';

export default class BankCardPay extends PureComponent {
    state = {
        bankId: null,
        accountName: '',
        bankName: '',
        subBranchName: '',
        account: '',
        max: '',
        auditStatus: 1,
        auditStatusText: '',

        assetsPwd: '',

        bank: null
    }

    static getDerivedStateFromProps(props, state) {
        if (props.bank && state.bank !== props.bank) {
            let auditStatusText = '';
            if (props.bank.auditStatus == 0) {
                auditStatusText = I18n.PAYMENT_CHECKING;
            } else if (props.bank.auditStatus == 2) {
                auditStatusText = I18n.PAYMENT_CHECK_FAILED;
            }
            return {
                bankId: props.bank.bankId ? props.bank.bankId : null,
                bank: props.bank,
                accountName: props.bank.realName,
                bankName: props.bank.bank,
                subBranchName: props.bank.bankBranch,
                account: props.bank.bankCard,
                max: `${props.bank.dailyAmount}`,
                auditStatus: props.bank.auditStatus,
                auditStatusText
            }
        } else {
            return null;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.auditStatus !== 1 &&
                    <View style={{ paddingHorizontal: 15, height: 45, width: Dimensions.get('window').width, backgroundColor: '#DAE1F6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#004DCF', lineHeight: 20 }}>{this.state.auditStatusText}</Text>
                    </View>
                }
                <ItemInput
                    margin={this.state.auditStatus == 1}
                    isControl
                    title={I18n.IDENTITY_NAME}
                    placeholder={I18n.PLEASE_INPUT_PAY_NAME}
                    value={this.state.accountName}
                    callback={this.stateUpdate('accountName')}
                />
                <ItemInput
                    margin
                    bottomLine
                    isControl
                    title={I18n.BANK}
                    placeholder={`${I18n.PLEASE_INPUT}${I18n.BANK}`}
                    value={this.state.bankName}
                    callback={this.stateUpdate('bankName')}
                />
                <ItemInput
                    bottomLine
                    isControl
                    title={I18n.SUB_BANK}
                    tips={I18n.CHOOSE_INPUT}
                    placeholder={`${I18n.PLEASE_INPUT}${I18n.SUB_BANK}`}
                    value={this.state.subBranchName}
                    callback={this.stateUpdate('subBranchName')}
                />
                <ItemInput
                    bottomLine
                    isControl
                    title={I18n.BANK_CARD}
                    placeholder={`${I18n.PLEASE_INPUT}${I18n.BANK_CARD}`}
                    value={this.state.account}
                    callback={this.stateUpdate('account')}
                />
                <ItemInput
                    isControl
                    title={I18n.DAILY_MAX}
                    tips={I18n.CHOOSE_INPUT}
                    placeholder={`${I18n.PLEASE_INPUT}${I18n.DAILY_MAX}`}
                    value={this.state.max}
                    callback={this.stateUpdate('max')}
                />
                <ItemInput
                    secureTextEntry
                    margin
                    isControl
                    title={I18n.ASSETS_PWD}
                    placeholder={`${I18n.PLEASE_INPUT}${I18n.ASSETS_PWD}`}
                    value={this.state.assetsPwd}
                    callback={this.stateUpdate('assetsPwd')}
                />
                <Btn.Linear
                    style={styles.btn}
                    textStyle={styles.btnText}
                    title='确认添加'
                    btnPress={this.upload}
                />
            </View>
        );
    }

    stateUpdate = (key) => {
        return (value) => {
            this.setState({
                [key]: value
            });
        }
    }


    upload = () => {
        if (this.state.auditStatus == 0) {
            Toast.show(this.state.auditStatusText);
            return;
        }
        let payload = {
            bank: this.state.bankName,
            bankBranch: this.state.subBranchName,
            bankCard: this.state.account,
            dailyAmount: this.state.max,
            realName: this.state.accountName,
            tradePassword: this.state.assetsPwd
        }
        if (this.state.bankId) {
            payload.bankId = this.state.bankId;
        }
        Api.bankCard(payload, () => {
            Toast.show(I18n.INFO_SUBMIT_SUCCESS);
            this.props.navi.goBack();
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
        height: 40,
        width: Dimensions.get('window').width - 30,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 16,
        color: 'white'
    }
});