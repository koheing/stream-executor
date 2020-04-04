"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChainExecutor {
    constructor(initialValue) {
        this._actions = [];
        this._initialValue = initialValue;
    }
    stream(act1, act2, act3, act4, act5, act6, act7, act8, act9, act10) {
        const _actions = [
            act1,
            act2,
            act3,
            act4,
            act5,
            act6,
            act7,
            act8,
            act9,
            act10,
        ].filter((act) => typeof act !== 'undefined');
        this._actions = _actions;
        return this;
    }
    execute(onError) {
        let result = this._initialValue;
        try {
            this._actions.reduce((pre, curr) => {
                if (typeof pre === 'undefined') {
                    return;
                }
                const _result = curr(pre);
                result = _result;
                return _result;
            }, this._initialValue);
        }
        catch (e) {
            if (onError) {
                onError(e);
            }
            else {
                console.error(e);
            }
        }
        return result;
    }
}
exports.ChainExecutor = ChainExecutor;
