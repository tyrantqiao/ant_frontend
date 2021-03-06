import React, {Fragment} from 'react';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {
    Form,
    DatePicker,
    TimePicker,
    Input,
    Button,
    Select,
    Divider,
    Checkbox
} from 'antd';
import moment from 'moment';
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
@connect(({values}) => ({data: values.step, nodes: values.nodes}))
// 这样包装后的组件会自带 this.props.form 属性
@Form.create()
class Step1 extends React.PureComponent {
    getSelectNodes = () => {
        this
            .props
            .dispatch({type: 'values/getNodes'});
    };
    render() {
        // form是表单的对象，下面两个属性为form的属性，与表单绑定以及字段校验
        const {form, dispatch, data} = this.props;
        const {getFieldDecorator, validateFields} = form;
        const nodeOptions = this
            .props
            .nodes
            .map(node => <Option key={node.id}>{node.node_name}</Option>);
        const onValidateForm = () => {
            validateFields((err, values) => {
                if (!err) {
                    values= {
                        ...values,
                        'recordTime': values['recordTime'].format('YYYY-MM-DD HH:mm:ss')
                    }
                    dispatch({
                        // 看表单形式为添加还是删除，加入一个选择框
                        type: 'values/saveStepFormData',
                        payload: values
                    });
                    router.push('/values/step-form/confirm/');
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
                        {getFieldDecorator('safe', {
                            initialValue: data.safe,
                            rules: [
                                {
                                    required: true,
                                    message: '数据是否安全'
                                }
                            ]
                        })(<Checkbox/>)}
                    </Form.Item>

                    {/* 数据提交时间 */}
                    {/* 时间picker这里需要做format化，而format函数需要标志出id类型 */}
                    <Form.Item {...formItemLayout} label="数据记录时间">
                        {getFieldDecorator('recordTime', {
                            rules: [
                                {
                                    type: 'object',
                                    required: true,
                                    message: 'Please select time!'
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
                            <Select onDropdownVisibleChange={this.getSelectNodes}>
                                {nodeOptions}
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
                    <h4>创建数据：</h4>
                    <p>
                        主要是以传感器的型号来指定的，比如XXXX-0001号传感器，并为它导入数据。
                    </p>
                    <h4>数值表的导入</h4>
                    <p>
                        手动导入时应注意选择对应的时间和id，然后导入数据需要选择好时间单位等等。
                    </p>
                </div>
            </Fragment>
        );
    }
}

export default Step1;
