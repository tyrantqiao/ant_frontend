import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';

@connect(({ form }) => ({
  data: form.step,
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
            {data.nodeName}
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={8} className={styles.label}>
            数据节点属性：
          </Col>
          <Col xs={24} sm={16}>
            {data.nodeType}
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
