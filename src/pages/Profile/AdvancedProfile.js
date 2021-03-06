import styles from './BasicProfile.less';
import GeographicView from './GeographicView';
import React, {Component, Suspense, Fragment} from 'react';
import {connect} from 'dva';
import {
    Row,
    Col,
    Icon,
    Menu,
    Select,
    Dropdown,
    Button,
    Form
} from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {getTimeDistance} from '@/utils/utils';
import {formatMessage, FormattedMessage} from 'umi/locale';
import PageLoading from '@/components/PageLoading';
import {AsyncLoadBizCharts} from '@/components/Charts/AsyncLoadBizCharts';

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: {
        marginBottom: 24
    }
};

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        span: 5
    },
    wrapperCol: {
        span: 19
    }
};

const validatorGeographic = (rule, value, callback) => {
    const {province, city} = value;
    if (!province.key) {
        callback('Please input your province!');
    }
    if (!city.key) {
        callback('Please input your city!');
    }
    callback();
};

const IntroduceRow = React.lazy(() => import ('./IntroduceRow'));
const OfflineData = React.lazy(() => import ('./OfflineData'));

// 接入数据时必须要导入类本身，然后才可以通过const {params}= class的形式获取里面的参数
@connect(({profile}) => ({profile}))
@Form.create()
class AdvancedProfile extends React.PureComponent {
    state = {
        currentTabKey: '',
    };

    componentDidMount() {
        const {dispatch} = this.props;
        // dispatch({type: "profile/getNode", payload: this.nodeId});
    }

    handleTabChange = key => {
        this.setState({currentTabKey: key});
    };

    render() {
        const {form, dispatch, profile, nodeId} = this.props;
        const {currentTabKey} = this.state;
        const {
            visitData,
            nodes,
            offlineData,
            offlineChartData,
            dailyCollect,
            totalSafe,
            dailySafe,
            segementSafe,
            segementData,
            totalCollect,
            lineChartData
        } = profile;
        const {getFieldDecorator, validateFields} = form;

        const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);
        return (
            <Fragment>
                <Row>
                    <Suspense fallback={< PageLoading />}>
                        <IntroduceRow
                            dailySafe={dailySafe}
                            totalSafe={totalSafe}
                            dailyCollect={dailyCollect}
                            segementSafe={segementSafe}
                            segementData={segementData}
                            totalCollect={totalCollect}
                            visitData={visitData}/>
                    </Suspense>
                </Row>
                <Row>
                    <Suspense fallback={null}>
                        <OfflineData
                            activeKey={activeKey}
                            lineChartData={lineChartData}
                            offlineData={offlineData}
                            offlineChartData={offlineChartData}
                            handleTabChange={this.handleTabChange}/>
                    </Suspense>
                </Row>
            </Fragment>
        );
    }
}

// Biz Error解决方法
export default props => (
    <AsyncLoadBizCharts>
        <AdvancedProfile {...props}/>
    </AsyncLoadBizCharts>
);
