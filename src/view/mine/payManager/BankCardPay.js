import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Toast from '../../../component/toast';
import Api from '../../../socket';
import ItemInput from '../ItemInput';
import Btn from '../../../component/btn';

class BankCardPay extends PureComponent {
    state = {
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
                auditStatusText = '您提交的支付信息正在审核中，请耐心等待';
            } else if (props.bank.auditStatus == 2) {
                auditStatusText = '您提交的支付信息审核失败，请重新提交';
            }
            return {
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
                    title='姓名'
                    placeholder='请输入账号姓名'
                    value={this.state.accountName}
                    callback={this.stateUpdate('accountName')}
                />
                <ItemInput
                    margin
                    bottomLine
                    isControl
                    title='开户银行'
                    placeholder='请输入开户银行'
                    value={this.state.bankName}
                    callback={this.stateUpdate('bankName')}
                />
                <ItemInput
                    bottomLine
                    isControl
                    title='开户支行'
                    tips='(选填)'
                    placeholder='请输入开户支行'
                    value={this.state.subBranchName}
                    callback={this.stateUpdate('subBranchName')}
                />
                <ItemInput
                    bottomLine
                    isControl
                    title='银行卡号'
                    placeholder='请输入银行卡号'
                    value={this.state.account}
                    callback={this.stateUpdate('account')}
                />
                <ItemInput
                    isControl
                    title='每日收款限额'
                    tips='(选填)'
                    placeholder='请输入每日收款上限'
                    value={this.state.max}
                    callback={this.stateUpdate('max')}
                />
                <ItemInput
                    secureTextEntry
                    margin
                    isControl
                    title='资金密码'
                    placeholder='请输入资金密码'
                    value={this.state.assetsPwd}
                    callback={this.stateUpdate('assetsPwd')}
                />
                <Btn.Linear
                    style={styles.btn}
                    textStyle={styles.btnText}
                    title='完成设置'
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
        Api.bankCard(payload, () => {
            Toast.show('绑定银行卡成功');
        });
    }
}

function mapState2Props(store) {
    return {
        bank: store.user.payment.bank
    }
}

export default connect(mapState2Props)(BankCardPay);

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