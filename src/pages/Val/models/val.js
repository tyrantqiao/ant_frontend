import {routerRedux} from 'dva/router';
import {message} from 'antd';
// 需要引入api的函数 error
import {fakeSubmitForm, submitValForm} from '@/services/api';

export default {
    // model的定义名字
    namespace : 'val',

    // 状态机可能被组件的事件处理器改变并触发用户界面更新的数据，譬如需要对用户输入,服务器请求或者时间变化等作出响应。 而props是父级向子级传播数据的方式
    state : {
        // 分步表单的数据节点配置
        step: {
            nodeId: '1',
            val: '10',
            unit: 'm',
            safe: true,
            recordTime: '2019-03-14T11:45:00',
            nodes: []
        }
    },

    effects : {
        // 常规表单的作用效果
        * submitRegularForm({
            payload
        }, {call}) {
            yield call(fakeSubmitForm, payload);
            message.success('提交成功');
        },
        // 分步表单 payload即action的数据载体，在这里也就为data，data则装了我们的表单数据
        * submitStepForm({
            payload
        }, {call, put}) {
            // yield call(fakeSubmitForm, payload); 开始改切后端接口
            // submitdatasForm的request方法写在src/services/api.js中
            yield call(submitdatasForm, payload);
            yield put({type: 'saveStepFormData', payload});
            yield put(routerRedux.push('/val/step-form/result'));
        },
        * getNodes(_, {call, put}) {
            const response = yield call(getNodes);
            yield put({
                type: 'save',
                payload: {
                    nodes: Array.isArray(response)
                        ? response
                        : []
                }
            });
            message.success('获取数据成功');
        }
    },

    // 保存分步表单的数据
    reducers : {
        save(state, {payload}) {
            return {
                ...state,
                ...payload
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
        }
    }
};
