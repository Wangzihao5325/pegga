import { Platform, AsyncStorage } from 'react-native';
import qs from 'qs';
import * as Config from '../global/Config';
import Variables from '../global/Variables';

class api {
    request(url, formData, onSuccess, onError, pagePayload) {
        let fullUrl = Config.SERVICE_URL.domain + url;
        let headers = Variables.account.token ?
            { 'Content-Type': url == '/api/user/sign_in' ? 'application/x-www-form-urlencoded' : 'application/json', 'X-Auth-Token': Variables.account.token } ://current size ['desc'] ['asc']
            { 'Content-Type': url == '/api/user/sign_in' ? 'application/x-www-form-urlencoded' : 'application/json' };
        if (pagePayload) {
            headers.current = pagePayload.current;
            headers.size = pagePayload.size;
        }
        let obj = formData ? { method: 'POST', headers: headers, body: formData } : { method: 'GET', headers: headers };
        fetch(fullUrl, obj)
            .then((response) => {
                if (response.headers.map['x-auth-token']) {
                    AsyncStorage.setItem('App_token', response.headers.map['x-auth-token']);
                    console.log(`token is ${response.headers.map['x-auth-token']}`);
                    Variables.account.token = response.headers.map['x-auth-token'];
                }
                return response.json()
            })
            .then((responseJson) => {
                const result = responseJson.data ? responseJson.data : null;
                const code = responseJson.code ? responseJson.code : null;
                const message = responseJson.message ? responseJson.message : null;
                if (responseJson.success) {
                    try {
                        onSuccess(result, code, message);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    onError ? onError(result, code, message, responseJson) : console.log(responseJson);
                }
            })
            .catch((error) => {
                console.log(error);
                console.log(url);
            });
    }
    //chat board
    sysChatMsg(onSuccess, onError) {
        const url = '/api/user/message/list';
        this.request(url, null, onSuccess, onError)
    }

    sendMsgToSys(payload, onSuccess, onError) {
        const url = '/api/user/message/send';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    //msg
    sendSignupMsg(phone, onSuccess, onError) {
        const url = '/api/user/sign_up/send_sms_opt';
        let payload = { phone };
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    sendMailSignupMsg(email, onSuccess, onError) {
        const url = '/api/user/sign_up/send_email_opt';
        let payload = { email };
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    sendForgotPwdMsg(phone, onSuccess, onError) {
        const url = '/api/user/sign_up/send_sms_forget';
        let payload = { phone };
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    sendChangePwdMsg(onSuccess, onError) {
        const url = '/api/user/code/phone_change_password';
        this.request(url, JSON.stringify({}), onSuccess, onError);
    }

    sendChangeAssetsPwdMsg(onSuccess, onError) {
        const url = '/api/user/code/phone_trade_password';
        this.request(url, JSON.stringify({}), onSuccess, onError);
    }

    sendMailBindMsg(email, onSuccess, onError) {
        const url = '/api/user/code/email_bind';
        let payload = { email };
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    sendPhoneBindMsg(phone, onSuccess, onError) {
        const url = '/api/user/code/phone_bind';
        let payload = { phone };
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    //user

    registerByPhone(payload, onSuccess, onError) {
        const url = '/api/user/sign_up/by_phone';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    registerByMail(payload, onSuccess, onError) {
        const url = '/api/user/sign_up/by_email';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    resetPassword(payload, onSuccess, onError) {
        const url = '/api/user/sign_up/forget_password';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    login(userName, password, onSuccess, onError) {
        const url = '/api/user/sign_in';
        let formData = { "username": userName, "password": password };
        let strForm = qs.stringify(formData);
        this.request(url, strForm, onSuccess, onError);
    }

    userInfo(onSuccess, onError) {
        const url = '/api/user/userInfo';
        this.request(url, null, onSuccess, onError);
    }

    bindMail(payload, onSuccess, onError) {
        const url = '/api/user/email';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    bindPhone(payload, onSuccess, onError) {
        const url = '/api/user/phone';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    assetsPwd(payload, onSuccess, onError) {
        const url = '/api/user/tradePassword';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    loginPwdUpdate(payload, onSuccess, onError) {
        const url = '/api/user/loginPassword/update';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    updateContact(payload, onSuccess, onError) {
        const url = '/api/user/contact';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    checkNickName(name, onSuccess, onError) {
        const url = `/api/user/nickName_check?nickName=${encodeURIComponent(name)}`;
        this.request(url, null, onSuccess, onError)
    }

    nickName(name, onSuccess, onError) {
        const url = '/api/user/nickName';
        let payload = { nickName: name };
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    payments(onSuccess, onError) {
        const url = '/api/user/payment/payments';
        this.request(url, null, onSuccess, onError);
    }

    aliPay(payload, onSuccess, onError) {
        const url = '/api/user/payment/alipay';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    bankCard(payload, onSuccess, onError) {
        const url = '/api/user/payment/bank';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    weChat(payload, onSuccess, onError) {
        const url = '/api/user/payment/weixin';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    identity(payload, onSuccess, onError) {
        const url = '/api/user/identity';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    otherUserInfoById(id, onSuccess, onError) {
        const url = `/api/user/userInfo/${id}`;
        this.request(url, null, onSuccess, onError);
    }

    //role
    bussinessApplyInfo(onSuccess, onError) {
        const url = '/api/user/role/dealers/applyInfo';
        this.request(url, null, onSuccess, onError);
    }

    bussinessUpgradeApplyInfo(onSuccess, onError) {
        const url = '/api/user/role/upgrade/applyInfo';
        this.request(url, null, onSuccess, onError);
    }

    userBusinessApply(onSuccess, onError) {
        const url = '/api/user/role/pending';
        this.request(url, null, onSuccess, onError);
    }

    dealerApply(payload, onSuccess, onError) {
        const url = '/api/user/role/dealers/apply';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    stapleApply(payload, onSuccess, onError) {
        const url = '/api/user/role/staple_dealers/apply';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    trustApply(payload, onSuccess, onError) {
        const url = '/api/user/role/trust_dealers/apply';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    trustStapleApply(payload, onSuccess, onError) {//信任大宗
        console.log('ssss');
        console.log(payload);
        const url = '/api/user/role/trust_staple/apply';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    downGrade(onSuccess, onError) {
        const url = '/api/user/role/downgrade/apply';
        this.request(url, JSON.stringify({}), onSuccess, onError);
    }

    activeBalanceInfo(onSuccess, onError) {
        const url = '/api/user/role/active_balance/info';
        this.request(url, null, onSuccess, onError);
    }

    drawBackActiveBalance(onSuccess, onError) {//退300块钱
        const url = '/api/user/role/active_balance_back/apply';
        this.request(url, JSON.stringify({}), onSuccess, onError);
    }

    //assets

    assetsDetail(onSuccess, onError) {
        const url = '/api/otc/asset/assets';
        this.request(url, null, onSuccess, onError);
    }

    moneyFlowList(payload, onSuccess, onError) {
        let payloadStr = qs.stringify({ ...payload, token: 'PQC' });
        const url = `/api/otc/bill/bills?${payloadStr}`;
        this.request(url, null, onSuccess, onError)
    }

    //otc

    iconRate(payload, onSuccess, onError) {
        let payloadStr = qs.stringify(payload);
        const url = `/api/otc/advertise/token_rate?${payloadStr}`;
        this.request(url, null, onSuccess, onError);
    }

    adSwich(isOpen, onSuccess, onError) {
        let payload = {
            open: isOpen
        };
        const url = '/api/otc/advrtise/switch';
        this.request(url, JSON.stringify(payload), onSuccess, onError);
    }

    adList(payload, onSuccess, onError, pagePayload) {//advertiseLevel token payTypes legalCoin
        let payloadStr = qs.stringify(payload);
        const url = `/api/otc/advertise/all?${payloadStr}`;
        this.request(url, null, onSuccess, onError, pagePayload);
    }

    myAd(payload, onSuccess, onError) {
        let payloadStr = qs.stringify(payload);
        const url = `/api/otc/advertise/advertises?${payloadStr}`;
        this.request(url, null, onSuccess, onError);
    }

    publishTobAdBuy(payload, onSuccess, onError) {
        const url = '/api/otc/advertise/buyToB';
        this.request(url, JSON.stringify(payload), onSuccess, onError)
    }

    publishTocAdBuy(payload, onSuccess, onError) {
        const url = '/api/otc/advertise/buyToC';
        this.request(url, JSON.stringify(payload), onSuccess, onError)
    }

    publishTobAdSell(payload, onSuccess, onError) {
        const url = '/api/otc/advertise/sellToB';
        this.request(url, JSON.stringify(payload), onSuccess, onError)
    }

    publishTocAdSell(payload, onSuccess, onError) {
        const url = '/api/otc/advertise/sellToC';
        this.request(url, JSON.stringify(payload), onSuccess, onError)
    }

    /*一键买入/卖出*/
    onceCall(payload, onSuccess, onError) {
        const url = '/api/otc/advertise/once_call';
        this.request(url, JSON.stringify(payload), onSuccess, onError)
    }

    cancelAd(no, onSuccess, onError) {
        let payload = { no };
        const url = `/api/otc/advertise/pull_off/${no}`;
        this.request(url, JSON.stringify(payload), onSuccess, onError)
    }

    modifyAd(payload, onSuccess, onError) {
        const url = '/api/otc/advertise/update';
        this.request(url, JSON.stringify(payload), onSuccess, onError)
    }

    adAutoFitter(onSuccess, onError) {
        const url = '/api/otc/advertise/switch';
        this.request(url, null, onSuccess, onError);
    }

    autoFitterSwichoff(onSuccess, onError) {
        const url = '/api/otc/advertise/switch_off';
        this.request(url, JSON.stringify({}), onSuccess, onError)
    }

    autoFitterSwichon(onSuccess, onError) {
        const url = '/api/otc/advertise/switch_on';
        this.request(url, JSON.stringify({}), onSuccess, onError)
    }

    newOrder(payload, onSuccess, onError) {//advertiseId amount legalAmount
        const url = '/api/otc/order/member_buy';
        this.request(url, JSON.stringify(payload), onSuccess, onError)
    }

    myOrder(payload, onSuccess, onError) {
        let payloadStr = qs.stringify(payload)
        const url = `/api/otc/order/orders?${payloadStr}`;
        this.request(url, null, onSuccess, onError);
    }

    queryOrderById(no, onSuccess, onError) {
        const url = `/api/otc/order/${no}`;
        this.request(url, null, onSuccess, onError);
    }

    cancelOrder(no, onSuccess, onError) {
        const url = '/api/otc/order/cancel_by_buyer';
        let paramsStr = JSON.stringify({ no });
        this.request(url, paramsStr, onSuccess, onError);
    }

    buyerConfirmOrder(no, payType, onSuccess, onError) {
        const url = '/api/otc/order/confirm_paid_by_buyer';
        let paramsStr = JSON.stringify({ no, payType });
        this.request(url, paramsStr, onSuccess, onError);
    }

    sellerConfirmOrder(no, onSuccess, onError) {
        const url = '/api/otc/order/confirm_paid_by_seller';
        let paramsStr = JSON.stringify({ no });
        this.request(url, paramsStr, onSuccess, onError);
    }

    appealBySource(payload, onSuccess, onError) {
        const url = '/api/otc/appeal/by_source';
        this.request(url, JSON.stringify(payload), onSuccess, onError)
    }

    appealByTarget(payload, onSuccess, onError) {
        const url = '/api/otc/appeal/by_target';
        this.request(url, JSON.stringify(payload), onSuccess, onError)
    }

    appealDetail(no, onSuccess, onError) {
        const url = `/api/otc/appeal/${no}`;
        this.request(url, null, onSuccess, onError);
    }

    imageUpload(dataObj, onSuccess, onError) {
        let fullUrl = 'http://192.168.3.144:4000/api/file/upload/image';

        let headers = { 'Content-Type': 'multipart/form-data' };

        let file = { uri: Platform.OS == 'ios' ? dataObj.sourceURL : dataObj.path, name: 'upload_image.jpg', type: dataObj.mime };
        let formData = new FormData();
        formData.append('file', file);

        let obj = { method: 'POST', headers: headers, body: formData };
        fetch(fullUrl, obj).then((response) => {
            return response.json()
        }).then((responseJson) => {
            if (typeof onSuccess == 'function') {
                onSuccess(responseJson)
            }
        }).catch(() => {
            if (typeof onError == 'function') {
                onError();
            }
        });
    }

    async imageUploadPromise(dataObj) {
        let fullUrl = 'http://192.168.3.144:4000/api/file/upload/image';

        let headers = { 'Content-Type': 'multipart/form-data' };

        let file = { uri: Platform.OS == 'ios' ? dataObj.sourceURL : dataObj.path, name: 'upload_image.jpg', type: dataObj.mime };
        let formData = new FormData();
        formData.append('file', file);
        let obj = { method: 'POST', headers: headers, body: formData };

        let response = await fetch(fullUrl, obj);
        let data = await response.json();
        return data;
    }

    // upload
    test(uri, onSuccess, onError) {
        let fullUrl = 'http://192.168.3.145:4008/file/upload_file';

        let headers = { 'Content-Type': 'multipart/form-data' };

        let file = { uri: uri, type: 'multipart/form-data' };
        let formData = new FormData();
        formData.append('file', file);

        let obj = { method: 'POST', headers: headers, body: formData };

        fetch(fullUrl, obj).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson)
        });
    }

    //news
    coin_news_global(onSuccess, onError) {
        let fullUrl = 'http://publicapi.niuyan.com/public/v1/coin/list?page=1&pagesize=20';
        fetch(fullUrl).then(response => response.json()).then(responseJson => {
            if (typeof onSuccess == 'function') {
                onSuccess(responseJson)
            }
        }).catch(() => {
            if (typeof onError == 'function') {
                onError();
            }
        });
    }

    flash_news(onSuccess, onError) {
        let fullUrl = 'http://publicapi.niuyan.com/public/v2/flash/list?pagesize=40';
        fetch(fullUrl).then(response => response.json()).then(responseJson => {
            if (typeof onSuccess == 'function') {
                onSuccess(responseJson)
            }
        }).catch(() => {
            if (typeof onError == 'function') {
                onError();
            }
        });
    }

    explore_news(onSuccess, onError) {
        let fullUrl = 'http://publicapi.niuyan.com/public/v2/news/list?pagesize=40';
        fetch(fullUrl).then(response => response.json()).then(responseJson => {
            if (typeof onSuccess == 'function') {
                onSuccess(responseJson)
            }
        }).catch(() => {
            if (typeof onError == 'function') {
                onError();
            }
        });
    }

}
export default new api();