import React, {Component} from 'react';
import {AsyncLoadBizCharts} from '@/components/Charts/AsyncLoadBizCharts';
import {connect} from 'dva';
import {formatMessage, FormattedMessage} from 'umi/locale';
import {Row, Col, Card, Tooltip} from 'antd';
import {Pie, WaterWave, Gauge, TagCloud} from '@/components/Charts';
import NumberInfo from '@/components/NumberInfo';
import CountDown from '@/components/CountDown';
import ActiveChart from '@/components/ActiveChart';
import numeral from 'numeral';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import Authorized from '@/utils/Authorized';
import styles from './Monitor.less';

const {Secured} = Authorized;

const targetTime = new Date().getTime() + 3900000;

// use permission as a parameter
const havePermissionAsync = new Promise(resolve => {
    // Call resolve on behalf of passed
    setTimeout(() => resolve(), 300);
});

@Secured(havePermissionAsync)
@connect(({monitor, loading}) => ({monitor, loading: loading.models.monitor}))
class Monitor extends Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch({type: 'monitor/fetchSearchData'});
        dispatch({
            type: 'monitor/fetchSafeRate',
            payload: {
                'timescale': 'hour'
            }
        })
    }

    render() {
        const {monitor, loading} = this.props;
        const {tags, safeRate} = monitor;

        return (
            <GridContent>
                <Row gutter={24}>
                    <Col
                        xl={18}
                        lg={24}
                        md={24}
                        sm={24}
                        xs={24}
                        style={{
                        marginBottom: 24
                    }}>
                        <Card
                            title={< FormattedMessage id = "app.monitor.dataing-activity" defaultMessage = "Real-Time Dataing Activity" />}
                            bordered={false}>
                            <Row>
                                <Col md={6} sm={12} xs={24}>
                                    <NumberInfo
                                        subTitle={< FormattedMessage id = "app.monitor.total-collections" defaultMessage = "Total Collentions today" />}
                                        suffix="条"
                                        total={numeral(124543233).format('0,0')}/>
                                </Col>
                                <Col md={6} sm={12} xs={24}>
                                    <NumberInfo
                                        subTitle={< FormattedMessage id = "app.monitor.safe-rate" defaultMessage = "safe rate" />}
                                        total="92%"/>
                                </Col>
                                <Col md={6} sm={12} xs={24}>
                                    <NumberInfo
                                        subTitle={< FormattedMessage id = "app.monitor.total-collections-per-hour" defaultMessage = "Total collections per hour" />}
                                        suffix="条"
                                        total={numeral(234).format('0,0')}/>
                                </Col>
                            </Row>
                            <div className={styles.mapChart}>
                                <Tooltip
                                    title={< FormattedMessage id = "app.monitor.waiting-for-implementation" defaultMessage = "Waiting for implementation" />}>
                                    <img
                                        src="https://gw.alipayobjects.com/zos/antfincdn/h%24wFbzuuzz/HBWnDEUXCnGnGrRfrpKa.png"
                                        alt="map"/>
                                </Tooltip>
                            </div>
                        </Card>
                    </Col>
                    <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                        <Card
                            title={< FormattedMessage id = "app.monitor.safeRate" defaultMessage = "safeRate" />}
                            style={{
                            marginBottom: 24
                        }}
                            bodyStyle={{
                            textAlign: 'center'
                        }}
                            bordered={false}>
                            <Gauge
                                title={formatMessage({id: 'app.monitor.ratio', defaultMessage: 'Ratio'})}
                                height={180}
                                percent={safeRate}/>
                        </Card>
                    </Col>
                    <Col
                        xl={6}
                        lg={24}
                        sm={24}
                        xs={24}
                        style={{
                        marginBottom: 24
                    }}>
                        <Card
                            title={< FormattedMessage id = "app.monitor.popular-searches" defaultMessage = "Popular Searches" />}
                            loading={loading}
                            bordered={false}
                            bodyStyle={{
                            overflow: 'hidden'
                        }}>
                            <TagCloud data={tags} height={161}/>
                        </Card>
                    </Col>
                </Row>
            </GridContent>
        );
    }
}

export default props => (
    <AsyncLoadBizCharts>
        <Monitor {...props}/>
    </AsyncLoadBizCharts>
);
