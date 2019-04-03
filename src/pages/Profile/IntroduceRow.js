import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './Analysis.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import Yuan from '@/utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = memo(({ loading, segementData, segementSafe, dailyCollect, totalCollect, totalSafe, dailySafe }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title={<FormattedMessage id="app.analysis.total-datas" defaultMessage="Total Datas" />}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => <Yuan>{totalCollect}</Yuan>}
        footer={
          <Field
            label={<FormattedMessage id="app.analysis.day-datas" defaultMessage="Daily Datas" />}
            value={dailyCollect}
          />
        }
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={segementData} />
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="app.analysis.totalsafes" defaultMessage="Total Safes" />}
        action={
          <Tooltip
            title={<FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />}
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        total={totalSafe}
        footer={
          <Field
            label={<FormattedMessage id="app.analysis.day-safeRate" defaultMessage="Daily SafeRate" />}
            value={dailySafe}
          />
        }
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={segementSafe} />
      </ChartCard>
    </Col>
  </Row>
));

export default IntroduceRow;
