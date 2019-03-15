import React, { PureComponent } from 'react';
import { List, Card, Icon, Dropdown, Menu, Avatar, Tooltip } from 'antd';
import numeral from 'numeral';
import { connect } from 'dva';
import { formatWan } from '@/utils/utils';
import stylesApplications from '../../List/Applications.less';

@connect(({ list }) => ({
  list,
}))
class Center extends PureComponent {
  render() {
    const {
      list: { list },
    } = this.props;
    // 用于给下拉框做拓展链接页面
    const itemMenu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="https://tyrantqiao.com/">
            个人博客
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/tyrantqiao/">
            个人GitHub
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://pro.ant.design/docs/server-cn/">
            ant-design模板
          </a>
        </Menu.Item>
      </Menu>
    );
    // 应用页卡片Info内容
    const CardInfo = ({ activeUser, newUser }) => (
      <div className={stylesApplications.cardInfo}>
        <div>
          <p>下载次数</p>
          <p>{activeUser}</p>
        </div>
        <div>
          <p>新增下载</p>
          <p>{newUser}</p>
        </div>
      </div>
    );
    return (
      <List
        rowKey="id"
        className={stylesApplications.filterCardList}
        grid={{ gutter: 24, xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{ paddingBottom: 20 }}
              actions={[
                <Tooltip title="下载">
                  <Icon type="download" />
                </Tooltip>,
                <Tooltip title="编辑">
                  <Icon type="edit" />
                </Tooltip>,
                <Tooltip title="分享">
                  <Icon type="share-alt" />
                </Tooltip>,
                <Dropdown overlay={itemMenu}>
                  <Icon type="ellipsis" />
                </Dropdown>,
              ]}
            >
              <Card.Meta avatar={<Avatar size="small" src={item.avatar} />} title={item.title} />
              <div className={stylesApplications.cardItemContent}>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    );
  }
}

export default Center;
