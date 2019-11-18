import _ from 'lodash';
import * as Types from '../actionTypes';
import Enum from '../../global/Enum';

const initialState = {
    show: true, //是否展示资产
    balance: 0, //资产总金额
    balanceSymbol: '', //总资产币种
    securityDeposit: 0,//保证金金额
    legalWallet: null, //币种钱包 => item:{assessment:'平台币估值',available:'可用金额',frozen:'冻结金额'}

    //收支流水
    billType: Enum.ASSETS.BILL_TYPE[0],
    billTime: Enum.ASSETS.BILL_TIME_TYPE[0],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ASSETS_UPDATE:
            let walletObj = _.assign({}, action.payload.legalWallet);
            return {
                ...state,
                balance: action.payload.balance,
                balanceSymbol: action.payload.balanceSymbol,
                securityDeposit: action.payload.securityDeposit,
                legalWallet: walletObj,
            };
        case Types.ASSETS_SHOW_STATE_CHENGE:
            if (typeof action.show == 'boolean') {
                return {
                    ...state,
                    show: action.show
                }
            } else {
                return {
                    ...state,
                    show: !state.show
                }
            }
        case Types.ASSETS_UPDATE_BILL_TYPE:
            return {
                ...state,
                billType: action.billType
            }
        case Types.ASSETS_UPDATE_BILL_TIME_TYPE:
            return {
                ...state,
                billTime: action.billTime
            }
        case Types.USER_LOGOUT:
            return {
                ...initialState
            };
        default: return state;
    }
};
export default reducer;