import * as Types from '../actionTypes';

const initialState = {
    //交易大厅
    tradeType: 0,// 0 买 1 卖
    currencyType: 'CNY',
    coinType: 'PQC',
    estimatedPrice: '',
    tradeNum: '',
    totalMoney: '',
    payType: '',
    //ad management
    adTradeType: 0,
    adStateType: 3,  //0->下架 1->上架 2->关闭 3->全部
    adAutoFitter: 'close',
    //order managent
    orderType: 'going',
    iconPrice: [{ token: 'PQC', rate: 1, type: null, fiat: null, maxLimit: null, minLimit: null }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.OTC_STATE_CHANGE_DANGER:
            return {
                ...state,
                ...action.payload
            };
        default: return state;
    }
};
export default reducer;