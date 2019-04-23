define(function (require, exports, module) {
    'use strict'
    var temp = require("./temp.html");

    module.exports = {
        name: "AppNav",
        template: temp,
        data() {
            return {
                menus: [
                    { route: '/', name: '首页' , children:false},
                    { route: '/user', name: '用户管理' , children:false},
                    { route: '/older',name:'老人档案',children:[{route: '/addOlder',name:'新增档案'},{route: '/olderList',name:'档案列表'}]},
                    { route: '/staff',name: '员工管理',children:[{route: '/volunteer',name:'志愿者管理'},{route: '/attentdant',name:'职员管理'}]},
                    { route: '/visitor', name: '访客登记',children:false},
                    { route: '/dormitory',name:'宿舍管理',children:false},
                    { route: '/admin', name: '系统管理' , children:[{route: '/administrators',name: '管理员管理'}, {route: '/log',name: '日志记录'}]},


                ],
                sublist: false
            }
        },
        computed: {
            options() {
                return this.$store.state.options;
            }
        },
        mounted() {
            // 刷新时以当前路由做为tab加入tabs
            if (this.$route.path !== '/' && this.$route.path.indexOf('userInfo') == -1) {
                this.$store.commit('add_tabs', { route: '/', name: '首页' });
                this.$store.commit('add_tabs', { route: this.$route.path, name: this.$route.name });
                this.$store.commit('set_active_index', this.$route.path);
            } else {
                this.$store.commit('add_tabs', { route: '/', name: '首页' });
                this.$store.commit('set_active_index', '/');
                this.$router.push('/');
            }
            this.GetMenuList();
        },
        methods: {
            GetMenuList: function () {
                var that = this;

                this.$http.get('/MenuHandler?method=get_menu_list', {
                    params: {
                        parent_id: 0
                    }
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            }
        }
    }

});