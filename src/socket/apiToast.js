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
    }
}