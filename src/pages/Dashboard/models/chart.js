import {
    fakeChartData,
    getSearchData,
    getDataByTimescale,
    countRankingListData,
    getCommodity,
    getSegmentSafe,
    countSegmentedByTimescale
} from '@/services/api';

export default {
    namespace : 'chart',

    state : {
        visitData: [],
        visitData2: [],
        nodesData: [],
        rankingListData: [],
        rankingSafeRateData: [],
        safeRateData: [],
        searchData: [
            {
                "id": 1,
                "keyword": "unicorn",
                "count": 0,
                "range": 0,
                "status": 0
            }
        ],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [
            {
                x: '家用电器',
                y: 0
            },
        ],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
        loading: false
    },

    effects : {
        *fetch(_, {call, put}) {
            const response = yield call(fakeChartData);
            yield put({type: 'save', payload: response});
        },
        *fetchYearData({
            payload
        }, {call, put}) {
            const response = yield call(getDataByTimescale, payload);
            yield put({type: 'save', payload: response});
        },
        *fetchSalesTypeData(_, {call, put}) {
            const response = yield call(getCommodity);
            const typeData = response.filter((item) => item.type === 3);
            const typeDataOnline = response.filter((item) => item.type === 1);
            const typeDataOffline = response.filter((item) => item.type === 2);
            yield put({type: 'saveSalesTypeData', payload: typeData});
            yield put({type: 'saveSalesTypeOnline', payload: typeDataOnline});
            yield put({type: 'saveSalesOffline', payload: typeDataOffline});
        },
        *fetchSearchData(_, {call, put}) {
            const response = yield call(getSearchData);
            yield put({
                type: 'save',
                payload: {
                    searchData: response
                }
            })
        },
        *fetchRankingListData({
            payload
        }, {call, put}) {
            const response = yield call(countRankingListData, payload.limit, payload.type);
            yield put({
                type: 'save',
                payload: {
                    rankingListData: response
                }
            })
        },
        *fetchRankingSafeRate({
            payload
        }, {call, put}) {
            const response = yield call(countRankingListData, payload.limit, payload.type);
            yield put({
                type: 'save',
                payload: {
                    rankingSafeRateData: response
                }
            })
        },
        *fetchSafeRateData({
            payload
        }, {call, put}) {
            const response = yield call(getSegmentSafe, payload.timescale, payload.type, payload.num);
            yield put({
                type: 'save',
                payload: {
                    safeRateData: response
                }
            })
        },
        *fetchNodesData({
            payload
        }, {call, put}) {
            const response = yield call(countSegmentedByTimescale, payload.timescale, payload.num, payload.type, 'all');
            yield put({
                type: 'save',
                payload: {
                    nodesData: response
                }
            })
        }
    },

    reducers : {
        save(state, {payload}) {
            return {
                ...state,
                ...payload
            };
        },
        saveSalesTypeData(state, {payload}) {
            return {
                ...state,
                salesTypeData: payload
            }
        },
        saveSalesTypeOnline(state, {payload}) {
            return {
                ...state,
                salesTypeDataOnline: payload
            }
        },
        saveSalesOffline(state, {payload}) {
            return {
                ...state,
                salesTypeDataOffline: payload
            }
        },
        clear() {
            return {
                visitData: [],
                visitData2: [],
                nodesData: [],
                searchData: [],
                rankingListData: [],
                offlineData: [],
                offlineChartData: [],
                salesTypeData: [],
                salesTypeDataOnline: [],
                salesTypeDataOffline: [],
                rankingSafeRateData: [],
                safeRateData: [],
                radarData: []
            };
        }
    }
};
