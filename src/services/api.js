import {stringify} from 'qs';
import fetch from 'dva/fetch';
import request from '@/utils/request';
import {async} from 'q';
import city from './geographic/city.json';
import province from './geographic/province.json';

// django启动的平台连接
const backend = '/django';

function getProvince(req, res) {
    return res.json(province);
}

function getCity(req, res) {
    return res.json(city[req.params.province]);
}

export async function queryProvince() {
    return getProvince();
}

export async function queryCity() {
    return getCity();
}

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

// 获得时间轴数据
export async function getLineChartData(nodeId) {
    return request(`${backend}/data/lineChartData/?nodeId=${nodeId}`);
}

// 发送验证码
export async function sendVerifyCode(params) {
    return request(`${backend}/email/send/`, {
        method: 'POST',
        body: params
    })
}

// 登录
export async function register(params) {
    return request(`${backend}/register/`, {
        method: 'POST',
        body: params
    })
}

// node safe count
export async function getNodeSafeCount(nodeId) {
    return request(`${backend}/data/getSafeCount/?nodeId=${nodeId}`);
}

// node data count
export async function getNodeCount(nodeId) {
    return request(`${backend}/data/getCount/?nodeId=${nodeId}`);
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

// 返回地理nodes
export async function getGeoNodes(adcode) {
    return request(`${backend}/nodes/?adcode=${adcode}`);
}

// 更新data
export async function updateData(params, id) {
    return request(`${backend}/api/data/${id}/`, {
        method: 'PUT',
        body: params
    });
}

// 删除data，以id为请求参数
export async function deleteData(id) {
    return request(`${backend}/api/data/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

// 以list的形式返回datas
export async function getDatasList() {
    return request(`${backend}/api/data/`);
}

// 以list的形式放回searchData
export async function getSearchData() {
    return request(`${backend}/searchData/`);
}

// 按list的形式返回data
export async function getDataByTimescale(timescale, num) {
    return request(`${backend}/data/getByTimescale/?timescale=${timescale}&num=${num}`);
}

// 按时间尺度分割返回数据，当type为count时，返回月份和count值，
export async function countSegmentedByTimescale(timescale, num, type, nodeId) {
    return request(`${backend}/data/segmentData/?timescale=${timescale}&num=${num}&type=${type}&nodeId=${nodeId}`);
}

// 按时间尺度返回安全率，type有safe  unsafe  count之分
export async function getSegmentSafe(timescale, type, nodeId) {
    return request(`${backend}/data/segmentSafe/?timescale=${timescale}&type=${type}&nodeId=${nodeId}`);
}

// 获取实时的安全率，默认为一小时内
export async function getRealTimeSafeRate(timescale) {
    return request(`${backend}/data/realTimeSafe/?timescale=${timescale}`);
}

// 返回数据节点排名，可限制出现数量
export async function countRankingListData(limit, type) {
    return request(`${backend}/data/countRank/?limit=${limit}&type=${type}`);
}

// 返回count
export async function countByTimescale(timescale, num) {
    return request(`${backend}/data/countByTimescale/?timescale=${timescale}&num=${num}`);
}

// 添加订单
export async function addOrder(params) {
    return request(`${backend}/api/order/`, {
        method: 'POST',
        body: {
            params
        }
    });
}

// 删除订单
export async function deleteOrder(id) {
    return request(`${backend}/api/order/${id}/`, {method: 'DELETE'});
}

// 返回不同类型的销售list
export async function getCommodityByType(type) {
    return request(`${backend}/commodity/type=${type}`)
}

// 返回list的商品
export async function getCommodity() {
    return request(`${backend}/commodity/`);
}

// getLaAndLong
export async function getLaAndLong(adcode) {
    return request(`/amap/v3/config/district?keywords=${adcode}&subdistrict=0&key=e37d57996f6ccac42feb6857125be64f`);
}

// 登录
export async function login(params) {
    return request(`${backend}/login/`, {
        method: 'POST',
        body: params
    });
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
