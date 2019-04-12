export default[
    { // user
        path : '/user',
        component : '../layouts/UserLayout',
        routes : [
            {
                path: '/user',
                redirect: '/user/login'
            }, {
                path: '/user/login',
                name: 'login',
                component: './User/Login'
            }, {
                path: '/user/register',
                name: 'register',
                component: './User/Register'
            }, {
                path: '/user/register-result',
                name: 'register.result',
                component: './User/RegisterResult'
            }
        ]
    },
    // app
    {
        path : '/',
        component : '../layouts/BasicLayout',
        Routes : ['src/pages/Authorized'],
        routes : [
            {
                path: '/',
                redirect: '/dashboard/analysis'
            }, {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'dashboard',
                routes: [
                    {
                        path: '/dashboard/analysis',
                        name: 'analysis',
                        component: './Dashboard/Analysis'
                    }, {
                        path: '/dashboard/monitor',
                        name: 'monitor',
                        component: './Dashboard/Monitor'
                    }
                ]
            },
            // 数据页
            {
                path: '/values',
                icon: 'form',
                name: 'values',
                routes: [
                    {
                        path: '/values/list-form',
                        name: 'valuesListform',
                        component: './Values/list/listForm'
                    }, {
                        path: '/values/step-form',
                        name: 'valStepform',
                        component: './Values/StepForm',
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/values/step-form',
                                redirect: '/values/step-form/info'
                            }, {
                                path: '/values/step-form/info',
                                name: 'info',
                                component: './Values/StepForm/Step1'
                            }, {
                                path: '/values/step-form/confirm',
                                name: 'confirm',
                                component: './Values/StepForm/Step2'
                            }, {
                                path: '/values/step-form/result',
                                name: 'result',
                                component: './Values/StepForm/Step3'
                            }
                        ]
                    }
                ]
            },
            // 数据节点页
            {
                path: '/node',
                icon: 'form',
                // name决定menu的生成名字
                name: 'node',
                routes: [
                    // 数据列表展示页面
                    {
                        path: '/node/list-form',
                        name: 'nodeListform',
                        component: './Nodes/list/listForm'
                    }, {
                        path: '/node/step-form',
                        name: 'nodeStepform',
                        component: './Nodes/StepForm',
                        hideChildrenInMenu: true,
                        routes: [
                            {
                                path: '/node/step-form',
                                redirect: '/node/step-form/info'
                            }, {
                                path: '/node/step-form/info',
                                name: 'info',
                                component: './Nodes/StepForm/Step1'
                            }, {
                                path: '/node/step-form/confirm',
                                name: 'confirm',
                                component: './Nodes/StepForm/Step2'
                            }, {
                                path: '/node/step-form/result',
                                name: 'result',
                                component: './Nodes/StepForm/Step3'
                            }
                        ]
                    }
                ]
            }, {
                path: '/profile',
                name: 'profile',
                icon: 'profile',
                routes: [
                    {
                        path: '/profile/basic',
                        name: 'basic',
                        component: './Profile/BasicProfile'
                    }, {
                        path: '/profile/basic/:id',
                        name: 'basic',
                        hideInMenu: true,
                        component: './Profile/BasicProfile'
                    }
                ]
            }, {
                name: 'exception',
                icon: 'warning',
                path: '/exception',
                routes: [
                    {
                        path: '/exception/403',
                        name: 'not-permission',
                        component: './Exception/403'
                    }, {
                        path: '/exception/404',
                        name: 'not-find',
                        component: './Exception/404'
                    }, {
                        path: '/exception/500',
                        name: 'server-error',
                        component: './Exception/500'
                    }, {
                        path: '/exception/trigger',
                        name: 'trigger',
                        hideInMenu: true,
                        component: './Exception/TriggerException'
                    }
                ]
            }, {
                name: 'account',
                icon: 'user',
                path: '/account',
                routes: [
                    {
                        path: '/account/center',
                        name: 'center',
                        component: './Account/Center/Center',
                        routes: [
                            {
                                path: '/account/center',
                                redirect: '/account/center/articles'
                            }, {
                                path: '/account/center/articles',
                                component: './Account/Center/Articles'
                            }, {
                                path: '/account/center/applications',
                                component: './Account/Center/Applications'
                            }, {
                                path: '/account/center/projects',
                                component: './Account/Center/Projects'
                            }
                        ]
                    }, {
                        path: '/account/settings',
                        name: 'settings',
                        component: './Account/Settings/Info',
                        routes: [
                            {
                                path: '/account/settings',
                                redirect: '/account/settings/base'
                            }, {
                                path: '/account/settings/base',
                                component: './Account/Settings/BaseView'
                            }, 
                        ]
                    }
                ]
            }, {
                component: '404'
            }
        ]
    }
];