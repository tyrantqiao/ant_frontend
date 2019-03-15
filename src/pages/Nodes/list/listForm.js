import React, {Fragment} from 'react';
import {connect} from 'dva';
import {
    Form,
    Input,
    Button,
    Select,
    Table,
    Divider,
    Tag,
    Popconfirm
} from 'antd';
// 根据router.config.jd生成的路由表存在于pages/.umi下
import router from 'umi/router';
import styles from './TableList.less';
import {delay} from 'q';

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
@connect(({node}) => ({nodes: node.nodes}))
// 这样包装后的组件会自带 this.props.form 属性
@Form.create()
class ListForm extends React.PureComponent {
    // columns只是用来渲染表格初始状态的，所以只要在page页定义即可，数据源在定义在models中
    list = [
        {
            title: 'Node_name',
            dataIndex: 'node_name',
            width: '20%',
            editable: true
        }, {
            title: 'Id',
            dataIndex: 'id',
            sorter: true,
            width: '10%'
        }, {
            title: 'Node_type',
            dataIndex: 'node_type',
            render: node_type => (
                <span>
                    <Tag
                        color={node_type.length > 5
                        ? 'geekblue'
                        : 'green'}
                        key={node_type}>
                        {node_type.toUpperCase()}
                    </Tag>
                </span>
            ),
            width: '20%',
            editable: true
        }, {
            title: 'MinVal',
            dataIndex: 'minVal',
            width: '10%',
            editable: true
        }, {
            title: 'MaxVal',
            dataIndex: 'maxVal',
            width: '10%',
            editable: true
        }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm title="确定删除?" onConfirm={() => this.deleteNode({id: record.id})}>
                        <a href="javascript:;">
                            Delete
                        </a>
                    </Popconfirm>
                    <Divider type="vertical"/> {/* 确认框 */}
                    <a href="javascript:;" onClick={() => this.updateNode(record)}>
                        Update
                    </a>
                </span>
            )
        }
    ];
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
    };

    // 更新node，更新完后刷新数据列表
    updateNode = params => {
        this
            .props
            .dispatch({type: 'node/updateNode', payload: params});
        this.fetch();
    };

    // 删除node，更新完后刷新数据列表
    deleteNode = id => {
        this
            .props
            .dispatch({type: 'node/deleteNode', payload: id});
        // 延迟是给delete完成后再次调度获得列表数据
        delay(8000);
        this.fetch();
    };

    fetch = () => {
        this.setState({loading: true});
        this.getNodes();
        this.setState({loading: false});
    };

    getNodes = () => {
        this
            .props
            .dispatch({type: 'node/getNodesList'});
    };

    render() {
        // form是表单的对象，下面两个属性为form的属性，与表单绑定以及字段校验
        const {form, dispatch} = this.props;
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
                    <Table columns={this.list} // react规范要求rowKey需要选择唯一字段作为key，或者自建一个key出来
                        // record则是每一行的记录
                        rowKey={record => record.id} dataSource={this.props.nodes} pagination={this.state.pagination} loading={this.state.loading} onChange={this.handleTableChange}/>
                </Form>
                <Divider style={{
                    margin: '40px 0 24px'
                }}/>
                <div className={styles.desc}>
                    <h3>数据节点列表展示</h3>
                    <h4>同时也是数据节点列表的管理</h4>
                    <p>是一个管理界面，将会有增删更改的能力。</p>
                </div>
            </Fragment>
        );
    }
}

export default ListForm;
