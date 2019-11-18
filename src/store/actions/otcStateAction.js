import * as Types from '../actionTypes';

export function otc_state_change_danger(payload) {
    return {
        type: Types.OTC_STATE_CHANGE_DANGER,
        payload
    }
}