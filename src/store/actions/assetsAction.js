import * as Types from '../actionTypes';
import Api from '../../socket';
import store from '../index';

export function assets_update(payload) {
    return { type: Types.ASSETS_UPDATE, payload };
}

export function assets_show_state_change(show) {
    return { type: Types.ASSETS_SHOW_STATE_CHENGE, show };
}

export function assets_update_bill_type(billType) {
    return { type: Types.ASSETS_UPDATE_BILL_TYPE, billType }
}

export function assets_update_bill_time_type(billTime) {
    return { type: Types.ASSETS_UPDATE_BILL_TIME_TYPE, billTime }
}

export function assets_info_update(callback) {
    Api.assetsDetail((result) => {
        let payload = {
            balance: result.allAssets,
            balanceSymbol: 'CNY',
            securityDeposit: 0,
            legalWallet: result.legalWallet
        };
        store.dispatch(assets_update(payload));
        if (typeof callback == 'function') {
            callback(result)
        }
    })
}