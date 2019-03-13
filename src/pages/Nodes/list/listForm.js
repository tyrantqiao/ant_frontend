import React, {Fragment} from 'react';
import {connect} from 'dva';
import {
    Form,
    Input,
    Button,
    Select,
    Table,
    Divider,
    Tag
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
@connect(({node}) => ({data: node.list}))
// 这样包装后的组件会自带 this.props.form 属性
@Form.create()
class Step1 extends React.PureComponent {

    state = {
        pagination: {},
        loading: false
    };

    // 当组件开始渲染时，获取数据
    componentDidMount() {
        this.fetch();
    }

    handleTableChange = (pagination, sorter) => {
        const pager = {
            ...this.state.pagination
        };
        pager.current = pagination.current;
        this.setState({pagination: pager});
        this.fetch({results: pagination.pageSize, page: pagination.current, sortField: sorter.field, sortOrder: sorter.order});
    }

    fetch = () => {
        this.setState({loading: true});
        dispatch('/node/getNodes');
        pagination=Object.keys(nodes).length;
        this.setState({loading: false,  pagination});
    }

    render() {
        // form是表单的对象，下面两个属性为form的属性，与表单绑定以及字段校验
        const {form, dispatch, data} = this.props;
        const {getFieldDecorator, validateFields} = form;
        const onValidateForm = () => {
            validateFields((err, values) => {
                if (!err) {
                    dispatch({
                        // 看表单形式为添加还是删除，加入一个选择框
                        type: 'node/saveListForm',
                        payload: values
                    });
                }
            });
        };
        return (
            <Fragment>
                <Form layout="horizontal" hideRequiredMark>
                    {/* 展示数据 */}
                    <Table
                        columns={data}
                        rowKey={record => record.login.uuid}
                        dataSource={nodes}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}/>
                </Form>
                <Divider style={{
                    margin: '40px 0 24px'
                }}/>
                <div className={styles.desc}>
                    <h3>数据节点列表展示</h3>
                    <h4>同时也是数据节点列表的管理</h4>
                    <p>
                        是一个管理界面，将会有增删更改的能力。
                    </p>
                </div>
            </Fragment>
        );
    }
}

export default Step1;
