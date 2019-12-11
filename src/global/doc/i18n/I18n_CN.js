const LOGIN = '登录';
const LOGOUT = '退出';
const PLEASE_INPUT = '请输入';
const PLEASE_CONFIRM = '请确认';
const PHONE_NUM = '手机号码';
const MAIL_ACCOUNT = '邮箱账号';
const PASSWORD = '密码';
const EMAIL = '邮箱';
const SEND_MSG = '发送验证码';
const RESEND = '重新发送';
const GOOGLE_PWD = 'google验证码';
const SUBMIT = '提交';
const OLD_PWD = '旧密码';
const ASSETS = '资金';
const CHINA = '中国';

//tab bottom
const TAB_BTM_MARKRT = '交易';
const TAB_BTM_ASSETS = '资产';
const TAB_BTM_DISCOVER = '发现';
const TAB_BTM_ME = '我的';

//OTC
const CYN = '人民币';
const CYN_AREA = `${CYN}区`;
const BUY = '买';
const SELL = '卖';
const BUY_IN = `${BUY}入`;
const SELL_OUT = `${SELL}出`;
const WANNA_BUY = `我要${BUY}`;
const WANNA_SELL = `我要${SELL}`;
const BUY_PRICE = `${BUY_IN}价格`;
const SELL_PRICE = `${SELL_OUT}价格`;
const LEFT_SELL = '剩余可卖';
const LEFT_BUY = '剩余可买';

const ORDER_CENTER = '订单中心';
const AD_MANAGEMENT = '广告管理';
const ISSUE_AD = '发布广告';

const AMOUNT = '数量';
const LIMIT = '限额';
const MEMO = '备注';
const TRANS_RATE = '成交率';

const TRADE_LIMIT = '交易限额';
const PAYMENT_METHOD = '付款方式';

const SELLER_MEMO = '卖家备注';
const BUYER_MEMO = '买家备注';
const ALL_IN_SELL = '全部买入';
const ALL_IN_BUY = '全部卖出';
const BUY_RIGHT_NOW = '立即买入';
const SELL_RIGHT_NOW = '立即卖出';

//otc-add ad //Select transaction currency
const TRANSACTION_OBJECT = '交易对象';
const TRANSACTION_CURRENCY = '选择交易币种';
const CURRENCY_UNIT = '选择法币单位';
const PRICE_TYPE = '价格类型';
const PRICE = '价格';
const PRICE_INPUT_PLACEHOLDER = '请输入价格';
const AMT = '交易数量';
const AMT_INPUT_PLACEHOLDER = '请输入数量';

//mine
const SAFETY_CENTER = '安全中心';
const IDENTITY_AUTH = '身份认证';
const PAYMENT_MANAGEMENT = '支付方式管理';
const MERCHANT_CERTIFICATION = '商家认证';
const HELP_CENTER = '帮助中心';
const ABOUT_US = '关于我们';
const SETTINGS = '设置';

//settings
const UPDATE_CHECK = '检查更新';

//safety center
const LOGIN_PWD = '登录密码';
const SET_LOGIN_PWD = '登录密码设置';
const SET_FUND_PWD = '资金密码设置';
const SET_GOOGLE_PWD = '谷歌验证码设置';
const BIND_MOBILE_ACCOUNT = '绑定手机号';
const BIND_MAIL_ACCOUNT = '绑定邮箱号';
const INPUT_VER_CODE = '输入验证码';
const NOT_RECEIVE_VER_CODE = '没有收到验证码?';

//payment
const RECEIVING_RANGE = '接单范围';
const MORE_DANGER = '(范围越大风险越大)';
const CITY_SCOPE = '市级';
const PROVINCE_SCOPE = '省级';
const UNLIMITED_SCOPE = '市级';
const SELECT_CITY = '选择城市';
const SELECT_PROVINEC = '选择省份';

//status
const IN_REVIEW = '审核中';
const NOT_APPROVED = '审核失败';
const NOT_CERTIFIED = '未认证';
const ALREADY_CERTIFIED = '已认证';
const VIDEO_CERTIFICATION = '视频认证';

//toast
const IN_REVIEW_BE_PATIENT = '信息审核中,请耐心等待';
const HAVE_BEEN_AUTHER = '您已进行过身份认证';
const HAVE_BEENN_BIND_MOBILE = '您已经绑定过手机号,无需再次绑定!';
const HAVE_BEENN_BIND_MAIL = '您已经绑定过邮箱,无需再次绑定!';
const NOW_THE_LAST_VERSION = '当前已经是最新版本';
const BIND_PHONE_ACCOUNT_FIRST = '请先绑定手机号!';
const SEND_MOBILE_MSG_FAILED = '发送验证码失败';
const RESEND_VER_CODE = '已重新发送验证码';
const SEND_VER_CODE_MANY_TIMES = '发送验证码过于频繁，请稍后再尝试';
const BIND_SUCCESS = '绑定成功';
const BIND_FAILED = '绑定失败';
const PWD_SHORT = '密码过短，请至少输入8位密码';
const PWD_INCONSISTENT = '密码不一致，请进行确认';
const SET_ASSETS_PWD_SUCCESS = '设置资金密码成功!';
const SET_ASSETS_PWD_Failed = '设置资金密码失败!';
const UPDATE_LOGIN_PWD_SUCCESS = '更新登陆密码成功!';
const UPDATE_LOGIN_PWD_Failed = '更新登陆密码失败!';

export default {
    LOGIN,
    LOGOUT,
    PLEASE_INPUT,
    PLEASE_CONFIRM,
    PHONE_NUM,
    MAIL_ACCOUNT,
    PASSWORD,
    EMAIL,
    SEND_MSG,
    RESEND,
    GOOGLE_PWD,
    SUBMIT,
    OLD_PWD,
    ASSETS,
    CHINA,

    //tab btm navi
    TAB_BTM_MARKRT,
    TAB_BTM_ASSETS,
    TAB_BTM_DISCOVER,
    TAB_BTM_ME,

    //OTC
    CYN,
    CYN_AREA,
    BUY,
    SELL,
    BUY_IN,
    SELL_OUT,
    WANNA_BUY,
    WANNA_SELL,
    BUY_PRICE,
    SELL_PRICE,
    LEFT_BUY,
    LEFT_SELL,

    ORDER_CENTER,
    AD_MANAGEMENT,
    ISSUE_AD,

    AMOUNT,
    LIMIT,
    MEMO,
    TRANS_RATE,

    TRADE_LIMIT,
    PAYMENT_METHOD,

    SELLER_MEMO,
    BUYER_MEMO,
    ALL_IN_SELL,
    ALL_IN_BUY,
    BUY_RIGHT_NOW,
    SELL_RIGHT_NOW,

    TRANSACTION_OBJECT,
    TRANSACTION_CURRENCY,
    CURRENCY_UNIT,
    PRICE_TYPE,
    PRICE,
    PRICE_INPUT_PLACEHOLDER,
    AMT,
    AMT_INPUT_PLACEHOLDER,

    SAFETY_CENTER,
    IDENTITY_AUTH,
    PAYMENT_MANAGEMENT,
    MERCHANT_CERTIFICATION,
    HELP_CENTER,
    ABOUT_US,
    SETTINGS,

    UPDATE_CHECK,

    LOGIN_PWD,
    SET_LOGIN_PWD,
    SET_FUND_PWD,
    SET_GOOGLE_PWD,
    BIND_MOBILE_ACCOUNT,
    BIND_MAIL_ACCOUNT,
    INPUT_VER_CODE,
    NOT_RECEIVE_VER_CODE,

    RECEIVING_RANGE,
    MORE_DANGER,
    CITY_SCOPE,
    PROVINCE_SCOPE,
    UNLIMITED_SCOPE,
    SELECT_CITY,
    SELECT_PROVINEC,

    IN_REVIEW,
    NOT_APPROVED,
    NOT_CERTIFIED,
    ALREADY_CERTIFIED,
    VIDEO_CERTIFICATION,

    IN_REVIEW_BE_PATIENT,
    HAVE_BEEN_AUTHER,
    HAVE_BEENN_BIND_MAIL,
    HAVE_BEENN_BIND_MOBILE,
    NOW_THE_LAST_VERSION,
    BIND_PHONE_ACCOUNT_FIRST,
    SEND_MOBILE_MSG_FAILED,
    RESEND_VER_CODE,
    SEND_VER_CODE_MANY_TIMES,
    BIND_SUCCESS,
    BIND_FAILED,
    PWD_SHORT,
    PWD_INCONSISTENT,
    SET_ASSETS_PWD_SUCCESS,
    SET_ASSETS_PWD_Failed,
    UPDATE_LOGIN_PWD_SUCCESS,
    UPDATE_LOGIN_PWD_Failed
}