import * as Types from '../actionTypes';
import store from '../index';
import Api from '../../socket';

const DEFAULT_PAGE_LOAD = { current: 1, size: 10 };

export function update_ad_list_data(payload) {
    return { type: Types.UPDATE_AD_LIST_DATA, payload };
}

export function adListUpdate(payloadParam, pageload = DEFAULT_PAGE_LOAD, beforeCallback, afterCallback) {
    if (typeof beforeCallback == 'function') {
        beforeCallback(payloadParam, pageload);
    }
    let { tradeType, coinType, currencyType } = store.getState().otcState;
    let payload = { fiat: currencyType, token: coinType, type: tradeType };
    if (payloadParam) {
        payload = { ...payload, ...payloadParam };
    }
    payload.type = payload.type == '1' ? '0' : '1';
    Api.adList(payload, (result) => {
        let storePayload = {
            data: result.records,
            currentPage: result.current,
            totalPage: result.pages
        };
        store.dispatch(update_ad_list_data(storePayload));
        if (typeof afterCallback == 'function') {
            afterCallback(payloadParam, pageload, result);
        }
    }, null, pageload ? pageload : DEFAULT_PAGE_LOAD);
}

export function adListPush(payloadParam, pageload = DEFAULT_PAGE_LOAD, beforeCallback, afterCallback) {
    if (typeof beforeCallback == 'function') {
        beforeCallback(payloadParam, pageload);
    }
    let { tradeType, coinType, currencyType } = store.getState().otcState;
    let payload = { fiat: currencyType, token: coinType, type: tradeType };
    if (payloadParam) {
        payload = { ...payload, ...payloadParam };
    }
    payload.type = payload.type == '1' ? '0' : '1';
    Api.adList(payload, (result) => {
        let dataReg = store.getState().adList.data.concat(result.records);
        let storePayload = {
            data: dataReg,
            currentPage: result.current,
            totalPage: result.pages
        };
        store.dispatch(update_ad_list_data(storePayload));
        if (typeof afterCallback == 'function') {
            afterCallback(payloadParam, pageload, result);
        }
    }, null, pageload ? pageload : DEFAULT_PAGE_LOAD);
}