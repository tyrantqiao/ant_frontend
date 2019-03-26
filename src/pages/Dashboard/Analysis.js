import React, {Component, Suspense} from 'react';
import {connect} from 'dva';
import {Row, Col, Icon, Menu, Dropdown} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {getTimeDistance} from '@/utils/utils';
import styles from './Analysis.less';
import PageLoading from '@/components/PageLoading';
import {AsyncLoadBizCharts} from '@/components/Charts/AsyncLoadBizCharts';

const IntroduceRow = React.lazy(() => import ('./IntroduceRow'));
const DatasCard = React.lazy(() => import ('./DatasCard'));
const TopSearch = React.lazy(() => import ('./TopSearch'));
const ProportionSales = React.lazy(() => import ('./ProportionSales'));
const OfflineData = React.lazy(() => import ('./OfflineData'));

@connect(({chart, loading}) => ({chart, loading: loading.effects['chart/fetch']}))
class Analysis extends Component {
    state = {
        Type: 'all',
        currentTabKey: '',
        // 默认时间选择区域为一年
        rangePickerValue: getTimeDistance('year')
    };

    componentDidMount() {
        const {dispatch} = this.props;
        this.reqRef = requestAnimationFrame(() => {
            dispatch({type: 'chart/fetch'});
            dispatch({type: 'chart/fetchSearchData'});
            dispatch({type: 'chart/fetchSalesTypeData'});
            dispatch({
                type: 'chart/fetchNodesData',
                payload: {
                    timescale: 'year',
                    num: '2019',
                    type: 'count'
                }
            });
            dispatch({
                type: 'chart/fetchRankingListData',
                payload: {
                    limit: 7,
                    type: 'data'
                }
            });
            dispatch({
                type: 'chart/fetchRankingSafeRate',
                payload: {
                    limit: 7,
                    type: 'safe'
                }
            });
            dispatch({
                type: 'chart/fetchSafeRateData',
                payload: {
                    timescale: 'year',
                    num: 2019,
                    type: 'count'
                }
            })
        });
    }

    // 按时间区间获得数据
    getRangePickerData(){
        const {dispatch}=this.props;
        dispatch({
            type: 'chart/fetchNodesData',
            payload: {
                timescale: 'year',
                num: '2019',
                type: 'count'
            }
        });
        dispatch({
            type: 'chart/fetchRankingListData',
            payload: {
                limit: 7,
                type: 'data'
            }
        });
        dispatch({
            type: 'chart/fetchRankingSafeRate',
            payload: {
                limit: 7,
                type: 'safe'
            }
        });
        dispatch({
            type: 'chart/fetchSafeRateData',
            payload: {
                timescale: 'year',
                num: 2019,
                type: 'count'
            }
        })
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({type: 'chart/clear'});
        cancelAnimationFrame(this.reqRef);
    }

    handleChangeSalesType = e => {
        this.setState({salesType: e.target.value});
    };

    handleTabChange = key => {
        this.setState({currentTabKey: key});
    };

    handleRangePickerChange = rangePickerValue => {
        const {dispatch} = this.props;
        this.setState({rangePickerValue});

        dispatch({type: 'chart/fetchNodesData'});
    };

    // 时间选择框【前端】
    selectDate = type => {
        const {dispatch} = this.props;
        this.setState({rangePickerValue: getTimeDistance(type)});

        dispatch({type: 'chart/fetchNodesData'});
    };

    isActive = type => {
        const {rangePickerValue} = this.state;
        const value = getTimeDistance(type);
        if (!rangePickerValue[0] || !rangePickerValue[1]) {
            return '';
        }
        if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
            return styles.currentDate;
        }
        return '';
    };

    render() {
        const {rangePickerValue, salesType, currentTabKey} = this.state;
        const {chart, loading} = this.props;
        const {
            visitData,
            visitData2,
            nodesData,
            rankingListData,
            rankingSafeRateData,
            searchData,
            offlineData,
            offlineChartData,
            salesTypeData,
            safeRateData,
            salesTypeDataOnline,
            salesTypeDataOffline
        } = chart;
        // 电商的type为1，门店为2，其他为3
        let salesPieData = salesTypeData;
        if (salesType === 'other') {
            salesPieData = salesTypeData;
        } else {
            salesPieData = salesType === 'online'
                ? salesTypeDataOnline
                : salesTypeDataOffline;
        }

        const menu = (
            <Menu>
                <Menu.Item>自定义操作</Menu.Item>
            </Menu>
        );

        const dropdownGroup = (
            <span className={styles.iconGroup}>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Icon type="ellipsis"/>
                </Dropdown>
            </span>
        );

        const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

        return (
            <GridContent>
                {/* <Suspense fallback={< PageLoading />}>
                    <IntroduceRow loading={loading} visitData={visitData}/>
                </Suspense> */}
                <Suspense fallback={null}>
                    <DatasCard
                        rangePickerValue={rangePickerValue}
                        nodesData={nodesData}
                        rankingListData={rankingListData}
                        safeRateData={safeRateData}
                        rankingSafeRateData={rankingSafeRateData}
                        isActive={this.isActive}
                        handleRangePickerChange={this.handleRangePickerChange}
                        loading={loading}
                        selectDate={this.selectDate}/>
                </Suspense>
                <div className={styles.twoColLayout}>
                    <Row gutter={24}>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <Suspense fallback={null}>
                                <TopSearch
                                    loading={loading}
                                    visitData2={visitData2}
                                    selectDate={this.selectDate}
                                    searchData={searchData}
                                    dropdownGroup={dropdownGroup}/>
                            </Suspense>
                        </Col>
                        <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                            <Suspense fallback={null}>
                                <ProportionSales
                                    dropdownGroup={dropdownGroup}
                                    salesType={salesType}
                                    loading={loading}
                                    salesPieData={salesPieData}
                                    handleChangeSalesType={this.handleChangeSalesType}/>
                            </Suspense>
                        </Col>
                    </Row>
                </div>
                {/* <Suspense fallback={null}>
                    <OfflineData
                        activeKey={activeKey}
                        loading={loading}
                        offlineData={offlineData}
                        offlineChartData={offlineChartData}
                        handleTabChange={this.handleTabChange}/>
                </Suspense> */}
            </GridContent>
        );
    }
}

export default props => (
    <AsyncLoadBizCharts>
        <Analysis {...props}/>
    </AsyncLoadBizCharts>
);
