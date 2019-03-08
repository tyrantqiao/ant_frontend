// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'tyrantqiao',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'tyrantqiao@icloud.com',
    signature: '欢迎大家一起交流',
    title: '用户界面',
    group: 'Java-tyrant',
    // 用户界面的标签页
    tags: [
      {
        key: '0',
        label: 'java后端',
      },
      {
        key: '1',
        label: '文章撰写',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    // mock/geographic/city.json
    geographic: {
      province: {
        label: '广东省',
        key: '440000',
      },
      city: {
        label: '广州市',
        key: '440100',
      },
    },
    address: '广州华农',
    phone: '0000-00000000',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'Tyrant Qiao',
      age: 21,
      address: 'Guangzhou SCAU',
    },
    {
      key: '2',
      name: 'Tyrant Xin',
      age: 99,
      address: 'Japan Tokyo',
    },
    {
      key: '3',
      name: 'Tyrant joe',
      age: 5,
      address: 'Thailand',
    },
  ],
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
