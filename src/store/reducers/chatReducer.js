import * as Types from '../actionTypes';

const initialState = {
    token: 'YAfJ8edRhroeNcfeolL9P+SR0DN+JyB07a25AmSQ+/9MhOnxW+0tJRJp8wtdKoN/r9tF90bBMXCSFVrjqfsPXw==',
    userId: '000001',
    isChating: false,
    isModal: false,
    dataList: [],
    chatDataList: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHAT_INFO_UPDATE:
            return {
                ...state,
                ...action.payload
            };
        case Types.UPDATE_OTCSTATE_WITH_MODALSTATE:
            {
                let { appendingMsg, ...others } = action.payload;
                return {
                    ...state,
                    ...others,
                    dataList: [appendingMsg, ...state.dataList]
                };
            }
        case Types.CLEAR_OTCSTATE_AND_CLOSEMODAL:
            return {
                ...state,
                ...action.payload,
                dataList: []
            };
        case Types.IN_CHATING:
            return {
                ...state,
                ...action.payload
            };
        case Types.OUT_CHATING:
            return {
                ...state,
                ...action.payload,
                chatDataList: []
            };
        default: return state;
    }
};
export default reducer;