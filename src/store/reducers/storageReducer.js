import * as Types from '../actionTypes';

const initialState = {
    login_account_input: '',
    login_pwd_input: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.TEST_INCREMENT:
            return {
                ...state,
                num: state.num + 1
            };
        case Types.TEST_DECREMENT:
            return {
                ...state,
                num: state.num - 1
            };
        default: return state;
    }
};
export default reducer;