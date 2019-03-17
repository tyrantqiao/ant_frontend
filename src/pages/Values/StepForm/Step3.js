import React, {Fragment} from 'react';
import {connect} from 'dva';
import {Button, Row, Col, Tag} from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({values}) => ({data: values.step}))
class Step3 extends React.PureComponent {
    render() {
        const {data} = this.props;
        const onFinish = () => {
            router.push('/values/step-form/info');
        };
        const information = (
            <div className={styles.information}>
                <Row>
                    <Col xs={24} sm={8} className={styles.label}>
                        数据单位：
                    </Col>
                    <Col xs={24} sm={16}>
                        {data.unit}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8} className={styles.label}>
                        数据是否安全：
                    </Col>
                    <Col xs={24} sm={16}>
                        <span>
                            <Tag
                                color={data.safe === true
                                ? 'green'
                                : 'red'}
                                key={data.safe}>
                                {data
                                    .safe
                                    .toString()
                                    .toUpperCase()}
                            </Tag>
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8} className={styles.label}>
                        数据值
                    </Col>
                    <Col xs={24} sm={16}>
                        <span className={styles.number}>{data.val}</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8} className={styles.label}>
                        数据记录时间
                    </Col>
                    <Col xs={24} sm={16}>
                        {data.recordTime}
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={8} className={styles.label}>
                        数据节点id
                    </Col>
                    <Col xs={24} sm={16}>
                        <span className={styles.number}>{data.nodeId}</span>
                    </Col>
                </Row>
            </div>
        );
        const actions = (
            <Fragment>
                <Button type="primary" onClick={onFinish}>
                    再次添加
                </Button>
                <Button>查看请求表单</Button>
            </Fragment>
        );
        return (<Result
            type="success"
            title="操作成功"
            description="表单请求成功"
            extra={information}
            actions={actions}
            className={styles.result}/>);
    }
}

export default Step3;
