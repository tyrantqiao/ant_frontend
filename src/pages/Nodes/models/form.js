import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm } from '@/services/api';

export default {
  namespace: 'form',

  state: {
    // 分步表单的数据节点配置
    step: {
      node_name: 'temperature_node_1',
      node_type: 'temperature',
      max_val: '10',
      min_val: '1',
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
      //TODO 这里就要修改为node的表单提交 
      yield put(routerRedux.push('/node/step-form/result'));
    },
    // 高级表单，其中需要日期的那份
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
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
