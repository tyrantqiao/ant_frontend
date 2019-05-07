import {queryNotices, getNodes,addSearchHistory} from '@/services/api';
import {routerRedux} from 'dva/router';

export default {
    namespace : 'global',

    state : {
        collapsed: false,
        notices: [],
        nodes: []
    },

    effects : {
        *getNodesList(_, {call, put}) {
            const latestNodesList = yield call(getNodes, _);
            yield put({type: 'saveNodes', payload: latestNodesList});
        },
        *linkToNodeProfile({payload},{call,put}){
          yield put(routerRedux.push('/profile/basic', {nodeId: payload.split(':')[1]}));
        },
        *addSearchData({payload},{call,put}){
          yield call(addSearchHistory,payload);
        },
        *fetchNotices(_, {call, put, select}) {
            const data = yield call(queryNotices);
            yield put({type: 'saveNotices', payload: data});
            const unreadCount = yield select(state => state.global.notices.filter(item => !item.read).length);
            yield put({
                type: 'user/changeNotifyCount',
                payload: {
                    totalCount: data.length,
                    unreadCount
                }
            });
        },
        *clearNotices({
            payload
        }, {put, select}) {
            yield put({type: 'saveClearedNotices', payload});
            const count = yield select(state => state.global.notices.length);
            const unreadCount = yield select(state => state.global.notices.filter(item => !item.read).length);
            yield put({
                type: 'user/changeNotifyCount',
                payload: {
                    totalCount: count,
                    unreadCount
                }
            });
        },
        *changeNoticeReadState({
            payload
        }, {put, select}) {
            const notices = yield select(state => state.global.notices.map(item => {
                const notice = {
                    ...item
                };
                if (notice.id === payload) {
                    notice.read = true;
                }
                return notice;
            }));
            yield put({type: 'saveNotices', payload: notices});
            yield put({
                type: 'user/changeNotifyCount',
                payload: {
                    totalCount: notices.length,
                    unreadCount: notices
                        .filter(item => !item.read)
                        .length
                }
            });
        }
    },

    reducers : {
        changeLayoutCollapsed(state, {payload}) {
            return {
                ...state,
                collapsed: payload
            };
        },
        saveNotices(state, {payload}) {
            return {
                ...state,
                notices: payload
            };
        },
        saveClearedNotices(state, {payload}) {
            return {
                ...state,
                notices: state
                    .notices
                    .filter(item => item.type !== payload)
            };
        },
        saveNodes(state, {payload: newNodes}) {
            return {
                // 保存原来的state
                ...state,
                // 覆盖掉state的nodes数据
                nodes: newNodes
            };
        }
    },

    subscriptions : {
        setup({history}) {
            // Subscribe history(url) change, trigger `load` action if pathname is `/`
            return history.listen(({pathname, search}) => {
                if (typeof window.ga !== 'undefined') {
                    window.ga('send', 'pageview', pathname + search);
                }
            });
        }
    }
};
