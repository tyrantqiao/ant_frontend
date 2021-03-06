// https://umijs.org/config/
import os from 'os';
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';
import slash from 'slash2';

const {pwa, primaryColor} = defaultSettings;
const {NODE_ENV, APP_TYPE, TEST} = process.env;

const plugins = [
    [
        'umi-plugin-react', {
            antd: true,
            dva: {
                hmr: true
            },
            locale: {
                enable: true, // default false
                default: 'zh-CN', // default chinese
                baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
            },
            dynamicImport: {
                loadingComponent: './components/PageLoading/index',
                webpackChunkName: true,
                level: 3
            },
            pwa: pwa
                ? {
                    workboxPluginMode: 'InjectManifest',
                    workboxOptions: {
                        importWorkboxFrom: 'local'
                    }
                }
                : {},
            ...(!TEST && os.platform() === 'darwin'
                ? {
                    dll: {
                        include: [
                            'dva', 'dva/router', 'dva/saga', 'dva/fetch'
                        ],
                        exclude: ['@babel/runtime']
                    },
                    hardSource: false
                }
                : {})
        }
    ]
];

// 针对 preview.pro.ant.design 的 GA 统计代码 业务上不需要这个
// TODO 可能需要修改的GA统计代码
if (APP_TYPE === 'site') {
    plugins.push([
        'umi-plugin-ga', {
            code: 'UA-72788897-6'
        }
    ]);
}

export default {
    // add for transfer to umi
    plugins,
    define : {
        APP_TYPE: APP_TYPE || ''
    },
    treeShaking : true,
    targets : {
        ie: 11
    },
    // 路由配置
    routes : pageRoutes,
    // Theme for antd https://ant.design/docs/react/customize-theme-cn
    theme : {
        'primary-color': primaryColor
    },
    externals : {
        '@antv/data-set': 'DataSet',
        bizcharts: 'BizCharts'
    },
    // 挂本地服务器代理，防止跨域请求，通过本地前端服务器向后端服务器发送请求
    // 同时由于这里这里是以django作为统一需要修改的请求，而django实际上并不是真正的请求名字 所以做了pathRewrite把它修改掉了
    // 只要跨域，都需要修改
    // 155.138.196.145
    // 193.112.28.19
    proxy : {
        '/django': {
            target: 'http://193.112.28.19:8001',
            changeOrigin: true,
            pathRewrite: {
                '^/django': ''
            }
        },
        '/amap': {
            target: 'https://restapi.amap.com',
            changeOrigin: true,
            pathRewrite: {
                '^/amap': ''
            }
        }
    },
    ignoreMomentLocale : true,
    lessLoaderOptions : {
        javascriptEnabled: true
    },
    disableRedirectHoist : true,
    cssLoaderOptions : {
        modules: true,
        getLocalIdent: (context, localIdentName, localName) => {
            if (context.resourcePath.includes('node_modules') || context.resourcePath.includes('ant.design.pro.less') || context.resourcePath.includes('global.less')) {
                return localName;
            }
            const match = context
                .resourcePath
                .match(/src(.*)/);
            if (match && match[1]) {
                const antdProPath = match[1].replace('.less', '');
                const arr = slash(antdProPath)
                    .split('/')
                    .map(a => a.replace(/([A-Z])/g, '-$1'))
                    .map(a => a.toLowerCase());
                return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
            }
            return localName;
        }
    },
    manifest : {
        basePath: '/'
    },

    chainWebpack : webpackPlugin
};
