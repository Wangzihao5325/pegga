import I18n from '../global/doc/i18n';
const ErrorCodeToast = (code) => {
    let toastStr = '';
    switch (code) {
        case 10001:
            toastStr = I18n.CODE_UNAUTHER;
            break;
        case 10002:
            toastStr = I18n.CODE_INVALID_SESSION;
            break;
        case 10003:
            toastStr = I18n.CODE_EXPIRED_SESSION;
            break;
        case 10004:
            toastStr = I18n.CODE_AUTHENTICATION_FAIL;
            break;
        case 10005:
            toastStr = I18n.CODE_ILLEGAL_ARGUMENT;
            break;
        case 10006:
            toastStr = I18n.CODE_MQ_SEND_ERROR;
            break;
        case 10007:
            toastStr = I18n.CODE_MQ_CONSUMER_ERROR;
            break;
        case 10009:
            toastStr = I18n.CODE_INTERNAL_ERROR;
            break;
        case 10010:
            toastStr = I18n.CODE_FILE_EMPTY;
            break;
        case 10012:
            toastStr = I18n.SERVER_BUSY;
            break;
        case 20001:
            toastStr = I18n.CODE_ADVERTISE_EMPTY;
            break;

        case 40001:
            toastStr = I18n.CODE_ADVERTISE_EMPTY2;
            break;
        case 40002:
            toastStr = I18n.CODE_MAX_PRICE_ERROR;
            break;
        case 40003:
            toastStr = I18n.CODE_MAX_PRICE_AMOUNT_ERROR;
            break;
        case 40004:
            toastStr = I18n.CODE_NO_CONTACT;
            break;
        case 40005:
            toastStr = I18n.CODE_NO_TRADE_PASSWORD;
            break;
        case 40006:
            toastStr = I18n.CODE_NO_PAYMENT;
            break;
        case 40007:
            toastStr = I18n.CODE_TRADE_PASSWORD_ERROR;
            break;
        case 40008:
            toastStr = I18n.CODE_NO_ALIPAY;
            break;
        case 40009:
            toastStr = I18n.CODE_NO_WEIXIN;
            break;
        case 40010:
            toastStr = I18n.CODE_NO_BANK;
            break;
        case 40011:
            toastStr = I18n.CODE_NO_CLOUD;
            break;
        case 40012:
            toastStr = I18n.CODE_NO_BALANCE;
            break;
        case 40013:
            toastStr = I18n.CODE_FROZEN_ERROR;
            break;
        case 40014:
            toastStr = I18n.CODE_ADVERTISE_USER_ERROR;
            break;
        case 40015:
            toastStr = I18n.CODE_ADVERTISE_ON_LINE;
            break;
        case 40016:
            toastStr = I18n.CODE_REMAIN_AMOUNT_ERROR;
            break;
        case 40017:
            toastStr = I18n.CODE_ADVERTISE_OUT_OFF;
            break;
        case 40018:
            toastStr = I18n.CODE_ADVERTISE_ONLINE_NOT_NULL;
            break;
        case 40019:
            toastStr = I18n.CODE_ADVERTISE_AMOUNT_ERROR;
            break;
        case 40020:
            toastStr = I18n.CODE_ADVERTISE_VISITOR_ERROR;
            break;
        case 40021:
            toastStr = I18n.CODE_ADVERTISE_ROLE_ERROR;
            break;
        case 40022:
            toastStr = I18n.CODE_ADVERTISE_AUTO_SWITCH_ON_PROCESSING;
            break;
        case 40023:
            toastStr = I18n.CODE_ADVERTISE_AUTO_SWITCH_OFF_PROCESSING;
            break;
        case 40024:
            toastStr = I18n.CODE_FIXATION_PRICE_ERROR;
            break;
        case 40025:
            toastStr = I18n.CODE_FIXATION_PRICE_NULL;
            break;
        case 40026:
            toastStr = I18n.CODE_ADVERTISE_SWITCH_OPERATION_NOT_EXIST;
            break;
        case 40027:
            toastStr = I18n.CODE_ADVERTISE_SWITCH_ALREADY_ON;
            break;
        case 40028:
            toastStr = I18n.CODE_ADVERTISE_SWITCH_ALREADY_OFF;
            break;
        case 40029:
            toastStr = I18n.CODE_ADVERTISE_SWITCH_OPERATION_INVALID;
            break;
        case 40030:
            toastStr = I18n.CODE_ADVERTISE_PRICE_TYPE_NOT_FIXATION_FOR_QUICK_DEAL;
            break;
        case 40031:
            toastStr = I18n.CODE_ADVERTISE_ON_SHELF_MAX_COUNT;
            break;
        case 40032:
            toastStr = I18n.CODE_ADVERTISE_SWITCH_NOT_OFF;
            break;
        case 40033:
            toastStr = I18n.CODE_ADVERTISE_SIZE_EXCEEDED;
            break;
        case 40034:
            toastStr = I18n.CODE_MIN_PRICE_ERROR;
            break;
        case 40035:
            toastStr = I18n.CODE_FIX_PRICE_SCOPE_NOT_EXIST;
            break;
        case 40036:
            toastStr = I18n.CODE_FIX_PRICE_SCOPE_NOT_SETTER;
            break;
        case 40037:
            toastStr = I18n.CODE_FIX_PRICE_PARAM_NOT_MATCH_USER;
            break;
        case 40038:
            toastStr = I18n.CODE_FIX_PRICE_PARAM_INVALID;
            break;
        case 40039:
            toastStr = I18n.CODE_MIN_PRICE_AMOUNT_ERROR;
            break;
        case 40040:
            toastStr = I18n.CODE_USER_FROZEN_DEAL;
            break;

        case 50001:
            toastStr = I18n.CODE_ADVERTISE_EMPTY3;
            break;
        case 50002:
            toastStr = I18n.CODE_ADVERTISE_USER_ERROR2;
            break;
        case 50003:
            toastStr = I18n.CODE_ADVERTISE_NOT_ONLINE;
            break;
        case 50004:
            toastStr = I18n.CODE_ERROR_PRICE;
            break;
        case 50005:
            toastStr = I18n.CODE_REMAIN_AMOUNT_ERROR2;
            break;
        case 50006:
            toastStr = I18n.CODE_ERROR_PAY_TYPE;
            break;
        case 50007:
            toastStr = I18n.CODE_ERROR_BALANCE;
            break;
        case 50008:
            toastStr = I18n.CODE_FROZEN_BALANCE_ERROR;
            break;
        case 50009:
            toastStr = I18n.CODE_DEAL_ERROR;
            break;
        case 50010:
            toastStr = I18n.CODE_NO_ORDER;
            break;
        case 50011:
            toastStr = I18n.CODE_NOT_USER_ORDER;
            break;
        case 50012:
            toastStr = I18n.ORDER_STATUS_ERROR;
            break;
        case 50013:
            toastStr = I18n.CODE_REDUCE_ADVERTISE_ERROR;
            break;
        case 50014:
            toastStr = I18n.CODE_TRANSFER_ERROR;
            break;
        case 50015:
            toastStr = I18n.CODE_MATCH_ORDER_CANCEL_ERROR;
            break;
        case 50016:
            toastStr = I18n.CODE_THAW_ASSETS;
            break;
        case 50017:
            toastStr = I18n.CODE_ORDER_CANCELED;
            break;
        case 50018:
            toastStr = I18n.CODE_ORDER_COMPLETED;
            break;
        case 50019:
            toastStr = I18n.CODE_ORDER_APPEAL;
            break;
        case 50020:
            toastStr = I18n.CODE_APPEAL_NULL;
            break;
        case 50021:
            toastStr = I18n.CODE_APPEAL_DEAL;
            break;
        case 50022:
            toastStr = I18n.CODE_APPEAL_TARGET_ERROR;
            break;
        case 50023:
            toastStr = I18n.CODE_APPEAL_PIC_MORE;
            break;
        case 50024:
            toastStr = I18n.CODE_PAY_TYPE_ERROR;
            break;
        case 50025:
            toastStr = I18n.CODE_PAY_TYPE_NOT_BIND;
            break;
        case 50026:
            toastStr = I18n.CODE_ADVERTISE_NO_PAY_TYPE;
            break;
        case 50027:
            toastStr = I18n.CODE_SUBSIDY_TRANSFER_ERROR;
            break;
        case 50028:
            toastStr = I18n.CODE_DEDUCT_FEE_ERROR;
            break;
        case 50029:
            toastStr = I18n.CODE_ORDER_PAYMENT_ERROR;
            break;
        case 50030:
            toastStr = I18n.CODE_ORDER_CANCEL_NUM_ERROR;
            break;
        case 50031:
            toastStr = I18n.CODE_ORDER_APPEAL_END;
            break;
        case 50032:
            toastStr = I18n.CODE_BACK_ACTIVE_BALANCE_ERROR;
            break;
        case 50033:
            toastStr = I18n.CODE_EXCEED_MAX_LIMIT;
            break;
        case 50034:
            toastStr = I18n.CODE_ORDER_PAYMENT_NULL;
            break;
        case 50035:
            toastStr = I18n.CODE_ORDER_PAYMENT_PASS;
            break;
        case 50036:
            toastStr = I18n.CODE_ORDER_PAYMENT_CANCEL;
            break;
        case 50037:
            toastStr = I18n.CODE_ORDER_AUTH_ERROR;
            break;
        case 50038:
            toastStr = I18n.CODE_ADVERTISE_TYPE_ERROR;
            break;
        case 50039:
            toastStr = I18n.CODE_ADVERTISE_ORIGIN_ERROR;
            break;
        case 50040:
            toastStr = I18n.CODE_HAS_ORDER_NOT_PASS;
            break;
        case 50041:
            toastStr = I18n.CODE_EXCEED_MIN_LIMIT;
            break;
        case 50042:
            toastStr = I18n.CODE_ORDER_MATCH_FAILED;
            break;
        case 50043:
            toastStr = I18n.CODE_UTSD_NO_APPEAL;
            break;
        case 50044:
            toastStr = I18n.CODE_PRICE_IS_NULL;
            break;
        case 50045:
            toastStr = I18n.CODE_FEE_IS_NULL;
            break;
        case 50046:
            toastStr = I18n.CODE_NOT_ALLOW_APPEAL;
            break;
        case 50047:
            toastStr = I18n.CODE_USDT_IS_NULL;
            break;
        case 50048:
            toastStr = I18n.CODE_PAY_TYPE_NOT_CHOOSE;
            break;
        case 50055:
            toastStr = I18n.VISITOR_ERROR;
            break;
        case 30001:
            toastStr = I18n.CODE_TRADE_PASSWORD_ERROR_LOCK;
            break;
        case 30002:
            toastStr = I18n.CODE_TRADE_PASSWORD_LOCK;
            break;
        case 30003:
            toastStr = I18n.CODE_USER_READY_IDENTITY;
            break;
        case 30004:
            toastStr = I18n.CODE_USER_NORMAL_DEALERS;
            break;
        case 30005:
            toastStr = I18n.CODE_FROZEN_USER_DEPOSIT;
            break;
        case 30006:
            toastStr = I18n.CODE_WAIT_AUDIT;
            break;
        case 30007:
            toastStr = I18n.CODE_PASS_AUDIT;
            break;
        case 30008:
            toastStr = I18n.CODE_TRADE_PASSWORD_ERROR2;
            break;
        case 30010:
            toastStr = I18n.CODE_NO_USER;
            break;
        case 30011:
            toastStr = I18n.CODE_TOW_PASSWORD_ERROR;
            break;
        case 30012:
            toastStr = I18n.CODE_NICK_NAME_ALREADY;
            break;
        case 30013:
            toastStr = I18n.CODE_BIND_PHONE;
            break;
        case 30014:
            toastStr = I18n.CODE_PHONE_HAS_BE_BIND;
            break;
        case 30015:
            toastStr = I18n.CODE_EMAIL_NULL;
            break;
        case 30016:
            toastStr = I18n.CODE_LOGIN_PASSWORD_ERROR;
            break;
        case 30017:
            toastStr = I18n.CODE_OLD_PASSWORD_NULL;
            break;
        case 30018:
            toastStr = I18n.CODE_BIND_EMAIL;
            break;
        case 30019:
            toastStr = I18n.CODE_EMAIL_HAS_BE_BIND;
            break;
        case 30020:
            toastStr = I18n.CODE_USER_NORMAL_DEALERS_ERROR;
            break;
        case 30021:
            toastStr = I18n.CODE_VERIFY_CODE_ERROR;
            break;
        case 30022:
            toastStr = I18n.CODE_MOBILE_WEIXIN_ERROR;
            break;
        case 30023:
            toastStr = I18n.CODE_TRUST_ERROR;
            break;
        case 30024:
            toastStr = I18n.CODE_USER_APPLY_NULL;
            break;
        case 30025:
            toastStr = I18n.CODE_NICK_NAME;
            break;
        case 30026:
            toastStr = I18n.CODE_EXIST_ONLINE_ADVERTISE;
            break;
        case 30027:
            toastStr = I18n.CODE_EXIST_EXITING_ORDER;
            break;
        case 30028:
            toastStr = I18n.CODE_COUNTRY_ID_NULL;
            break;
        case 30029:
            toastStr = I18n.CODE_COUNTRY_NOT_EXIT;
            break;
        case 30030:
            toastStr = I18n.CODE_PROVINCE_NOT_EXIT;
            break;
        case 30031:
            toastStr = I18n.CODE_PROVINCE_ERROR;
            break;
        case 30032:
            toastStr = I18n.CODE_CITY_NOT_EXIT;
            break;
        case 30033:
            toastStr = I18n.CODE_CITY_ERROR;
            break;
        case 30034:
            toastStr = I18n.CODE_DEPOSIT_ERROR;
            break;
        case 30035:
            toastStr = I18n.CODE_INVITE_CODE_ERROR;
            break;
        case 30036:
            toastStr = I18n.CODE_USER_TRUST_DEALERS_ERROR;
            break;
        case 30037:
            toastStr = I18n.CODE_USER_TRUST_STAPLE_ERROR;
            break;
        case 30038:
            toastStr = I18n.CODE_USER_UPGRADE_DEALERS_NULL;
            break;
        case 30040:
            toastStr = I18n.CODE_ACTIVE_BALANCE_BACK;
            break;
        case 30041:
            toastStr = I18n.CODE_COMPLETE_ORDER_NOT_ENOUGH;
            break;
        case 30042:
            toastStr = I18n.CODE_UPGRADE_APPLY_NULL;
            break;
        case 31043:
            toastStr = I18n.CODE_JUNIOR_ERROR;
            break;
        case 30043:
            toastStr = I18n.CODE_USER_REBATE_SUBSIDY_NULL;
            break;
        case 30044:
            toastStr = I18n.CODE_USER_ROLE_DIFFERENT;
            break;
        case 30045:
            toastStr = I18n.CODE_RATE_LESS;
            break;
        case 30046:
            toastStr = I18n.CODE_RATE_MORE;
            break;
        case 30047:
            toastStr = I18n.CODE_RATE_HAS_EXIST;
            break;
        case 30048:
            toastStr = I18n.CODE_NO_BIND_PHONE;
            break;
        case 30049:
            toastStr = I18n.CODE_PHONE_HAS_BIND;
            break;
        case 30050:
            toastStr = I18n.CODE_PHONE_USER_NULL;
            break;
        case 30051:
            toastStr = I18n.CODE_ALIPAY_UUID_NOT_EXIST;
            break;
        case 30052:
            toastStr = I18n.CODE_PHONE_ERROR;
            break;
        case 30053:
            toastStr = I18n.CODE_ID_NUMBER_ERROR;
            break;
        case 30054:
            toastStr = I18n.CODE_BACK_CARD_ERROR;
            break;
        case 30055:
            toastStr = I18n.CODE_NO_TRADE_PASSWORD2;
            break;
        case 30056:
            toastStr = I18n.CODE_USER_ACTIVE_ERROR;
            break;
        case 31000:
            toastStr = I18n.CODE_ERROR;
            break;
        case 9001:
            toastStr = I18n.CODE_USER_NOT_EXIST;
            break;
        case 9002:
            toastStr = I18n.CODE_SIGN_IN_CHANNEL_NOT_EXIST;
            break;
        case 9003:
            toastStr = I18n.CODE_PAY_TYPE_IS_EXIST;
            break;
        case 60001:
            toastStr = I18n.CODE_NO_BALANCE2;
            break;
        case 60002:
            toastStr = I18n.CODE_BACK_DEPOSIT_ERROR;
            break;
        case 60003:
            toastStr = I18n.CODE_BACK_ACTIVE_BALANCE_ERROR2;
            break;
        case 60004:
            toastStr = I18n.CODE_BACK_ACTIVE_BALANCE_ALREADY;
            break;
        case 70001:
            toastStr = I18n.CODE_IMAGE_ERROR;
            break;
        case 70002:
            toastStr = I18n.CODE_FILE_EMPTY2;
            break;
        case 6001:
            toastStr = I18n.CODE_INVALID_MATCH_AREA;
            break;
        case 6002:
            toastStr = I18n.CODE_NO_ORDER_TO_MATCH;
            break;
        case 6999:
            toastStr = I18n.CODE_MATCH_ERROR;
            break;
        case 6010:
            toastStr = I18n.CODE_APP_ID_NOT_EXIST;
            break;
        case 81001:
            toastStr = I18n.PRICE_NOT_NULL;
            break;
        case 81002:
            toastStr = I18n.TOKEN_NOT_NULL;
            break;
        case 81003:
            toastStr = I18n.FIAT_NOT_NULL;
            break;
        case 81004:
            toastStr = I18n.PRICE_TYPE_NOT_NULL;
            break;
        case 81005:
            toastStr = I18n.AMOUNT_NOT_NULL;
            break;
        case 81006:
            toastStr = I18n.MIN_LIMIT_NOT_NULL;
            break;
        case 81007:
            toastStr = I18n.MIN_LIMIT_MIN;
            break;
        case 81008:
            toastStr = I18n.MAX_LIMIT_NOT_NULL;
            break;
        case 81009:
            toastStr = I18n.MAX_LIMIT_MIN;
            break;
        case 81010:
            toastStr = I18n.PAY_TYPE_NOT_NULL;
            break;
        case 81011:
            toastStr = I18n.TRADE_PASSWORD_NOT_NULL;
            break;
        case 81012:
            toastStr = I18n.ADVERTISE_ID_NOT_NULL;
            break;
        case 81013:
            toastStr = I18n.ORDER_ID_NOT_NULL;
            break;
        case 81014:
            toastStr = I18n.APPEAL_TYPE_NOT_NULL;
            break;
        case 81015:
            toastStr = I18n.APPEAL_REASON_NOT_NULL;
            break;
        case 81016:
            toastStr = I18n.LEGAL_AMOUNT_NOT_NULL;
            break;
        case 81017:
            toastStr = I18n.PAY_VOUCHER_NOT_NULL;
            break;
        case 81000:
            toastStr = I18n.PARAMETER_ERROR;
            break;
        default:
            toastStr = I18n.UNKNOW_ERROR;
            break;
    }
    return toastStr;
}

export default ErrorCodeToast;