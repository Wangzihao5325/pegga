import * as Types from '../actionTypes';

const initialState = {
    isDataLoading: false,
    data: [],
    currentPage: 0,
    totalPage: 0,
    isMyAdDataLoading: false,
    myAdData: [],
    myAdCurrentPage: 0,
    myAdTotalPage: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.UPDATE_AD_LIST_DATA:
            return {
                ...state,
                ...action.payload
            };
        default: return state;
    }
};
export default reducer;