import {routerRedux} from 'dva/router';
import {message, Tag, Divider} from 'antd';
// 需要引入api的函数 error
import {submitNodeForm, getNodes, deleteNode, updateNode, getLaAndLong,subscribe} from '@/services/api';

export default {
    // model的定义名字
    namespace : 'node',

    // 状态机可能被组件的事件处理器改变并触发用户界面更新的数据，譬如需要对用户输入,服务器请求或者时间变化等作出响应。 而props是父级向子级传播数据的方式
    state : {
        // 分步表单的数据节点配置
        step: {
            node_name: '',
            node_type: '',
            maxVal: '',
            minVal: '',
            subscribe: true,
            nodeId: "dwdwdwdw",
            adcode: "",
            "longitude": 0,
            "latitude": 0
        },
        nodes: [
            {
                id: 1,
                node_name: '',
                node_type: '',
                minVal: 0,
                maxVal: 0,
                adcode: "",
                subscribe: false,
                nodeId: "dwdwdwdw",
                "longitude": 0,
                "latitude": 0
            }
        ]
    },
    effects : {
        // 分步表单 payload即action的数据载体，在这里也就为data，data则装了我们的表单数据
        *submitStepForm({
            payload
        }, {call, put}) {
            // submitNodeForm的request方法写在src/services/api.js中
            yield call(submitNodeForm, payload);
            yield put({type: 'saveStepFormData', payload});
            yield put(routerRedux.push('/node/step-form/result'));
        },
        // 删除节点
        *deleteNode({
            payload
        }, {call, put}) {
            yield call(deleteNode, payload.id);
        },
        // 更新节点
        *updateNode({
            payload
        }, {call, put}) {
            yield call(updateNode, payload, payload.id);
        },
        // 获取经纬度
        *getLaAndLong({
            payload
        }, {call, put}) {
            const response = yield call(getLaAndLong, payload);
            yield put({type: 'saveLaAndLong', payload: response});
        },
        // 获取nodes
        *getNodesList(_, {call, put}) {
            const latestNodesList = yield call(getNodes, _);
            yield put({type: 'saveNodes', payload: latestNodesList});
        },
        *makeSubscribe({
            payload
        }, {call, put}) {
            console.log(payload)
            const response = yield call(subscribe, payload, payload.id);
        }
    },
    // 对数据进行交互
    reducers : {
        saveStepFormData(state, {payload}) {
            return {
                ...state,
                step: {
                    ...state.step,
                    ...payload
                }
            };
        },
        saveLaAndLong(state, {payload}) {
            return {
                ...state,
                step: {
                    ...state.step,
                    longitude: payload
                        .districts[0]
                        .center
                        .split(',')[0],
                    latitude: payload
                        .districts[0]
                        .center
                        .split(',')[1]
                }
            };
        },
        // 同时应注意payload中定义的变量名不能与前面effects定义的一样，不能将无法传参数进来
        saveNodes(state, {payload: newNodes}) {
            return {
                // 保存原来的state
                ...state,
                // 覆盖掉state的nodes数据
                nodes: newNodes
            };
        }
    }
};
