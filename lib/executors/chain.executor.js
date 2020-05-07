"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChainExecutor {
    constructor(initialValue) {
        this._actions = [];
        this._isPromiseContained = false;
        this._initialValue = initialValue;
    }
    get initialValue() {
        return this._initialValue;
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
    asAsync() {
        this._isPromiseContained = true;
        return this;
    }
    execute(onError) {
        let result = this._initialValue;
        try {
            result = this._isPromiseContained
                ? this._promiseExecute()
                : this._execute();
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
    _execute() {
        let result = this._initialValue;
        this._actions.reduce((pre, curr) => {
            if (typeof pre === 'undefined') {
                return;
            }
            const _result = curr(pre);
            result = _result;
            return _result;
        }, this._initialValue);
        return result;
    }
    async _promiseExecute() {
        let result = this._initialValue;
        await this._actions.reduce(async (pre, curr) => {
            if (pre instanceof Promise && typeof (await pre) === 'undefined') {
                return;
            }
            const _result = await curr(pre);
            result = _result;
            return _result;
        }, Promise.resolve(this._initialValue));
        return result;
    }
}
exports.ChainExecutor = ChainExecutor;
