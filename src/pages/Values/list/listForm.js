import React, {Fragment} from 'react';
import {connect} from 'dva';
import {
    Form,
    Input,
    InputNumber,
    Table,
    Divider,
    DatePicker,
    TimePicker,
    Tag,
    Popconfirm,
    Icon,
    Button
} from 'antd';
// 根据router.config.jd生成的路由表存在于pages/.umi下
import {formatMessage, FormattedMessage} from 'umi/locale';
import moment from 'moment';
import router from 'umi/router';
import styles from './TableList.less';
import {delay} from 'q';
import Highlighter from 'react-highlight-words';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({
    form,
    index,
    ...props
}) => (
    <EditableContext.Provider value={form}>
        <tr {...props}/>
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing
                                ? (
                                    <FormItem
                                        style={{
                                        margin: 0
                                    }}>
                                        {getFieldDecorator(dataIndex, {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: `Please Input ${title}!`
                                                }
                                            ],
                                            initialValue: record[dataIndex]
                                        })(this.getInput())}
                                    </FormItem>
                                )
                                : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

// connect属于dva的语法糖，用于将数据绑定起来 这里就应该是负责连接models文件，以文件名形式绑定
@connect(({values, loading}) => ({datas: values.datas, loading: loading.values}))
// 这样包装后的组件会自带 this.props.form 属性 @Form.create()
class ListForm extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.datas,
            editingKey: '',
            searchText: ''
        };

        // columns只是用来渲染表格初始状态的，所以只要在page页定义即可，数据源在定义在models中
        this.columns = [
            {
                title: '数据id',
                dataIndex: 'id',
                sorter: (a, b) => a.id - b.id
            }, {
                title: '节点id',
                dataIndex: 'nodeId',
                sorter: (a, b) => a.nodeId - b.nodeId,
                editable: true
            },
            //  {
            //     title: '设备id',
            //     dataIndex: 'device_id',
            //     editable: true
            // }, 
            {
                title: '数据值',
                dataIndex: 'val',
                sorter: (a, b) => a.val - b.val,
                editable: true
            }, {
                title: '强度',
                dataIndex: 'intensity',
                sorter: (a, b) => a.intensity - b.intensity,
                render: intensity=>(<span>{intensity}dbm</span>),
                editable: true
            }, {
                title: '单位',
                dataIndex: 'unit',
                render: unit => (
                    <span>
                        <Tag
                            color={unit.length > 5
                            ? 'geekblue'
                            : 'green'}
                            key={unit}>
                            {unit.toUpperCase()}
                        </Tag>
                    </span>
                ),
                editable: true,
                ...this.getColumnSearchProps('unit')
            }, {
                title: '安全',
                dataIndex: 'safe',
                render: safe => (
                    <span>
                        <Tag
                            color={safe === true
                            ? 'green'
                            : 'red'}
                            key={safe}>
                            {safe
                                .toString()
                                .toUpperCase()}
                        </Tag>
                    </span>
                ),
                editable: true,
                ...this.getColumnSearchProps('safe')
            }, {
                title: '确认',
                dataIndex: 'confirmed',
                render: confirmed => (
                    <span>
                        <Tag
                            color={confirmed === true
                            ? 'green'
                            : 'red'}
                            key={confirmed}>
                            {confirmed
                                .toString()
                                .toUpperCase()}
                        </Tag>
                    </span>
                ),
                editable: true
            }, {
                title: '记录时间',
                dataIndex: 'recordTime',
                editable: true
            }, {
                title: '信号传输时间',
                dataIndex: 'time',
                editable: true
            }, {
                title: 'Action',
                dataIndex: 'action',
                render: (text, record) => {
                    const editable = this.isEditing(record);
                    return (
                        <span>
                            <Popconfirm title="确定删除?" onConfirm={() => this.deleteData({id: record.id})}>
                                <a href="javascript:;">
                                    Delete
                                </a>
                            </Popconfirm>
                            <Divider type="vertical"/> {/* 确认框 */}
                            {editable
                                ? (
                                    <span>
                                        <EditableContext.Consumer>
                                            {rowData => (
                                                <a
                                                    href="javascript:;"
                                                    onClick={() => this.save(rowData, record.id)}
                                                    style={{
                                                    marginRight: 8
                                                }}>
                                                    Save
                                                </a>
                                            )}
                                        </EditableContext.Consumer>
                                        <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.id.toString())}>
                                            <a>Cancel</a>
                                        </Popconfirm>
                                    </span>
                                )
                                : (
                                    <a onClick={() => this.edit(record.id.toString())}>Edit</a>
                                )}

                        </span>
                    )
                }
            }
        ];
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{
                padding: 8
            }}>
                <Input
                    ref={node => {
                    this.searchInput = node;
                }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value
                    ? [e.target.value]
                    : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{
                    width: 188,
                    marginBottom: 8,
                    display: 'block'
                }}/>
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{
                    width: 90,
                    marginRight: 8
                }}>
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{
                    width: 90
                }}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon
            type="search"
            style={{
            color: filtered
                ? '#1890ff'
                : undefined
        }}/>,
        onFilter: (value, record) => record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (<Highlighter
            highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0
        }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}/>)
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({searchText: ''});
    }

    // 表格可编辑行，是通过存入当前编辑的id，然后再将表格对应行id进行比较，目前是以id作为key来设置的，暂时用toString()先
    isEditing = record => record
        .id
        .toString() === this.state.editingKey;

    // 当组件开始渲染时，获取数据
    componentDidMount() {
        this.fetch();
    }

    cancel = () => {
        this.setState({editingKey: ''});
    };

    // TODO 修改id
    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            row = {
                ...row,
                id: key
            }
            this.setState({editingKey: ''});
            this.saveDataRow(row);
        });
    }

    edit(key) {
        this.setState({editingKey: key});
    }

    // 删除Data，更新完后刷新数据列表
    deleteData = id => {
        this
            .props
            .dispatch({type: 'values/deleteData', payload: id});
        // 延迟是给delete完成后再次调度获得列表数据
        delay(8000);
        this.fetch();
    };

    // 更改每行data的内容,装值时要用payload装过去
    saveDataRow = rowData => {
        this
            .props
            .dispatch({type: 'values/updateData', payload: rowData});
        // 延迟是给delete完成后再次调度获得列表数据
        delay(10000);
        this.fetch();
    }

    fetch = () => {
        this.setState({loading: true});
        this.getData();
        this.setState({loading: false});
    };

    getData = () => {
        this
            .props
            .dispatch({type: 'values/getDataList'});
    };

    render() {
        // form是表单的对象，下面两个属性为form的属性，与表单绑定以及字段校验
        const {dispatch} = this.props;

        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        };

        const columns = this
            .columns
            .map((col) => {
                if (!col.editable) {
                    return col;
                }
                return {
                    ...col,
                    onCell: record => ({
                        record,
                        inputType: col
                            .dataIndex
                            .indexOf('val') > -1
                            ? 'number'
                            : 'text',
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: this.isEditing(record)
                    })
                };
            });
        return (
            <Fragment>
                <Form layout="horizontal" hideRequiredMark>
                    {/* 展示数据 */}
                    <Table components={components} // bordered
                        dataSource={this.props.datas} rowKey={record => record.id} columns={columns} rowClassName="editable-row" pagination={{
                        onChange: this.cancel
                    }}/>
                </Form>
                <Divider style={{
                    margin: '40px 0 24px'
                }}/>
                <div className={styles.desc}>
                    <h3>数据列表展示</h3>
                    <h4>同时也是数据列表的管理</h4>
                    <p>是一个管理界面，有增删更改的能力。</p>
                </div>
            </Fragment>
        );
    }
}

export default ListForm;
