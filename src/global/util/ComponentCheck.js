import { Component } from 'react';

class ComponentCheck {
    render(C) {
        let r = null;
        if (C instanceof Component) {
            r = <C />
        } else if (typeof c == 'function') {
            let Reg = C();
            r = reg instanceof Component ? <Reg /> : null;
        }

        return r;
    }
}

export default new ComponentCheck();