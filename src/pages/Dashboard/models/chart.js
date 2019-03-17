import {fakeChartData, getSearchData} from '@/services/api';

export default {
    namespace : 'chart',

    state : {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [
            {
                "id": 1,
                "keyword": "unicorn",
                "count": 2,
                "range": 2,
                "status": 2
            }
        ],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
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
        *fetchSalesData(_, {call, put}) {
            const response = yield call(fakeChartData);
            yield put({
                type: 'save',
                payload: {
                    salesData: response.salesData
                }
            });
        },
        *fetchSearchData(_, {call, put}) {
            const response = yield call(getSearchData);
            yield put({
                type: 'save',
                payload: {
                    searchData: response
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
        clear() {
            return {
                visitData: [],
                visitData2: [],
                salesData: [],
                searchData: [],
                offlineData: [],
                offlineChartData: [],
                salesTypeData: [],
                salesTypeDataOnline: [],
                salesTypeDataOffline: [],
                radarData: []
            };
        }
    }
};
