import {queryTags, getSearchData, getRealTimeSafeRate, getNodes, countByTimescale} from '@/services/api';

export default {
    namespace : 'monitor',

    state : {
        tags: [],
        safeRate: 55.55,
        markers: [],
        daysNum: 0,
        hoursNum: 0
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
            yield put({type: 'saveSafeRate', payload: response})
        },
        // 获取nodes
        *fetchMarkers(_, {call, put}) {
            const latestNodesList = yield call(getNodes, _);
            const result = [];
            Object
                .keys(latestNodesList)
                .map(key => result.push({'longitude': latestNodesList[key].longitude, 'latitude': latestNodesList[key].latitude}));
            yield put({type: 'saveLaAndLong', payload: result});
        },
        *fetchTodayCount({
            payload
        }, {call, put}) {
            const result = yield call(countByTimescale, payload.timescale, 0);
            yield put({type: 'save', payload: result})
        },
        *fetchHourCount({
            payload
        }, {call, put}) {
            const result = yield call(countByTimescale, payload.timescale, 0);
            yield put({type: 'saveHour', payload: result})
        }
    },

    reducers : {
        save(state, {payload: temp}) {
            return {
                ...state,
                daysNum: temp.count
            }
        },
        saveHour(state, {payload: temp}) {
            return {
                ...state,
                hoursNum: temp.count
            }
        },
        saveSafeRate(state, action) {
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
