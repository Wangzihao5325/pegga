const BILL_TYPE = [{ key: 0, alias: '全部' }, { key: 1, alias: '收入' }, { key: 2, alias: '支出' }];
const BILL_TIME_TYPE = [{ key: 0, alias: '7日' }, { key: 1, alias: '月度' }];
const BUSINESS_ROLE =
    [
        { key: 'ROLE_VISITOR', alias: '游客' },
        { key: 'ROLE_NORMAL', alias: '普通用户' },
        { key: 'ROLE_DEALERS', alias: '普通商家' },
        { key: 'ROLE_TRUST', alias: '信任商家' },
        { key: 'ROLE_STAPLE', alias: '大宗商家' },
        { key: 'ROLE_SUPREMACY', alias: '至尊商家' }
    ];
const CHINA = 100000;

const ASSETS = {
    BILL_TYPE,
    BILL_TIME_TYPE

};

const ROLE = {
    BUSINESS_ROLE
}

const COUNTRY_NUM = {
    CHINA
}

export default {
    ASSETS,
    ROLE,
    COUNTRY_NUM
}