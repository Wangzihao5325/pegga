import * as Types from '../actionTypes';

const initialState = {
    login_account_input: '18329025380',
    login_pwd_input: 'yyf361142',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.STORAGE_UPDATE:
            return {
                ...state,
                ...action.payload
            };
        default: return state;
    }
};
export default reducer;