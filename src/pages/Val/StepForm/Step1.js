import React, {Fragment} from 'react';
import {connect} from 'dva';
import {
    Form,
    DatePicker,
    TimePicker,
    Input,
    Button,
    Select,
    Divider
} from 'antd';
import router from 'umi/router';
import styles from './style.less';

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 19
    }
};

// connect属于dva的语法糖，用于将数据绑定起来 这里就应该是负责连接models文件，以文件名形式绑定
@connect(({val}) => ({data: val.step}))
// 这样包装后的组件会自带 this.props.form 属性
@Form.create()
class Step1 extends React.PureComponent {
    changeSafe = (e) => {
        this.setState({safe: e.target.checked});
    }
    render() {
        // form是表单的对象，下面两个属性为form的属性，与表单绑定以及字段校验
        const {form, dispatch, data} = this.props;
        const {getFieldDecorator, validateFields} = form;
        const values = {
            // ...fieldsValue,
            'date-time-picker': 'date-time-picker'.format('YYYY-MM-DD HH:mm:ss')
        };
        const onValidateForm = () => {
            validateFields((err, values) => {
                if (!err) {
                    const time = {
                        ...data,
                        'date-time-picker': data['date-time-picker'].format('YYYY-MM-DD HH:mm:ss')
                    }
                    dispatch({
                        // 看表单形式为添加还是删除，加入一个选择框
                        type: 'val/saveStepFormData',
                        payload: values
                    });
                    router.push('/val/step-form/confirm');
                }
            });
        };
        // 当选择框获取焦点时，则调用列表获取
        handleFocus = () => {
            const {dispatch} = this.props;
            dispatch({
                type: 'val/getNodes',
                payload: {
                    nodes: []
                }
            });
        };
        return (
            <Fragment>
                <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>

                    <Form.Item {...formItemLayout} label="数据单位">
                        <Input.Group compact>
                            {getFieldDecorator('unit', {
                                initialValue: data.unit,
                                rules: [
                                    {
                                        required: true,
                                        message: '请填写数据的单位'
                                    }
                                ]
                            })(<Input
                                style={{
                                width: 'calc(100% - 100px)'
                            }}
                                placeholder="m"/>)}
                        </Input.Group>
                    </Form.Item>

                    {/* 数据安全的bool位 */}
                    <Form.Item {...formItemLayout} label="数据是否安全">
                        <Checkbox checked={this.data.safe} onChange={this.changeSafe}>
                            数据是否安全
                        </Checkbox>
                    </Form.Item>

                    {/* 数据提交时间 */}
                    <Form.Item {...formItemLayout} label="数据记录时间">
                        {getFieldDecorator('date-time-picker', {
                            initialValue: data.recordTime,
                            rules: [
                                {
                                    required: true,
                                    type: 'object',
                                    message: '请输入数据记录时间'
                                }
                            ]
                        })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss"/>)}
                    </Form.Item>

                    {/* 数据节点的数值 */}
                    <Form.Item {...formItemLayout} label="数值">
                        {getFieldDecorator('val', {
                            initialValue: data.val,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入收集数值'
                                }, {
                                    pattern: /^(\d+)((?:\.\d+)?)$/,
                                    message: '请输入合法数字'
                                }
                            ]
                        })(<Input prefix="$" placeholder="请输入收集数值"/>)}
                    </Form.Item>

                    {/* 这里做一个list的展示形式，显示的是数据节点的名字，但是选中后用的是id */}
                    <Form.Item {...formItemLayout} label="数据节点id">
                        {getFieldDecorator('nodeId', {
                            initialValue: data.nodeId,
                            rules: [
                                {
                                    required: true,
                                    message: '请选择数据节点'
                                }
                            ]
                        })(
                            <Select placeholder="请选择数据节点node" onFocus={handleFocus}>
                                {nodes.map(node => (
                                    <Option key={node.id} value={node.id}>
                                        {node.node_name}
                                    </Option>
                                ))}
                            </Select>
                        )}
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
                    <h4>为数据节点添加数据：</h4>
                    <p>
                        主要是以传感器的型号来指定的，然后添加数据即可。
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
