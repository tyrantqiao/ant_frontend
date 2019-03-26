import {queryTags, getSearchData, getRealTimeSafeRate} from '@/services/api';

export default {
    namespace : 'monitor',

    state : {
        tags: [],
        safeRate: 55.55
    },

    effects : {
        *fetchSearchData(_, {call, put}) {
            const response = yield call(getSearchData);
            const result = [];
            Object
                .keys(response)
                .map(key => result.push({'name': response[key].keyword, 'value': response[key].count}));
            yield put({type: 'saveTags', payload: result})
        },
        *fetchSafeRate({
            payload
        }, {call, put}) {
            const response = yield call(getRealTimeSafeRate, payload.timescale);
            yield put({type: 'save', payload: response})
        }
    },

    reducers : {
        save(state, action) {
            return {
                ...state,
                safeRate: action.payload['safeRate']
            }
        },
        saveTags(state, action) {
            return {
                ...state,
                tags: action.payload
            };
        }
    }
};
