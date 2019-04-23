
define(function (require, exports, module) {
    "use strict";
    var temp = require("@/main.html");
    var AppNav = require("@/AppNav/index");
    require("/resources/css/main.css");
    module.exports = {
        name: "OA_main",
        //new
        data() {
            var self = this;
            var validateInit = (rule, value, callback) => {

                if(value === '') {
                    callback(new Error('请输入初始密码'));
                }else{
                    if(value === self.password){
                        callback();
                    }else{
                        callback(new Error('密码输入错误'));
                    }

                }
            }
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.new) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                displayName:'',
                password:'',
                dialogFormVisible:false,
                form:{
                    init:'',
                    new:'',
                    check:''
                },
                formLabelWidth: '100px',
                rules: {
                    init:[
                        {required: true, validator:validateInit, trigger: 'blur'}
                    ],
                    new: [
                        {required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    check: [
                        {required: true, validator: validatePass2, trigger: 'blur' }
                    ]

                }
            }
        },
        template: temp,
        components: {
            AppNav
        },
        methods: {
            // tab切换时，动态的切换路由
            tabClick(tab) {
                let path = this.activeIndex;
                // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
                if (this.activeIndex === '/userInfo') {
                    path = this.activeIndex + '/' + this.$store.state.userInfo.name;
                }
                this.$router.push({ path: path });
            },
            tabRemove(targetName) {
                // 首页不可删除
                if (targetName == '/') {
                    return;
                }
                this.$store.commit('delete_tabs', targetName);
                if (this.activeIndex === targetName) {
                    // 设置当前激活的路由
                    if (this.options && this.options.length >= 1) {
                        this.$store.commit('set_active_index', this.options[this.options.length - 1].route);
                        this.$router.push({ path: this.activeIndex });
                    } else {
                        this.$router.push({ path: '/' });
                    }
                }
            },
            //new
            close:function(formName) {
                var self = this;
                self.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
            submit:function(formName) {
                var self = this;
                var message = "password";
                var value = self.form.new;
                var param = new URLSearchParams();
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        param.append('message',message);
                        param.append('value',value);
                        axios.post('/modify',param
                        ).then(function(res){
                            self.form.init = res.data;

                        }).catch(function(err){
                            console.error(err);
                        });
                        self.dialogFormVisible = false;
                        this.$refs[formName].resetFields();
                        this.$message({
                            showClose: true,
                            message: '恭喜你，修改成功',
                            type: 'success'
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
            getCurrentUser:function () {
                var self = this;
                axios.get('/getCurrentUser').then(function (res) {
                    self.displayName = res.data;
                }).catch(function (err) {
                    console.error(err);
                })
            },
            getPassword:function() {
                var self = this;
                axios.get('/getPassword').then(function (res) {
                    self.password = res.data;
                }).catch(function (err) {
                    console.error(err);
                })
            },
            logout:function () {
                this.$confirm('确认退出登录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    window.location.href = "/logout";
                }).catch(function () {

                });
            },
            modifynick:function () {

                var self = this;

                var param = new URLSearchParams();
                var message = "displayname";
                this.$prompt('请输入新昵称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern:  /\S/,
                    inputErrorMessage: '输入不能为空'
                }).then(({value}) => {
                    param.append('message',message);
                    param.append('value',value);
                    axios.post('/modify',param
                    ).then(function(res){
                        self.displayName = res.data;

                    }).catch(function(err){
                        console.error(err);
                    });
                    this.$message({
                        showClose: true,
                        message: '恭喜你，修改成功',
                        type: 'success'
                    });
                });
            }
        },
        computed: {
            options() {
                return this.$store.state.options;
            },
            activeIndex: {
                get() {
                    return this.$store.state.activeIndex;
                },
                set(val) {
                    this.$store.commit('set_active_index', val);
                }
            }
        },
        mounted() {
            console.log(this.activeIndex);
        },
        watch: {
            '$route'(to) {
                    let flag = false;
                    for (let option of this.options) {
                        if (option.name === to.name) {
                            flag = true;
                            console.log(to.path);
                            console.log('/' + to.path.split('/')[1]);
                            this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                            break;
                        }
                    }
                    if (!flag) {
                        console.log(to.path);
                        console.log('/' + to.path.split('/')[1]);
                        this.$store.commit('add_tabs', { route: '/' + to.path.split('/')[1], name: to.name });
                        this.$store.commit('set_active_index', '/' + to.path.split('/')[1]);
                    }

            }
        },
        created:function () {
            this.getCurrentUser();
            this.getPassword();
        }

    }
});