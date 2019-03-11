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
@connect(({val, loading}) => ({
    // 提交中，根据loading.effects对象判断异步请求是否完成
    submitting: loading.effects['val/submitStepForm'],
    data: val.step
}))
@Form.create()
class Step2 extends React.PureComponent {
    render() {
        // form即表格的对象，getFieldDecorator和validateFields也就为form的属性
        const {form, data, dispatch, submitting} = this.props;
        const {getFieldDecorator, validateFields} = form;
        const onPrev = () => {
            // 链接的更改
            router.push('/val/step-form/info');
        };
        const onValidateForm = e => {
            e.preventDefault();
            validateFields((err, values) => {
                if (!err) {
                    // 改变state的唯一途径通过dispatch函数调用action dispatch应在组件connect Models后，通过props传入的
                    // 所以这里val/submitStepForm就是Models/val.js中定义的，val是namespace名字
                    dispatch({
                        // type不可缺省，其他payload、error、meta等可缺省
                        type: 'val/submitStepForm',
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
                    message="确认提交信息无误，避免更改数据时造成对服务器负担"
                    style={{
                    marginBottom: 24
                }}/>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="数据单位">
                    {data.unit}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="数据值">
                    <span className={styles.number}>{data.val}</span>
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="数据是否安全">
                    {data.safe}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="数据记录时间">
                    {data.recordTime}
                </Form.Item>
                <Form.Item {...formItemLayout} className={styles.stepFormText} label="数据节点id">
                    <span className={styles.number}>{data.nodeId}</span>
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
