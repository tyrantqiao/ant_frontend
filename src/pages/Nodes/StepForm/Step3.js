import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ node }) => ({
  data: node.step,
}))
class Step3 extends React.PureComponent {
  render() {
    const { data } = this.props;
    const onFinish = () => {
      router.push('/node/step-form/info');
    };
    const information = (
      <div className={styles.information}>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            数据节点名称：
          </Col>
          <Col xs={24} sm={16}>
            {data.node_name}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            数据节点属性：
          </Col>
          <Col xs={24} sm={16}>
            {data.node_type}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            最小安全值：
          </Col>
          <Col xs={24} sm={16}>
          <span className={styles.number}>{data.minVal}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            最大安全值：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.number}>{data.maxVal}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            订阅数据节点：
          </Col>
          <Col xs={24} sm={16}>
            {data.subscribe==true?'true':'false'}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            节点物理id：
          </Col>
          <Col xs={24} sm={16}>
            {data.nodeId}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            行政区编号：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.number}>{data.adcode}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            当前经度：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.number}>{data.longitude}</span>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            当前纬度：
          </Col>
          <Col xs={24} sm={16}>
            <span className={styles.number}>{data.latitude}</span>
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
    return (
      <Result
        type="success"
        title="操作成功"
        description="表单请求成功"
        extra={information}
        actions={actions}
        className={styles.result}
      />
    );
  }
}

export default Step3;
