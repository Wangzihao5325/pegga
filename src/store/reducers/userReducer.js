import * as Types from '../actionTypes';
/**
 * 字段含义文档
 * http://192.168.3.144:4000/api/user/swagger-ui.html
 * userInfo接口
 */
const initialState = {
    isLogin: false,
    info: {
        id: '',
        nickName: '',
        signUpTime: '',
        uuid: '',
        bindPhone: '',
        bindEmail: ''
    },
    state: {
        isBindingPay: false,
        isContact: false,
        isEmailVerified: false,
        isGoogleVerified: false,
        isSmsVerified: false,
        isTradePasswordSet: false,
        kyc: {
            kycAuditStatus: 0,
            kycLevel: 0,
            kycReason: '',
            realName: ''
        }
    },
    contact: {
        aliContact: '',
        emailContact: '',
        mobileContact: '',
        otherContact: '',
        qqContact: '',
        telegramContact: '',
        weixinContact: ''
    },
    trade: {
        roleId: 0,
        firstTradeTime: '',
        orderAppealCount: 0,
        orderAppealCountLastMonth: 0,
        orderFilledCount: 0,
        orderFilledCountLastMonth: 0,
        orderWinAppealCount: 0,
        orderWinAppealCountLastMonth: 0
    },
    role: {// to b 角色信息
        roleChainName: '普通用户',
        roleName: 'ROLE_VISITOR',
        trustStaple: false
    },
    payment: {
        passedPayment: [],
        alipay: null,
        /*
        {
            alipayNick: '',
            alipayNo: '',
            alipayUuid: '',
            aliQrCode: '',
            auditStatus: '',
            commonStatus: '',
            countryId: '',
            provinceId: '',
            cityId: '',
            reason:'',
            realName:''
        }
        */
        weixin: null,
        /*
        {
            weixinNick: '',
            weixinNo: '',
            weixinQrCode: '',
            auditStatus: '',
            commonStatus: '',
            countryId: '',
            provinceId: '',
            cityId: '',
            reason:'',
            realName:''
        }
        */
        bank: null,
        /*
        {
            bank: '',
            bankBranch: '',
            bankCard: '',
            auditStatus: '',
            commonStatus: '',
            dailyAmount: '',
            reason:'',
            realName:''
        }
        */
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.USER_LOGIN:
            return {
                ...state,
                isLogin: true
            };
        case Types.USER_INFO:
            return {
                ...state,
                ...action.payload
            };
        case Types.USER_PAYMENT:
            return {
                ...state,
                payment: action.payload
            }
        case Types.USER_LOGOUT:
            return {
                ...initialState
            };
        default: return state;
    }
};
export default reducer;