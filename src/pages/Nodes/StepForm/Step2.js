import React from 'react';
import {connect} from 'dva';
import {Form, Input, Button, Alert, Divider} from 'antd';
import router from 'umi/router';
import {digitUppercase} from '@/utils/utils';
import styles from './style.less';

const formItemLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 19
    }
};

// 连接数据，并加载效果 每个dva对象都会有loading属性
@connect(({node, loading}) => ({
    // 提交中，根据loading.effects对象判断异步请求是否完成
    submitting: loading.effects['node/submitStepForm'],
    data: node.step
}))
@Form.create()
class Step2 extends React.PureComponent {
    render() {
        // form即表格的对象，getFieldDecorator和validateFields也就为form的属性
        const {form, data, dispatch, submitting} = this.props;
        const {getFieldDecorator, validateFields} = form;
        const onPrev = () => {
            // 链接的更改
            router.push('/node/step-form/info');
        };
        const onValidateForm = e => {
            e.preventDefault();
            validateFields((err, values) => {
                if (!err) {
                    // 改变state的唯一途径通过dispatch函数调用action dispatch应在组件connect Models后，通过props传入的
                    // 所以这里node/submitStepForm就是Models/node.js中定义的，node是namespace名字
                    dispatch({
                        // type不可缺省，其他payload、error、meta等可缺省
                        type: 'node/submitStepForm',
                        // payload是dispatch的一个对象，是action携带数据的载体
                        payload: {
                            ...data,
                            ...values
                        }
                    });
                }
            });
        };
        return (
            <Form layout="horizontal" className={styles.stepForm}>
                <Alert
                    closable
                    showIcon
                    message="确认提交信息无误，避免更改数据节点时造成对服务器负担"
                    style={{
                    marginBottom: 24
                }}/>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="数据节点名称">
                    {data.node_name}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="数据节点类型">
                    {data.node_type}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="最小安全值">
                    <span className={styles.number}>{data.minVal}</span>
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="最大安全值">
                    <span className={styles.number}>{data.maxVal}</span>
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="订阅节点">
                    {data.subscribe==true?'true':'false'}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="节点物理id">
                    {data.nodeId}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="地址">
                    {data.adcode}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="经度">
                    {data.longitude}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="纬度">
                    {data.latitude}
                </Form.Item>
                <Divider style={{
                    margin: '24px 0'
                }}/> {/* {...props}  */}
                <Form.Item {...formItemLayout} label="管理员密码" required={false}>
                    {/* getFieldDecorator 和表单进行双向绑定 */}
                    {getFieldDecorator('password', {
                        initialValue: '123456',
                        rules: [
                            {
                                required: true,
                                message: '需要输入安全密钥才能进行操作'
                            }
                        ]
                    })(<Input
                        type="password"
                        autoComplete="off"
                        style={{
                        width: '80%'
                    }}/>)}
                </Form.Item>
                <Form.Item
                    style={{
                    marginBottom: 8
                }}
                    wrapperCol={{
                    xs: {
                        span: 24,
                        offset: 0
                    },
                    sm: {
                        span: formItemLayout.wrapperCol.span,
                        offset: formItemLayout.labelCol.span
                    }
                }}
                    label="">
                    <Button type="primary" onClick={onValidateForm} loading={submitting}>
                        确认提交
                    </Button>
                    <Button
                        onClick={onPrev}
                        style={{
                        marginLeft: 8
                    }}>
                        上一步
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default Step2;
