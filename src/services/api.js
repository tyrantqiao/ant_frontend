import {stringify} from 'qs';
import fetch from 'dva/fetch';
import request from '@/utils/request';

// django启动的平台连接
const backend = '/django';

// 用来给values/stepForm提交数据管理的请求表单，将会向后端8001/docs发出请求
export async function submitValuesForm(params) {
    return request(`${backend}/api/data/`, {
        method: 'POST',
        body: params
    });
}

// 用来给node/stepForm提交数据节点管理的请求表单，将会向后端8001/docs发出请求
export async function submitNodeForm(params) {
    return request(`${backend}/api/nodes/`, {
        method: 'POST',
        body: params
    });
}

// 更新node节点
export async function updateNode(params, id) {
    return request(`${backend}/api/nodes/${id}/`, {
        method: 'PUT',
        body: params
    });
}

// 删除节点，以id为请求参数
export async function deleteNode(id) {
    return request(`${backend}/api/nodes/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// 以list的形式返回nodes
export async function getNodes() {
    return request(`${backend}/api/nodes/`);
}

// 以list的形式放回searchData
export async function getSearchData() {
    return request(`${backend}/api/searchData/`);
}

export async function fakeSubmitForm(params) {
    return request('/api/forms', {
        method: 'POST',
        body: params
    });
}

export async function queryProjectNotice() {
    return request('/api/project/notice');
}

export async function queryActivities() {
    return request('/api/activities');
}

export async function queryRule(params) {
    return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
    return request('/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'delete'
        }
    });
}

export async function addRule(params) {
    return request('/api/rule', {
        method: 'POST',
        body: {
            ...params,
            method: 'post'
        }
    });
}

export async function updateRule(params = {}) {
    return request(`/api/rule?${stringify(params.query)}`, {
        method: 'POST',
        body: {
            ...params.body,
            method: 'update'
        }
    });
}

export async function fakeChartData() {
    return request('/api/fake_chart_data');
}

export async function queryTags() {
    return request('/api/tags');
}

export async function queryBasicProfile(id) {
    return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
    return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
    return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
    const {
        count = 5,
        ...restParams
    } = params;
    return request(`/api/fake_list?count=${count}`, {
        method: 'POST',
        body: {
            ...restParams,
            method: 'delete'
        }
    });
}

export async function addFakeList(params) {
    const {
        count = 5,
        ...restParams
    } = params;
    return request(`/api/fake_list?count=${count}`, {
        method: 'POST',
        body: {
            ...restParams,
            method: 'post'
        }
    });
}

export async function updateFakeList(params) {
    const {
        count = 5,
        ...restParams
    } = params;
    return request(`/api/fake_list?count=${count}`, {
        method: 'POST',
        body: {
            ...restParams,
            method: 'update'
        }
    });
}

export async function fakeAccountLogin(params) {
    return request('/api/login/account', {
        method: 'POST',
        body: params
    });
}

export async function fakeRegister(params) {
    return request('/api/register', {
        method: 'POST',
        body: params
    });
}

export async function queryNotices(params = {}) {
    return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
    return request(`/api/captcha?mobile=${mobile}`);
}
