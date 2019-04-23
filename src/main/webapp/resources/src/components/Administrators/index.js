define(function (require, exports, module) {
    'use strict';
    var temp = require("./temp.html");
    module.exports = {
        name: "Template",
        template: temp,
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            var validateSuperPass = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请输入密码'));
                }else{
                    var SuperPwd;
                    axios.get('/findSuperPwdById').then(function (res) {
                        SuperPwd = res.data;
                        if(SuperPwd === value){
                            callback();
                        }else{
                            callback(new Error('密码输入错误'));
                        }
                    }).catch(function (err) {
                        console.error(err);
                    })


                }
            };
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            var validateDisplay = (rule, value,callback) => {
                if (value === '') {
                    callback(new Error('请输入昵称'));
                } else {
                    callback();
                }
            };

            //用户信息
            //element-ui的table需要的参数必须是Array类型的
            return{
                displaySearch:'',
                user:[{
                    id:'',
                    username:'',
                    displayname:'',

                    createtime:'',
                    createby:''
                }],
                pageConf: {
                    //设置一些初始值(会被覆盖)
                    pageCode: 1, //当前页
                    pageSize: 4, //每页显示的记录数
                    totalPage: 12, //总记录数
                    pageOption: [4, 5, 10], //分页选项
                    handleCurrentChange: function () {
                        console.log("页码改变了");
                    }
                },
                insertForm:{
                    superPwd:'',
                    newUsername:'',
                    newDisplay:'',
                    newPwd:''
                },
                dialogFormVisible:false,
                formLabelWidth: '120px',
                rules: {
                    superPwd:[
                        {required: true, validator:validateSuperPass, trigger: 'blur'}
                    ],
                    newPwd: [
                        {required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    newDisplay: [
                        {required: true, validator: validateDisplay, trigger: 'blur' }
                    ],
                    newUsername:[
                        {required: true, validator: validateUsername, trigger: 'blur'}
                    ]

                }
            }

        },
        methods: {
            submit:function(formName) {
                var self = this;

                this.$refs[formName].validate((valid) => {
                    if(valid){
                        var tempuser = JSON.stringify({
                            username:self.insertForm.newUsername,
                            displayname:self.insertForm.newDisplay,
                            userpassword:self.insertForm.newPwd
                        });
                        let newuser = JSON.parse(tempuser);

                        axios.post('/addUser',newuser,{
                            headers: {
                                "Content-Type": "application/json;charset=utf-8"  //头部信息
                            }
                        }).then(function (res) {

                        }).catch(function (err) {
                            console.error(err);
                        });
                        self.dialogFormVisible = false;
                        this.$refs[formName].resetFields();
                        this.$message({
                            showClose: true,
                            message: '恭喜你，添加成功',
                            type: 'success'
                        });


                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            insert(){

                var self = this;
                self.dialogFormVisible = true
            },
            findByDisplayName(){
                var self = this;
                var param = new URLSearchParams();
                param.append('pageCode', self.pageConf.pageCode);
                param.append('pageSize', self.pageConf.pageSize);
                param.append('displayname',self.displaySearch);
                axios.post('/findByDisplayName', param
                ).then(function (result) {

                    self.pageConf.totalPage = result.data.total;
                    self.user = result.data.rows;
                    //date数据数字转标准时间
                    for(var i = 0;i < result.data.total;i ++){

                        self.user[i].createtime = self.transferTime(self.user[i].createtime);
                    }
                }).catch(function (err) {
                    console.error(err);
                });
            },
            deleteRow(row) {
                alert(row.id);
                var self = this;
                var param = new URLSearchParams();
                param.append('id', row.id);

                axios.post('/deleteById',param).then(function (res) {

                }).catch(function (err) {
                    console.error(err);
                });

                this.$message({
                    showClose: true,
                    message: '恭喜你，删除成功',
                    type: 'success'
                });

            },
            close:function(formName) {
                var self = this;
                self.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
            findByPage(pageCode, pageSize) {
                var self = this;
                var param = new URLSearchParams();
                param.append('pageCode', pageCode);
                param.append('pageSize', pageSize);

                axios.post('/findByPage', param
                ).then(function (result) {

                    self.pageConf.totalPage = result.data.total;
                    self.user = result.data.rows;
                    //date数据数字转标准时间
                    for(var i = 0;i < result.data.total;i ++){

                        self.user[i].createtime = self.transferTime(self.user[i].createtime);
                    }
                }).catch(function (err) {
                    console.error(err);
                });
            },
            //pageSize改变时触发的函数
            handleSizeChange(val) {
                var self = this;
                this.findByPage(this.pageConf.pageCode, val);
                self.pageConf.pageSize = val;

            },
            //当前页改变时触发的函数
            handleCurrentChange(val) {
                this.findByPage(val, this.pageConf.pageSize);
            },
            transferTime(cTime) {

                var jsonDate = new Date(parseInt(cTime));

                Date.prototype.format = function (format) {
                    var o = {
                        //获得解析出来数据的相应信息，可参考js官方文档里面Date对象所具备的方法
                        "y+": this.getFullYear(),//得到对应的年信息
                        "M+": this.getMonth() + 1, //得到对应的月信息，得到的数字范围是0~11，所以要加一
                        "d+": this.getDate(), //得到对应的日信息
                        "h+": this.getHours(), //得到对应的小时信息 
                        "m+": this.getMinutes(), //得到对应的分钟信息
                        "s+": this.getSeconds(), //得到对应的秒信息

                    }

                    //将年转换为完整的年形式
                    if (/(y+)/.test(format)) {
                        format = format.replace(RegExp.$1,
                            (this.getFullYear() + "")
                                .substr(4 - RegExp.$1.length));
                    }

                    //连接得到的年月日 时分秒信息
                    for (var k in o) {
                        if (new RegExp("(" + k + ")").test(format)) {
                            format = format.replace(RegExp.$1,
                                RegExp.$1.length == 1 ? o[k] : ("00" + o[k])
                                    .substr(("" + o[k]).length));
                        }
                    }
                    return format;
                }
                var newDate = jsonDate.format("yyyy-MM-dd hh:mm:ss");
                return newDate;
            }
        },
        created(){
            this.findByPage(this.pageConf.pageCode, this.pageConf.pageSize);
        }
    }
});