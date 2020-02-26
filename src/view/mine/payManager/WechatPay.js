import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import store from '../../../store';
import { boundry_change } from '../../../store/actions/countryCodeAction';
import Toast from '../../../component/toast';
import Api from '../../../socket';
import ItemInput from '../ItemInput';
import PhotoUpload from '../../../component/photoUpload';
import Boundary from './boundary';
import Btn from '../../../component/btn';
import BoundryUtil from './boundary/boundryUtil';
import I18n from '../../../global/doc/i18n';

class WechatPay extends Component {
    state = {
        isFrozen: false,
        weixinId: null,
        accountName: '',
        account: '',
        weChatAlias: '',
        url: '',
        auditStatus: 1,
        auditStatusText: '',

        assetsPwd: '',

        wechat: null
    }

    static getDerivedStateFromProps(props, state) {
        if (props.wechat && state.wechat !== props.wechat) {
            let auditStatusText = '';
            if (props.wechat.auditStatus == 0) {
                auditStatusText = I18n.PAYMENT_CHECKING;
            } else if (props.wechat.auditStatus == 2) {
                auditStatusText = props.wechat.reason ? `您的身份审核申请被驳回，原因如下：${props.wechat.reason}` : I18n.PAYMENT_CHECK_FAILED;
            }
            let rangeType = BoundryUtil(props.wechat.provinceId, props.wechat.cityId)
            //修改bname bcode
            return {
                weixinId: props.wechat.weixinId ? props.wechat.weixinId : null,
                wechat: props.wechat,
                account: props.wechat.weixinNo,
                weChatAlias: props.wechat.weixinNick,
                url: props.wechat.weixinQrCode,
                accountName: props.wechat.realName,
                auditStatus: props.wechat.auditStatus,
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
                    title={I18n.IDENTITY_NAME}
                    placeholder={I18n.PLEASE_INPUT_PAY_NAME}
                    value={this.state.accountName}
                    callback={this.stateUpdate('accountName')}
                />
                <ItemInput
                    bottomLine
                    isControl
                    title={I18n.WECHAT_ACCOUNT}
                    placeholder={`${I18n.PLEASE_INPUT}${I18n.WECHAT_ACCOUNT}`}
                    value={this.state.account}
                    callback={this.stateUpdate('account')}
                />
                <ItemInput
                    isControl
                    title={I18n.WECHAT_NICKNAME}
                    placeholder={`${I18n.PLEASE_INPUT}${I18n.WECHAT_NICKNAME}`}
                    value={this.state.weChatAlias}
                    callback={this.stateUpdate('weChatAlias')}
                />
                <View style={{ height: 180, width: Dimensions.get('window').width, marginTop: 10, paddingBottom: 10, backgroundColor: 'white' }}>
                    <Text style={styles.uploadText}>{`${I18n.UPLOAD_QR_CODE}`}</Text>
                    <PhotoUpload
                        initValue={[{ size: -1, path: this.state.url, sourceURL: this.state.url }]}
                        ref={imageUpload => this.imageUpload = imageUpload}
                        maxPic={1} />
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
                    title={I18n.ASSETS_PWD}
                    placeholder={`${I18n.PLEASE_INPUT}${I18n.ASSETS_PWD}`}
                    value={this.state.assetsPwd}
                    callback={this.stateUpdate('assetsPwd')}
                />
                <Btn.StateLiner
                    isFrozen={this.state.isFrozen}
                    style={styles.btn}
                    textStyle={styles.btnText}
                    frozenTextStyle={styles.btnText}
                    title='确认添加'
                    frozenTitle='上传中'
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
            store.dispatch(boundry_change(I18n.CHINA, [100000]));
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
            weixinNo: this.state.account,
            //weixinQrCode: this.state.url,
            weixinNick: this.state.weChatAlias,
            tradePassword: this.state.assetsPwd,
        }
        if (this.state.weixinId) {
            payload.weixinId = this.state.weixinId;
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
            //Toast.show(I18n.INFO_SUBMITTING);
            this.setState({ isFrozen: true });
            qrCodeUrl = await Api.imageUploadPromise(refStateData[0]);
            payload.weixinQrCode = qrCodeUrl.data
        } else if (refStateData[0].size == 0) {
            Toast.show(I18n.PLS_SELECT_QR_CODE);
            return;
        } else if (refStateData[0].size < 0) {
            payload.weixinQrCode = refStateData[0].path
        }
        Api.weChat(payload, () => {
            Toast.show(I18n.INFO_SUBMIT_SUCCESS);
            this.setState({ isFrozen: false });
            this.props.navi.goBack();
        }, () => {
            this.setState({ isFrozen: false });
        })
    }
}

function mapState2Props(store) {
    return {
        bName: store.country.boundryName,
        bCode: store.country.boundryCode,
        //wechat: store.user.payment.weixin
    }
}

export default connect(mapState2Props)(WechatPay);

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