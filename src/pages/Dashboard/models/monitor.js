import {queryTags, getSearchData, getRealTimeSafeRate, getNodes} from '@/services/api';

export default {
    namespace : 'monitor',

    state : {
        tags: [],
        safeRate: 55.55,
        markers: []
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
        },
        // 获取nodes
        *fetchMarkers(_, {call, put}) {
            const latestNodesList = yield call(getNodes, _);
            const result = [];
            Object
                .keys(latestNodesList)
                .map(key => result.push({'longitude': latestNodesList[key].longitude, 'latitude': latestNodesList[key].latitude}));
            yield put({type: 'saveLaAndLong', payload: result});
        }
    },

    reducers : {
        save(state, action) {
            return {
                ...state,
                safeRate: action.payload['safeRate']
            }
        },
        saveLaAndLong(state, action) {
            return {
                ...state,
                markers: action.payload
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
