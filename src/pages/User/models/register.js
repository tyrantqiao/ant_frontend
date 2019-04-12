import {fakeRegister, sendVerifyCode, register} from '@/services/api';
import {setAuthority} from '@/utils/authority';
import {reloadAuthorized} from '@/utils/Authorized';

export default {
    namespace : 'register',

    state : {
        status: undefined
    },

    effects : {
        *submit({
            payload
        }, {call, put}) {
            const response = yield call(register, payload);
            yield put({type: 'registerHandle', payload: response});
        },
        *sendVerify({
            payload
        }, {call, put}) {
            const response = yield call(sendVerifyCode, payload);
            yield put({type: 'save', payload: response});
        }
    },

    reducers : {
        save(state, {payload}) {
            return {
                ...state,
                ...payload
            }
        },
        registerHandle(state, {payload}) {
            setAuthority('admin');
            reloadAuthorized();
            return {
                ...state,
                status: payload.status
            };
        }
    }
};
