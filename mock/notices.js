const getNotices = (req, res) =>
  res.json([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: '您收到了xx封邮件',
      datetime: '2019-01-01',
      type: 'notification',
    },
    {
      id: '000000002',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
      title: '钉钉来信',
      datetime: '2019-01-02',
      type: 'notification',
    },
    {
      id: '000000003',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
      title: '您已阅的通知',
      datetime: '2019-01-03',
      read: true,
      type: 'notification',
    },
  ]);

export default {
  'GET /api/notices': getNotices,
};
