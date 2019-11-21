import * as Types from '../actionTypes';
import Api from '../../socket';
import store from '../index';

export function user_login() {// userName userId uuid
    return { type: Types.USER_LOGIN };
}

export function user_info(result) {
    let trade = {
        roleId: result.roleId,
        firstTradeTime: result.firstTradeTime,
        orderAppealCount: result.orderAppealCount,
        orderAppealCountLastMonth: result.orderAppealCountLastMonth,
        orderFilledCount: result.orderFilledCount,
        orderFilledCountLastMonth: result.orderFilledCountLastMonth,
        orderWinAppealCount: result.orderWinAppealCount,
        orderWinAppealCountLastMonth: result.orderWinAppealCountLastMonth
    }

    let contact = {
        aliContact: result.aliContact ? result.aliContact : '',
        emailContact: result.emailContact ? result.emailContact : '',
        mobileContact: result.mobileContact ? result.mobileContact : '',
        otherContact: result.otherContact ? result.otherContact : '',
        qqContact: result.qqContact ? result.qqContact : '',
        telegramContact: result.telegramContact ? result.telegramContact : '',
        weixinContact: result.weixinContact ? result.weixinContact : ''
    }

    let state = {
        isBindingPay: result.isBindingPay,
        isContact: result.isContact,
        isEmailVerified: result.isEmailVerified,
        isGoogleVerified: result.isGoogleVerified,
        isSmsVerified: result.isSmsVerified,
        isTradePasswordSet: result.isTradePasswordSet,
        kyc: {
            kycAuditStatus: result.kycAuditStatus,
            kycLevel: result.kycLevel,
            kycReason: result.kycReason,
            realName: result.realName
        }
    }

    let info = {
        id: result.id,
        nickName: result.nickName ? result.nickName : '游客',
        signUpTime: result.signUpTime,
        uuid: result.uuid,
        bindPhone: result.bindPhone,
        bindEmail: result.bindEmail
    }

    let role = {// to b 角色信息
        roleChainName: result.roleChainName,
        roleName: result.roleName
    }

    let payload = {
        info,
        state,
        contact,
        trade,
        role
    };

    return { type: Types.USER_INFO, payload };
}

export function user_logout() {
    return { type: Types.USER_LOGOUT };
}

export function user_payment(result) {
    const { alipay, weixin, bank } = result;
    let passedPayment = [];
    if (alipay && alipay.auditStatus == 1) {
        passedPayment.push({ select: true, title: '支付宝', key: 'aliPay' });
    }
    if (weixin && weixin.auditStatus == 1) {
        passedPayment.push({ select: true, title: '微信', key: 'weChat' });
    }
    if (bank && bank.auditStatus == 1) {
        passedPayment.push({ select: true, title: '银行卡', key: 'bankCard' });
    }

    return { type: Types.USER_PAYMENT, payload: { alipay, weixin, bank, passedPayment } }
}

export function update_user_info() {
    Api.userInfo((result) => {
        store.dispatch(user_info(result));
    });
}

export function update_payment_info() {
    Api.payments((result, code, msg) => {
        store.dispatch(user_payment(result));
    })
}