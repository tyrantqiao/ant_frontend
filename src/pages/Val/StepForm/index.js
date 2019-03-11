import React, {PureComponent, Fragment} from 'react';
import {Card, Steps} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../style.less';

const {Step} = Steps;

export default class StepForm extends PureComponent {
    getCurrentStep() {
        const {location} = this.props;
        const {pathname} = location;
        const pathList = pathname.split('/');
        switch (pathList[pathList.length - 1]) {
            case 'info':
                return 0;
            case 'confirm':
                return 1;
            case 'result':
                return 2;
            default:
                return 0;
        }
    }

    render() {
        const {location, children} = this.props;
        return (
            <PageHeaderWrapper
                title="数据管理"
                tabActiveKey={location.pathname}
                content="对数据进行操作">
                <Card bordered={false}>
                    <Fragment>
                        <Steps current={this.getCurrentStep()} className={styles.steps}>
                            <Step title="填写请求表单"/>
                            <Step title="确认请求表单"/>
                            <Step title="表单请求结果"/>
                        </Steps>
                        {children}
                    </Fragment>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
