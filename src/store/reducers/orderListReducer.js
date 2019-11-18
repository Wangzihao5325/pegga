import * as Types from '../actionTypes';

const initialState = {
    data: [],
    currentPage: 0,
    totalPage: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.UPDATE_ORDER_LIST_DATA:
            return {
                ...state,
                ...action.payload
            };
        default: return state;
    }
};
export default reducer;