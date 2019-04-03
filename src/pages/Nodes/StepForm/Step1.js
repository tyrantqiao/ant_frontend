import React, {Fragment} from 'react';
import {connect} from 'dva';
import {Form, Input, Button, Select, Divider} from 'antd';
import {formatMessage, FormattedMessage} from 'umi/locale';
import router from 'umi/router';
import styles from './style.less';
import GeographicView from './GeographicView';

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 19
    }
};

const validatorGeographic = (rule, value, callback) => {
    const {province, city} = value;
    if (!province.key) {
        callback('Please input your province!');
    }
    if (!city.key) {
        callback('Please input your city!');
    }
    callback();
};

// connect属于dva的语法糖，用于将数据绑定起来 这里就应该是负责连接models文件，以文件名形式绑定
@connect(({node}) => ({data: node.step}))
// 这样包装后的组件会自带 this.props.form 属性
@Form.create()
class Step1 extends React.PureComponent {
    render() {
        // form是表单的对象，下面两个属性为form的属性，与表单绑定以及字段校验
        const {form, dispatch, data} = this.props;
        const {getFieldDecorator, validateFields} = form;
        const onValidateForm = () => {
            validateFields((err, values) => {
                if (!err) {
                    dispatch({type: 'node/getLaAndLong', payload: values.adcode.city.key});
                    values = {
                        ...values,
                        adcode: values.adcode.city.key
                    }
                    dispatch({
                        // 看表单形式为添加还是删除，加入一个选择框
                        type: 'node/saveStepFormData',
                        payload: values
                    });
                    router.push('/node/step-form/confirm');
                }
            });
        };
        return (
            <Fragment>
                <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
                    <Form.Item {...formItemLayout} label="数据节点名字">
                        <Input.Group compact>
                            {getFieldDecorator('node_name', {
                                initialValue: data.node_name,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写数据节点的名字'
                                    }
                                ]
                            })(<Input
                                style={{
                                width: 'calc(100% - 100px)'
                            }}
                                placeholder="demo_name_1"/>)}
                        </Input.Group>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="数据节点类型">
                        <Input.Group compact>
                            {getFieldDecorator('node_type', {
                                initialValue: data.node_type,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入数据节点的类型'
                                    }
                                    // { type: 'email', message: '限制类型' },
                                ]
                            })(<Input
                                style={{
                                width: 'calc(100% - 100px)'
                            }}
                                placeholder="demo_type_1"/>)}
                        </Input.Group>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="最小工作值">
                        {getFieldDecorator('minVal', {
                            initialValue: data.minVal,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入最小工作值'
                                }, {
                                    pattern: /^(\d+)((?:\.\d+)?)$/,
                                    message: '请输入合法数字'
                                }
                            ]
                        })(<Input prefix="$" placeholder="请输入最小工作值"/>)}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="最大工作值">
                        {getFieldDecorator('maxVal', {
                            initialValue: data.maxVal,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入最大最大工作值'
                                }, {
                                    pattern: /^(\d+)((?:\.\d+)?)$/,
                                    message: '请输入合法数字'
                                }
                            ]
                        })(<Input prefix="$" placeholder="请输入最大工作值"/>)}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={formatMessage({id: 'app.settings.basic.geographic'})}>
                        {getFieldDecorator('adcode', {
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'app.settings.basic.geographic-message'
                                    }, {})
                                }, {
                                    validator: validatorGeographic
                                }
                            ]
                        })(<GeographicView/>)}
                    </Form.Item>
                    <Form.Item
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
                        <Button type="primary" onClick={onValidateForm}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
                <Divider style={{
                    margin: '40px 0 24px'
                }}/>
                <div className={styles.desc}>
                    <h3>表单提示</h3>
                    <h4>创建数据节点：</h4>
                    <p>
                        主要是以传感器的型号来指定的，比如XXXX-0001号传感器，写出它的名称，属于什么类型传感器，并把工作范围标注出来即可。
                    </p>
                    <h4>数值表的导入</h4>
                    <p>
                        手动导入时应注意选择对应的传感器id，然后导入数据需要选择好时间单位等等。
                    </p>
                </div>
            </Fragment>
        );
    }
}

export default Step1;
