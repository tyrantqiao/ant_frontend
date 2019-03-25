import {queryTags, getSearchData} from '@/services/api';

export default {
    namespace : 'monitor',

    state : {
        tags: []
    },

    effects : {
        *fetchSearchData(_, {call, put}) {
            const response = yield call(getSearchData);
            const result = [];
            Object
                .keys(response)
                .map(key => result.push({'name': response[key].keyword, 'value': response[key].count}));
            yield put({type: 'saveTags', payload: result})
        }
    },

    reducers : {
        saveTags(state, action) {
            return {
                ...state,
                tags: action.payload
            };
        }
    }
};
