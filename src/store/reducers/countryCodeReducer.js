import * as Types from '../actionTypes';
import Enum from '../../global/Enum';
import CH_sections from '../../global/doc/Country_code_CN';

const initialState = {
    name: '中国',
    code: '+86',
    boundryName: '中国',
    boundryCode: [Enum.COUNTRY_NUM.CHINA],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.COUNTRY_INIT_BY_CODE:
            {
                let code = `+${action.code}`;
                let name = '';
                let isMatch = CH_sections.some((item) => {
                    return item.data.some((dataItem) => {
                        let index = dataItem.lastIndexOf(code);
                        if (index >= 0 && index == (dataItem.length - code.length)) {
                            name = dataItem.split(' ')[0];
                            return true;
                        } else {
                            return false;
                        }
                    });
                });
                if (isMatch) {
                    return {
                        ...state,
                        name,
                        code
                    }
                } else {
                    return state;
                }

            }
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