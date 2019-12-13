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
const EDIT = '编辑';
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
const PERSONAL = '个人中心';


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
const VER_CODE_SEND_TO = '验证码已发送至';

//payment
const RECEIVING_RANGE = '接单范围';
const MORE_DANGER = '(范围越大风险越大)';
const CITY_SCOPE = '市级';
const PROVINCE_SCOPE = '省级';
const UNLIMITED_SCOPE = '市级';
const SELECT_CITY = '选择城市';
const SELECT_PROVINEC = '选择省份';

//about us
const AGREEMENT = '用户协议';
const NEW_TUTORIAL = '新手教程';
const FAQ = '常见问题';

//personal
const NICK_NAME = '昵称';
const CONTACT = '联系方式';

//status
const IN_REVIEW = '审核中';
const NOT_APPROVED = '审核失败';
const NOT_CERTIFIED = '未认证';
const ALREADY_CERTIFIED = '已认证';
const VIDEO_CERTIFICATION = '视频认证';

const WECHAT = '微信号';
const ALIPAY = '支付宝';
const QQ = 'QQ';
const TG = 'Telegram';
const OTHER = '其他';

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
const IN_DEVELOPING = '暂未开放';

//code toast
const CODE_UNAUTHER = '未登录';
const CODE_INVALID_SESSION = '身份无效，请重新登陆';
const CODE_EXPIRED_SESSION = '身份已过期，请重新登陆';
const CODE_AUTHENTICATION_FAIL = '账号或密码错误';
const CODE_ILLEGAL_ARGUMENT = '非法参数';
const CODE_MQ_SEND_ERROR = '消息发送失败';
const CODE_MQ_CONSUMER_ERROR = '消息消费失败';
const CODE_INTERNAL_ERROR = '系统错误';
const CODE_FILE_EMPTY = '文件不能为空';
const CODE_ADVERTISE_EMPTY = '无广告';

const CODE_ADVERTISE_EMPTY2 = '广告不存在';
const CODE_MAX_PRICE_ERROR = '单笔最大成交额不能低于最小成交额';
const CODE_MAX_PRICE_AMOUNT_ERROR = '单笔最大成交额不能高于交易数量';
const CODE_NO_CONTACT = '请添加联系方式';
const CODE_NO_TRADE_PASSWORD = '请添加交易密码';
const CODE_NO_PAYMENT = '请添加交易方式';
const CODE_TRADE_PASSWORD_ERROR = '交易密码错误';
const CODE_NO_ALIPAY = '未配置支付宝收款方式';
const CODE_NO_WEIXIN = '未配置微信收款方式';
const CODE_NO_BANK = '未配置银行收款方式';
const CODE_NO_CLOUD = '未配置云闪付收款方式';
const CODE_NO_BALANCE = '可用余额不足';
const CODE_FROZEN_ERROR = '冻结用户资产失败';
const CODE_ADVERTISE_USER_ERROR = '无权操作此广告';
const CODE_ADVERTISE_ON_LINE = '广告未下架';
const CODE_REMAIN_AMOUNT_ERROR = '可用数量错误';
const CODE_ADVERTISE_OUT_OFF = '广告未上架';
const CODE_ADVERTISE_ONLINE_NOT_NULL = '你还有上架中的广告';
const CODE_ADVERTISE_AMOUNT_ERROR = '交易数量小于已经交易中的数量';
const CODE_ADVERTISE_VISITOR_ERROR = '请绑定收款方式或联系方式';
const CODE_ADVERTISE_ROLE_ERROR = '权限不足';
const CODE_ADVERTISE_AUTO_SWITCH_ON_PROCESSING = '自动接单开启中';
const CODE_ADVERTISE_AUTO_SWITCH_OFF_PROCESSING = '自动接单关闭中';
const CODE_FIXATION_PRICE_ERROR = '固定价格错误';
const CODE_FIXATION_PRICE_NULL = '未找到市场价';
const CODE_ADVERTISE_SWITCH_OPERATION_NOT_EXIST = '接单开关配置不存在, 请联系管理员';
const CODE_ADVERTISE_SWITCH_ALREADY_ON = '当前自动接单已开启,请先关闭';
const CODE_ADVERTISE_SWITCH_ALREADY_OFF = '当前自动接单已关闭，请先开启';
const CODE_ADVERTISE_SWITCH_OPERATION_INVALID = '接单状态错误';
const CODE_ADVERTISE_PRICE_TYPE_NOT_FIXATION_FOR_QUICK_DEAL = 'B端广告价格需要设成固定价格';
const CODE_ADVERTISE_ON_SHELF_MAX_COUNT = '上架广告数量已达上限';
const CODE_ADVERTISE_SWITCH_NOT_OFF = '当前自动接单未关闭，请先关闭';
const CODE_ADVERTISE_SIZE_EXCEEDED = '上架广告数量超过2个';
const CODE_MIN_PRICE_ERROR = '最小成交金额不能低于 100CNY';
const CODE_FIX_PRICE_SCOPE_NOT_EXIST = '未传固定价格范围配置参数';
const CODE_FIX_PRICE_SCOPE_NOT_SETTER = '后台缺少固定价格范围配置参数';
const CODE_FIX_PRICE_PARAM_NOT_MATCH_USER = '价格配置与当前用户不匹配';
const CODE_FIX_PRICE_PARAM_INVALID = '输入的价格配置参数错误';
const CODE_MIN_PRICE_AMOUNT_ERROR = '单笔最小成交额不能小于交易数量';
const CODE_USER_FROZEN_DEAL = '您的交易已经被冻结';

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
    EDIT,
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
    PERSONAL,

    UPDATE_CHECK,

    LOGIN_PWD,
    SET_LOGIN_PWD,
    SET_FUND_PWD,
    SET_GOOGLE_PWD,
    BIND_MOBILE_ACCOUNT,
    BIND_MAIL_ACCOUNT,
    INPUT_VER_CODE,
    NOT_RECEIVE_VER_CODE,
    VER_CODE_SEND_TO,

    RECEIVING_RANGE,
    MORE_DANGER,
    CITY_SCOPE,
    PROVINCE_SCOPE,
    UNLIMITED_SCOPE,
    SELECT_CITY,
    SELECT_PROVINEC,

    AGREEMENT,
    NEW_TUTORIAL,
    FAQ,

    NICK_NAME,
    CONTACT,

    IN_REVIEW,
    NOT_APPROVED,
    NOT_CERTIFIED,
    ALREADY_CERTIFIED,
    VIDEO_CERTIFICATION,

    WECHAT,
    ALIPAY,
    QQ,
    TG,
    OTHER,

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
    UPDATE_LOGIN_PWD_Failed,
    IN_DEVELOPING,

    CODE_UNAUTHER,
    CODE_INVALID_SESSION,
    CODE_EXPIRED_SESSION,
    CODE_AUTHENTICATION_FAIL,
    CODE_ILLEGAL_ARGUMENT,
    CODE_MQ_SEND_ERROR,
    CODE_MQ_CONSUMER_ERROR,
    CODE_INTERNAL_ERROR,
    CODE_FILE_EMPTY,
    CODE_ADVERTISE_EMPTY,

    CODE_ADVERTISE_EMPTY2,
    CODE_MAX_PRICE_ERROR,
    CODE_MAX_PRICE_AMOUNT_ERROR,
    CODE_NO_CONTACT,
    CODE_NO_TRADE_PASSWORD,
    CODE_NO_PAYMENT,
    CODE_TRADE_PASSWORD_ERROR,
    CODE_NO_ALIPAY,
    CODE_NO_WEIXIN,
    CODE_NO_BANK,
    CODE_NO_CLOUD,
    CODE_NO_BALANCE,
    CODE_FROZEN_ERROR,
    CODE_ADVERTISE_USER_ERROR,
    CODE_ADVERTISE_ON_LINE,
    CODE_REMAIN_AMOUNT_ERROR,
    CODE_ADVERTISE_OUT_OFF,
    CODE_ADVERTISE_ONLINE_NOT_NULL,
    CODE_ADVERTISE_AMOUNT_ERROR,
    CODE_ADVERTISE_VISITOR_ERROR,
    CODE_ADVERTISE_ROLE_ERROR,
    CODE_ADVERTISE_AUTO_SWITCH_ON_PROCESSING,
    CODE_ADVERTISE_AUTO_SWITCH_OFF_PROCESSING,
    CODE_FIXATION_PRICE_ERROR,
    CODE_FIXATION_PRICE_NULL,
    CODE_ADVERTISE_SWITCH_OPERATION_NOT_EXIST,
    CODE_ADVERTISE_SWITCH_ALREADY_ON,
    CODE_ADVERTISE_SWITCH_ALREADY_OFF,
    CODE_ADVERTISE_SWITCH_OPERATION_INVALID,
    CODE_ADVERTISE_PRICE_TYPE_NOT_FIXATION_FOR_QUICK_DEAL,
    CODE_ADVERTISE_ON_SHELF_MAX_COUNT,
    CODE_ADVERTISE_SWITCH_NOT_OFF,
    CODE_ADVERTISE_SIZE_EXCEEDED,
    CODE_MIN_PRICE_ERROR,
    CODE_FIX_PRICE_SCOPE_NOT_EXIST,
    CODE_FIX_PRICE_SCOPE_NOT_SETTER,
    CODE_FIX_PRICE_PARAM_NOT_MATCH_USER,
    CODE_FIX_PRICE_PARAM_INVALID,
    CODE_MIN_PRICE_AMOUNT_ERROR,
    CODE_USER_FROZEN_DEAL,
}