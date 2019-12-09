import React, { Component, useState } from 'react';
import { View, Text, Dimensions, TextInput, StyleSheet } from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import { SERVICE_URL } from '../../../global/Config';
import * as Config from '../../../global/Config';

const UIDInput = (props) => {
    const showChange = () => {
        if (typeof props.callback == 'function') {
            props.callback(props.isShow);
        }
    }
    const textChange = (value) => {
        if (typeof props.textChange == 'function') {
            props.textChange(value)
        }
    }
    let btnText = props.isShow ? '收起' : '获取方法';
    return (
        <View style={{ height: 110, width: Dimensions.get('window').width, padding: 15 }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'PingFang-SC-Medium', fontSize: 15, color: 'rgb(40,46,60)', }}>支付宝UID</Text>
                <Text onPress={showChange} style={{ fontSize: 13, color: 'rgb(75,136,227)', fontFamily: 'PingFang-SC-Medium' }}>{`${btnText}`}</Text>
            </View>
            <TextInput placeholder='请输入支付宝用户ID' value={props.value} onChangeText={(value) => textChange(value)} style={{ paddingHorizontal: 15, paddingVertical: 0, height: 40, borderRadius: 5, borderColor: '#DDDFE5', borderWidth: 1 }} />
        </View>
    )
}

const AppendPart = (props) => {
    const [qrCode, setQrCode] = useState(Config.SERVICE_URL.aliUid);
    const [isShow, setIsShow] = useState(false);
    const textChange = (value) => {
        if (isShow) {
            setIsShow(false);
        }
        if (typeof props.textChange == 'function') {
            props.textChange(value)
        }
    }
    const makeQrCode = () => {
        let paramPart = `${SERVICE_URL.payment}?u=${props.value}&a=0.01`
        let url = `alipays://platformapi/startapp?appId=20000691&url=${encodeURIComponent(paramPart)}`;
        setQrCode(url);
        setIsShow(true);
    }
    return (
        <View style={{ paddingHorizontal: 15 }}>
            <View style={{ height: 43, width: Dimensions.get('window').width - 30, borderRadius: 5, backgroundColor: '#EDF3FC', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 13, fontFamily: 'PingFang-SC-Medium', color: 'rgb(75,136,227)' }}>说明:此操作关系到收款的安全性,请务必根据流程操作</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 15, width: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 7 }}>
                    <Text style={{ color: 'white' }}>1</Text>
                </LinearGradient>
                <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: 'PingFang-SC-Medium', color: 'rgb(40,46,60)' }}>用支付宝扫码二维码,获取用户ID</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, height: 120, width: 160, paddingHorizontal: 30 }}>
                <QRCode
                    value={Config.SERVICE_URL.aliUid}
                />
            </View>
            <View style={{ height: 40, width: Dimensions.get('window').width - 30, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                <TextInput placeholder='请输入支付宝用户ID' value={props.value} onChangeText={(value) => textChange(value)} style={{ marginLeft: 10, marginRight: 10, paddingHorizontal: 15, paddingVertical: 0, width: Dimensions.get('window').width - 55 - 94 - 10, height: 40, borderRadius: 5, borderColor: '#DDDFE5', borderWidth: 1 }} />
                <Btn.Linear
                    style={{ height: 40, width: 94, borderRadius: 5 }}
                    textStyle={{ color: 'white', textAlign: 'center', textAlignVertical: 'center', fontSize: 15 }}
                    btnPress={makeQrCode}
                    title='生成收款码'
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                <LinearGradient colors={['#6284E4', '#39DFB1']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 15, width: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 7 }}>
                    <Text style={{ color: 'white' }}>2</Text>
                </LinearGradient>
                <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: 'PingFang-SC-Medium', color: 'rgb(40,46,60)' }}>验证收款二维码</Text>
            </View>
            <Text style={{ marginTop: 10, marginLeft: 25, fontSize: 12, fontFamily: 'PingFang-SC-Medium', color: 'rgb(124,125,129)' }}>请用他人手机扫描下方二维码并支付0.01元,您将收到该款项</Text>
            <View style={{ position: 'relative', flexDirection: 'row', alignItems: 'center', paddingVertical: 10, height: 120, width: 160, paddingHorizontal: 30 }}>
                {!isShow &&
                    <View style={{ padding: 5, zIndex: 100, position: 'absolute', top: 45, left: 45, backgroundColor: '#858585', borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 10 }}>请输入</Text>
                        <Text style={{ color: 'white', fontSize: 10 }}>支付宝用户ID</Text>
                    </View>
                }
                <QRCode
                    value={qrCode}
                    color={isShow ? 'black' : '#858585'}
                />
            </View>
        </View>
    );
}

const UIDComponent = (props) => {
    const [isShow, setShow] = useState(false);
    const [UIDText, setUIDText] = useState('');

    const showCallback = (value) => {
        setShow(!value)
    }
    return (
        <View style={{ backgroundColor: 'white' }}>
            <UIDInput
                isShow={isShow}
                callback={showCallback}
                value={UIDText}
                textChange={(value) => setUIDText(value)}
            />
            {
                isShow &&
                <AppendPart
                    value={UIDText}
                    textChange={(value) => setUIDText(value)}
                />
            }
        </View>
    )
}

class AliPay extends Component {
    state = {
        accountName: '',
        account: '',
        uuid: '',
        accountNickName: '',
        url: '',
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
                <UIDComponent />
                {/* <ItemInput
                    isControl
                    title='支付宝uuid'
                    placeholder='请输入uuid'
                    value={this.state.uuid}
                    callback={this.stateUpdate('uuid')}
                /> */}
                <View style={{ height: 180, width: Dimensions.get('window').width, marginTop: 10, paddingBottom: 10, backgroundColor: 'white' }}>
                    <Text style={styles.uploadText}>上传收款二维码</Text>
                    <PhotoUpload
                        initValue={[{ size: -1, path: this.state.url, sourceURL: this.state.url }]}
                        ref={imageUpload => this.imageUpload = imageUpload}
                        maxPic={1}
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
            store.dispatch(boundry_change('中国', [100000]));
        })
    }

    stateUpdate = (key) => {
        return (value) => {
            this.setState({
                [key]: value
            });
        }
    }

    upload = async () => {
        if (this.state.auditStatus == 0) {
            Toast.show(this.state.auditStatusText);
            return;
        }
        let payload = {
            realName: this.state.accountName,
            alipayNo: this.state.account,
            //aliQrCode: this.state.url,
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
        let refStateData = this.imageUpload.state.imageSelectData;
        let qrCodeUrl = null
        if (refStateData[0].size > 0) {
            Toast.show('信息提交中，请勿进行其他操作');
            qrCodeUrl = await Api.imageUploadPromise(refStateData[0]);
            payload.aliQrCode = qrCodeUrl.data
        } else if (refStateData[0].size == 0) {
            Toast.show('请选择支付二维码');
            return;
        } else if (refStateData[0].size < 0) {
            payload.aliQrCode = refStateData[0].path
        }
        Api.aliPay(payload, () => {
            Toast.show('支付宝支付信息提交成功！')
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