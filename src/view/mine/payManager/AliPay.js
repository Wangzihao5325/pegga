import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import store from '../../../store';
import { boundry_change } from '../../../store/actions/countryCodeAction';
import Api from '../../../socket';
import ItemInput from '../ItemInput';
import PhotoUpload from '../../../component/photoUpload';
import Boundary from './boundary';
import Btn from '../../../component/btn';
import Toast from '../../../component/toast';
import BoundryUtil from './boundary/boundryUtil';


class AliPay extends Component {
    state = {
        accountName: '',
        account: '',
        uuid: '',
        accountNickName: '',
        url: 'www.test.png',
        auditStatus: 1,//当前状态 0待审核 1通过 2未通过
        auditStatusText: '',
        rangeType: 'country', // country province city

        assetsPwd: '',

        alipay: null,
    }

    static getDerivedStateFromProps(props, state) {
        if (props.alipay && state.alipay !== props.alipay) {
            let auditStatusText = '';
            if (props.alipay.auditStatus == 0) {
                auditStatusText = '您提交的支付信息正在审核中，请耐心等待';
            } else if (props.alipay.auditStatus == 2) {
                auditStatusText = '您提交的支付信息审核失败，请重新提交';
            }
            let rangeType = BoundryUtil(props.alipay.provinceId, props.alipay.cityId)
            //修改bname bcode
            return {
                alipay: props.alipay,
                account: props.alipay.alipayNo,
                accountNickName: props.alipay.alipayNick,
                uuid: props.alipay.alipayUuid,
                url: props.alipay.aliQrCode,
                accountName: props.alipay.realName,
                auditStatus: props.alipay.auditStatus,
                auditStatusText,
                rangeType
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
                    bottomLine
                    isControl
                    title='姓名'
                    placeholder='请输入账号姓名'
                    value={this.state.accountName}
                    callback={this.stateUpdate('accountName')}
                />
                <ItemInput
                    bottomLine
                    isControl
                    title='支付宝账号'
                    placeholder='请输入支付宝账号'
                    value={this.state.account}
                    callback={this.stateUpdate('account')}
                />
                <ItemInput
                    bottomLine
                    isControl
                    title='支付宝昵称'
                    placeholder='请输入昵称'
                    value={this.state.accountNickName}
                    callback={this.stateUpdate('accountNickName')}
                />
                <ItemInput
                    isControl
                    title='支付宝uuid'
                    placeholder='请输入uuid'
                    value={this.state.uuid}
                    callback={this.stateUpdate('uuid')}
                />
                <View style={{ height: 180, width: Dimensions.get('window').width, marginTop: 10, paddingBottom: 10, backgroundColor: 'white' }}>
                    <Text style={styles.uploadText}>上传收款二维码</Text>
                    <PhotoUpload
                        ref={imageUpload => this.imageUpload = imageUpload}
                        maxPic={1}
                        callback={this.imageUploadCallback}
                    />
                </View>
                <Boundary
                    value={this.state.rangeType}
                    countrySelect={this.countrySelect}
                    provinceSelect={this.provinceSelect}
                    citySelect={this.citySelect}
                />
                <ItemInput
                    secureTextEntry
                    margin
                    bottomLine
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

    citySelect = () => {
        this.setState({
            rangeType: 'city'
        }, () => {
            this.props.navi.navigate('CitySelect', { type: 'province', end: 'city' });
        });
    }

    provinceSelect = () => {
        this.setState({
            rangeType: 'province'
        }, () => {
            this.props.navi.navigate('CitySelect');
        })
    }

    countrySelect = () => {
        this.setState({
            rangeType: 'country'
        }, () => {
            store.dispatch(boundry_change('中国', [1]));
        })
    }

    stateUpdate = (key) => {
        return (value) => {
            this.setState({
                [key]: value
            });
        }
    }

    imageUploadCallback = (res) => {
        console.log(res);
        console.log('111222');
    }

    upload = () => {
        if (this.state.auditStatus == 0) {
            Toast.show(this.state.auditStatusText);
            return;
        }
        let payload = {
            realName: this.state.accountName,
            alipayNo: this.state.account,
            aliQrCode: this.state.url,
            alipayUuid: this.state.uuid,
            alipayNick: this.state.accountNickName,
            tradePassword: this.state.assetsPwd,
        }
        if (this.props.bCode.length >= 1) {
            payload.countryId = this.props.bCode[0];
        }
        if (this.props.bCode.length >= 2) {
            payload.provinceId = this.props.bCode[1];
        }
        if (this.props.bCode.length >= 3) {
            payload.cityId = this.props.bCode[2];
        }

        //this.imageUpload.upload();

        Api.aliPay(payload, () => {
            Toast.show('绑定支付宝成功！')
        }, (result, code, message) => {
            let msg = message ? message : '绑定支付宝失败!';
            Toast.show(msg)
        })
    }
}

function mapState2Props(store) {
    return {
        bName: store.country.boundryName,
        bCode: store.country.boundryCode,
        alipay: store.user.payment.alipay
    }
}

export default connect(mapState2Props)(AliPay);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    uploadText: {
        marginTop: 20,
        marginBottom: 15,
        marginLeft: 15,
        fontFamily: 'PingFang-SC-Medium',
        fontSize: 15,
        color: 'rgb(40,46,60)'
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