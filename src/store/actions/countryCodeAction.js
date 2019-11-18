import * as Types from '../actionTypes';

export function country_change(name, code) {
    return { type: Types.COUNTRY_CODE_CHANGE, name, code }
}

export function boundry_change(boundryName, boundryCode) {
    return { type: Types.BOUNDRY_CODE_CHANGE, boundryName, boundryCode }
}