import {routerRedux} from 'dva/router';
import {message} from 'antd';
// 需要引入api的函数 error
import {fakeSubmitForm, submitValuesForm, getNodes, deleteData, updateData, getDatasList} from '@/services/api';

export default {
    // model的定义名字
    namespace : 'values',

    // 状态机可能被组件的事件处理器改变并触发用户界面更新的数据，譬如需要对用户输入,服务器请求或者时间变化等作出响应。 而props是父级向子级传播数据的方式
    state : {
        // 分步表单的数据节点配置
        step: {
            nodeId: 1,
            val: 10,
            unit: 'm',
            safe: true,
            recordTime: '2000-03-14T11:45:00'
        },
        datas: [
            {   
                id: 1,
                nodeId: 20,
                val: 10,
                unit: 'm',
                safe: true,
                recordTime: '2000-03-14T11:45:00'
            }
        ],
        nodes: [
            {
                id: 1,
                node_name: 'temperature_1',
                node_type: 'temperature',
                maxVal: 2,
                minVal: 22
            }
        ]
    },

    // 异步请求，负责请求数据，业务逻辑书写地方，数据读写即对state的改变再转给reduces进行
    effects : {
        // 常规表单的作用效果
        *submitRegularForm({
            payload
        }, {call}) {
            yield call(fakeSubmitForm, payload);
            message.success('提交成功');
        },
        // 分步表单 payload即action的数据载体，在这里也就为data，data则装了我们的表单数据
        *submitStepForm({
            payload
        }, {call, put}) {
            // yield call(fakeSubmitForm, payload); 开始改切后端接口
            // submitdatasForm的request方法写在src/services/api.js中
            yield call(submitValuesForm, payload);
            yield put({type: 'saveStepFormData', payload});
            yield put(routerRedux.push('/values/step-form/result'));
        },
        *getNodes(_, {call, put}) {
            const latestNodes = yield call(getNodes, _);
            yield put({type: 'save', payload: latestNodes});
        },
        // 删除节点
        *deleteData({
            payload
        }, {call, put}) {
            yield call(deleteData, payload.id);
        },
        // 更新节点
        *updateData({
            payload
        }, {call, put}) {
            yield call(updateData, payload, payload.id);
        },
        // 获取datas
        *getDataList(_, {call, put}) {
            const latestDatasList = yield call(getDatasList, _);
            yield put({type: 'saveDatas', payload: latestDatasList});
        }

    },

    // 保存分步表单的数据 ...是一个函数，将一个数组转化为用逗号分隔的参数序列 同时此处保存具体数据时，也要保证其他数据也会保存下来
    reducers : {
        save(state, {payload: nodesList}) {
            return {
                // 保存原来的state
                ...state,
                // 覆盖掉state的nodes数据
                nodes: nodesList
            };
        },
        saveStepFormData(state, {payload}) {
            return {
                ...state,
                step: {
                    ...state.step,
                    ...payload
                }
            };
        },
        // 同时应注意payload中定义的变量名不能与前面effects定义的一样，不能将无法传参数进来
        saveDatas(state, {payload: newDatas}) {
            return {
                // 保存原来的state
                ...state,
                // 覆盖掉state的datas数据
                datas: newDatas
            };
        }
    }
};
