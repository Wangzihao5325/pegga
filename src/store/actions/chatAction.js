import * as Types from '../actionTypes';
import {
    addConnectionStatusListener,
    connect,
    disconnect,
    setReconnectKickEnable,
    addReceiveMessageListener,
} from "rongcloud-react-native-imlib";
import Toast from '../../component/toast';
import NavigationService from '../../app/router/NavigationService';
import store from '../index';

let listener = null;

const _connect = (token) =>
    connect(
        token,
        userId => Toast.show(`连接成功${userId}`),
        errorCode => Toast.show(`连接失败${errorCode}`),
        () => Toast.show('Token 不正确或已过期')
    );

function _update_OTC_state_with_modal_state(payload) {
    return { type: Types.UPDATE_OTCSTATE_WITH_MODALSTATE, payload }
}

export function _clear_OTC_state_and_close_modal() {
    return { type: Types.CLEAR_OTCSTATE_AND_CLOSEMODAL, payload: { isModal: false } }
}

export function chat_info_update(payload) {
    _connect(payload.token);
    setReconnectKickEnable(true);
    listener = addReceiveMessageListener(message => {
        const { content } = message.message;
        const { userId, userName, type } = JSON.parse(content.extra);
        if (userId == 'pegga') {//系统消息
            const appendingMsg = JSON.parse(content.content);
            switch (type) {
                case 'pegga-3':
                    {
                        let isModal = store.getState().chat.isModal;
                        if (isModal) {//在modal状态下 只增加数据
                            store.dispatch(_update_OTC_state_with_modal_state({ appendingMsg }));
                        } else {//不在modal状态下 需要弹出modal
                            NavigationService.navigate('OTCStatePopModel');
                            store.dispatch(_update_OTC_state_with_modal_state({ isModal: true, appendingMsg }));
                        }
                    }
                    break;
            }
        } else {//不是系统消息则判断是否在聊天页面
            let isChating = store.getState().chat.isChating;
            if (isChating) {
                //聊天中 
            } else {
                //不在聊天中 增加提示
            }
        }
    });
    return { type: Types.CHAT_INFO_UPDATE, payload };
}

