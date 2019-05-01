define(function (require, exports, module) {
    'use strict';
    var main = require("@/main")
    var ElementTable = require("@/ElementTable/index")
    var DetailInfo = require("@/DetailInfo/index")
    var Template = require("@/Template/index")
    var Administrators = require("@/Administrators/index")
    var Visitors = require("@/Visitors/index")
    var OlderForm = require("@/OlderForm/index")
    var OlderList = require("@/OlderList/index")
    var Volunteers = require("@/Volunteers/index")
    var Attendants = require("@/Attendants/index")
    var Dormitory = require("@/Dormitory/index")
    const router = new VueRouter({
        routes: [
            {
                path: '/',
                name: '首页',
                component: main,
                children: [
                    {
                        path: '/user',
                        name: '用户管理',
                        component: ElementTable,
                    },
                    {
                        path: '/userInfo/:id',
                        name: '用户详情页',
                        component: DetailInfo
                    },
                    {
                        path:'/dormitory',
                        name:'宿舍管理',
                        component: Dormitory
                    },
                    {
                        path:'/older',
                        name:'老人档案',
                        component:Template,
                        children:[
                            {
                                path:'/addOlder',
                                name:'新增档案',
                                component:OlderForm
                            },
                            {
                                path:'/olderList',
                                name:'档案列表',
                                component:OlderList
                            }
                        ]

                    },
                    {
                        path:'/staff',
                        name:'员工管理',
                        component:Template,
                        children:[
                            {
                                path:'/volunteer',
                                name:'志愿者管理',
                                component:Volunteers
                            },
                            {
                                path:'/attentdant',
                                name:'职员管理',
                                component:Attendants
                            }
                        ]
                    },
                    {
                      path:'/visitor',
                      name:'访客登记',
                      component:  Visitors
                    },

                    {
                        path: '/admin',
                        name: '系统管理',
                        component:Template,
                        children:[
                            {
                                path: '/administrators',
                                name: '管理员管理',
                                component: Administrators
                            },
                            {
                                path: '/log',
                                name: '日志记录',
                                component: Administrators
                            }
                        ]

                    }

                ]
            },
            {
                path: '*',
                redirect: '/'
            }
        ]
    });
    module.exports = router;
});