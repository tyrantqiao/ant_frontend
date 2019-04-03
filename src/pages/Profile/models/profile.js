import {
    getGeoNodes,
    getSegmentSafe,
    getNodeSafeCount,
    getLineChartData,
    getNodeCount,
    countSegmentedByTimescale
} from '@/services/api';
import {object} from 'prop-types';
import moment from 'moment';

export default {
    namespace : 'profile',

    state : {
        visitData: [],
        nodes: [],
        dailyCollect: 0,
        totalCollect: 0,
        offlineData: [],
        segementSafe: [],
        segementData: [],
        totalSafe: 0,
        dailySafe: 0,
        offlineChartData: [],
        lineChartData: []
    },

    effects : {
        *getGeoNodes({
            payload
        }, {call, put}) {
            const response = yield call(getGeoNodes, payload);
            yield put({type: 'saveNodes', payload: response});
        },
        *getNode({
            payload
        }, {call, put}) {
            const dataCount = yield call(getNodeCount, payload);
            const safeCount = yield call(getNodeSafeCount, payload);
            const segementSafe = yield call(getSegmentSafe, 'month', 'count', payload);
            const segementData = yield call(countSegmentedByTimescale, 'month', new Date().getMonth(), 'count', payload);
            const lineChartData = yield call(getLineChartData, payload);
            yield put({type: 'save', payload: dataCount});
            yield put({type: 'save', payload: safeCount});
            yield put({type: 'saveSegementSafe', payload: segementSafe});
            yield put({type: 'saveSegementData', payload: segementData});
            yield put({type: 'saveLineChartData', payload: lineChartData});
        }
    },

    reducers : {
        show(state, {payload}) {
            return {
                ...state,
                ...payload
            };
        },
        save(state, {payload}) {
            return {
                ...state,
                ...payload
            };
        },
        saveLineChartData(state, {payload}) {
            return {
                ...state,
                lineChartData: payload
            };
        },
        saveSegementData(state, {payload}) {
            return {
                ...state,
                segementData: payload
            };
        },
        saveSegementSafe(state, {payload}) {
            return {
                ...state,
                segementSafe: payload
            };
        },
        saveNodes(state, {payload}) {
            return {
                ...state,
                nodes: payload
            };
        },
        saveVisitData(state, {payload}) {
            return {
                ...state,
                visitData: payload
            }
        },
        clear() {
            return {
                visitData: [],
                nodes: [],
                offlineData: [],
                offlineChartData: [],
                dailyCollect: 0,
                totalCollect: 0,
                dailySafe: 0,
                totalSafe: 0,
                segementData: [],
                segementSafe: [],
                lineChartData: []
            };
        }
    }
};
