import React, {memo} from 'react';
import {
    Row,
    Col,
    Table,
    Tooltip,
    Card,
    Icon
} from 'antd';
import {FormattedMessage} from 'umi/locale';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import styles from './Analysis.less';
import NumberInfo from '@/components/NumberInfo';
import {MiniArea} from '@/components/Charts';

const columns = [
    {
        title: <FormattedMessage id="app.analysis.table.id" defaultMessage="id"/>,
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id
    }, {
        title: (<FormattedMessage
            id="app.analysis.table.search-keyword"
            defaultMessage="Search keyword"/>),
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>
    }, {
        title: <FormattedMessage id="app.analysis.table.searchs" defaultMessage="Searchs"/>,
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight
    }
];

const TopSearch = memo(({loading, visitData2, searchData, dropdownGroup}) => (
    <Card
        loading={loading}
        bordered={false}
        title={< FormattedMessage id = "app.analysis.top-history-search" defaultMessage = "Top History Search" />}
        extra={dropdownGroup}
        style={{
        marginTop: 24
    }}>
        <Table
            rowKey={record => record.index}
            size="small"
            columns={columns}
            dataSource={searchData}
            pagination={{
            style: {
                marginBottom: 0
            },
            pageSize: 5
        }}/>
    </Card>
));

export default TopSearch;
