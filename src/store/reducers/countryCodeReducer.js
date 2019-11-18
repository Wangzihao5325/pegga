import * as Types from '../actionTypes';
import Enum from '../../global/Enum';

const initialState = {
    name: '中国',
    code: '+86',
    boundryName: '中国',
    boundryCode: [Enum.COUNTRY_NUM.CHINA],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.COUNTRY_CODE_CHANGE:
            return {
                ...state,
                name: action.name,
                code: action.code,
            };
        case Types.BOUNDRY_CODE_CHANGE:
            return {
                ...state,
                boundryName: action.boundryName,
                boundryCode: action.boundryCode,
            };
        default: return state;
    }
};
export default reducer;