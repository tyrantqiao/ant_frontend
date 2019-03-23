import React, {memo} from 'react';
import {Row, Col, Card, Tabs, DatePicker} from 'antd';
import {FormattedMessage, formatMessage} from 'umi/locale';
import numeral from 'numeral';
import styles from './Analysis.less';
import {Bar} from '@/components/Charts';

const {RangePicker} = DatePicker;
const {TabPane} = Tabs;

const DatasCard = memo(({
    rangePickerValue,
    nodesData,
    safeRateData,
    rankingListData,
    rankingSafeRateData,
    isActive,
    handleRangePickerChange,
    loading,
    selectDate
}) => (
    <Card loading={loading} bordered={false} bodyStyle={{
        padding: 0
    }}>
        <div className={styles.datasCard}>
            <Tabs
                tabBarExtraContent={< div className = {
                styles.datasExtraWrap
            } > <div className={styles.datasExtra}>
                    <a className={isActive('today')} onClick={() => selectDate('today')}>
                        <FormattedMessage id="app.analysis.all-day" defaultMessage="All Day"/>
                    </a>
                    <a className={isActive('week')} onClick={() => selectDate('week')}>
                        <FormattedMessage id="app.analysis.all-week" defaultMessage="All Week"/>
                    </a>
                    <a className={isActive('month')} onClick={() => selectDate('month')}>
                        <FormattedMessage id="app.analysis.all-month" defaultMessage="All Month"/>
                    </a>
                    <a className={isActive('year')} onClick={() => selectDate('year')}>
                        <FormattedMessage id="app.analysis.all-year" defaultMessage="All Year"/>
                    </a>
                </div>
                {/* 时间选择，这里要做一个时间查询 */
            } < RangePicker value = {
                rangePickerValue
            }
            onChange = {
                handleRangePickerChange
            }
            style = {{ width: 256 }}/> </div >}
                size="large"
                tabBarStyle={{
                marginBottom: 24
            }}>
                <TabPane
                    tab={< FormattedMessage id = "app.analysis.datas" defaultMessage = "Datas" />}
                    key="datas">
                    <Row>
                        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                            <div className={styles.datasBar}>
                                <Bar
                                    height={295}
                                    title={< FormattedMessage id = "app.analysis.datas-trend" defaultMessage = "Datas Trend" />}
                                    data={nodesData}/>
                            </div>
                        </Col>
                        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                            <div className={styles.datasRank}>
                                <h4 className={styles.rankingTitle}>
                                    <FormattedMessage
                                        id="app.analysis.datas-ranking"
                                        defaultMessage="datas Ranking"/>
                                </h4>
                                <ul className={styles.rankingList}>
                                    {rankingListData.map((item, i) => (
                                        <li key={item.title}>
                                            <span
                                                className={`${styles.rankingItemNumber} ${i < 3
                                                ? styles.active
                                                : ''}`}>
                                                {i + 1}
                                            </span>
                                            <span className={styles.rankingItemTitle} title={item.title}>
                                                {item.title}
                                            </span>
                                            <span className={styles.rankingItemValue}>
                                                {numeral(item.total).format('0,0')}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane
                    tab={< FormattedMessage id = "app.analysis.safes" defaultMessage = "safes" />}
                    key="views">
                    <Row>
                        <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                            <div className={styles.datasBar}>
                                <Bar
                                    height={292}
                                    title={< FormattedMessage id = "app.analysis.safes-trend" defaultMessage = "safes Trend" />}
                                    data={safeRateData}/>
                            </div>
                        </Col>
                        <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                            <div className={styles.datasRank}>
                                <h4 className={styles.rankingTitle}>
                                    <FormattedMessage
                                        id="app.analysis.safes-ranking"
                                        defaultMessage="safes Ranking"/>
                                </h4>
                                <ul className={styles.rankingList}>
                                    {rankingSafeRateData.map((item, i) => (
                                        <li key={item.title}>
                                            <span
                                                className={`${styles.rankingItemNumber} ${i < 3
                                                ? styles.active
                                                : ''}`}>
                                                {i + 1}
                                            </span>
                                            <span className={styles.rankingItemTitle} title={item.title}>
                                                {item.title}
                                            </span>
                                            <span>{numeral(item.total).format('0,0')}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </div>
    </Card>
));

export default DatasCard;
