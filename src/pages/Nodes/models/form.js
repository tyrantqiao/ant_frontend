import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '@/services/api';

export default {
  // model的定义名字
  namespace: 'form',

  // 状态机可能被组件的事件处理器改变并触发用户界面更新的数据，譬如需要对用户输入,服务器请求或者时间变化等作出响应。
  // 而props是父级向子级传播数据的方式
  state: {
    // 分步表单的数据节点配置
    step: {
      nodeName: 'temperature_node_1',
      nodeType: 'temperature',
      maxVal: '10',
      minVal: '1',
    },
  },

  effects: {
    // 常规表单的作用效果
    *submitRegularForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
    // 分步表单
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/node/step-form/result'));
    },
  },

  // 保存分步表单的数据
  reducers: {
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
