import * as Types from '../actionTypes';

export function storage_update(payload) {
    return { type: Types.STORAGE_UPDATE, payload };
}