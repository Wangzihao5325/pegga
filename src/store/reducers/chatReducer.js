import * as Types from '../actionTypes';

const initialState = {
    token: 'YAfJ8edRhroeNcfeolL9P+SR0DN+JyB07a25AmSQ+/9MhOnxW+0tJRJp8wtdKoN/r9tF90bBMXCSFVrjqfsPXw==',
    userId: '000001'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHAT_INFO_UPDATE:
            return {
                ...state,
                ...action.payload
            };
        default: return state;
    }
};
export default reducer;