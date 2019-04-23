define(function (require, exports, module) {
    'use strict';
    var temp = require('./temp.html');
    require('./style.css');
    module.exports = {
        name:"Template",
        template:temp,
        data(){

            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入昵称'));
                } else {
                    callback();
                }
            };
            var validateType = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请选择类型'));
                } else {
                    callback();
                }
            };
            var validateCount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入人数'));
                } else {
                    callback();
                }
            };
            var validateTarget = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入目标'));
                } else {
                    callback();
                }
            };
            var validateTask = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入任务'));
                } else {
                    callback();
                }
            };
            var validateTime = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入时间'));
                } else {
                    callback();
                }
            };
            var validateHead = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入负责人'));
                } else {
                    callback();
                }
            };
            var validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入电话'));
                } else {
                    callback();
                }
            };

            return{
                volunteer:[{
                    name:'',
                    team:'',
                    phone:'',
                    target:'',
                    starttime:'',
                    endtime:'',
                    task:'',
                    count:0,
                    head:''
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
                teamOptions: [{
                    value: '个人',
                    label: '个人'
                }, {
                    value: '团队',
                    label: '团队'
                }],
                teamSearch: '',
                nameSearch:'',
                insertForm:{
                    newName:'',
                    newTeam: [{
                        value: '个人',
                        label: '个人'
                    }, {
                        value: '团队',
                        label: '团队'
                    }],
                    newPhone:'',
                    newTarget:'',
                    newTime:[new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                    newTask:'',
                    newCount:0,
                    newHead:''
                },
                rules: {
                    newName:[
                        {required: true, validator:validateName, trigger: 'blur'}
                    ],
                    newTeam: [
                        {required: true, validator: validateType, trigger: 'blur' }
                    ],
                    newPhone: [
                        {required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    newTime:[
                        {required: true, validator: validateTime, trigger: 'blur'}
                    ],
                    newTask:[
                        {required: true, validator: validateTask, trigger: 'blur'}
                    ],
                    newCount:[
                        {required: true, validator: validateCount, trigger: 'blur'}
                    ],
                    newHead:[
                        {required: true, validator: validateHead, trigger: 'blur'}
                    ],
                    newTarget:[
                        {required: true, validator: validateTarget, trigger: 'blur'}
                    ]


                },
                dialogFormVisible:false,
                formLabelWidth: '120px'
            }
        },
        methods:{
            editRow(row){
                var self = this;
                alert(row.id);
            },
            submit:function(formName){
                var self = this;
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        var tempVolunteer = JSON.stringify({
                            name:self.insertForm.newName,
                            team:self.insertForm.newTeam,
                            head:self.insertForm.newHead,
                            count:self.insertForm.newCount,
                            phone:self.insertForm.newPhone,
                            target:self.insertForm.newTarget,
                            starttime:self.insertForm.newTime[0],
                            endtime:self.insertForm.newTime[1],
                            task:self.insertForm.newTask
                        });
                        let newVolunteer = JSON.parse(tempVolunteer);
                        axios.post('/addVolunteer',newVolunteer,{
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
            close:function(formName) {
                var self = this;
                self.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
            //获取数据
            findVTByPage(pageCode,pageSize){
                var self = this;
                var param = new URLSearchParams();
                param.append('pageCode', pageCode);
                param.append('pageSize', pageSize);

                axios.post('/findVTByPage', param
                ).then(function (result) {

                    self.pageConf.totalPage = result.data.total;
                    self.volunteer = result.data.rows;
                    //date数据数字转标准时间
                    for(var i = 0;i < result.data.total;i ++){
                        self.volunteer[i].starttime = self.transferTime(self.volunteer[i].starttime);
                        self.volunteer[i].endtime = self.transferTime(self.volunteer[i].endtime);
                    }

                }).catch(function (err) {
                    console.error(err);
                });
            },
            findVTByNameAndTeam(){
                var self = this;
                var param = new URLSearchParams();
                param.append('pageCode', self.pageConf.pageCode);
                param.append('pageSize', self.pageConf.pageSize);
                param.append('name',self.nameSearch);
                param.append('team',self.teamSearch);
                axios.post('/findVTByNameAndTeam', param
                ).then(function (result) {

                    self.pageConf.totalPage = result.data.total;
                    self.volunteer = result.data.rows;
                    //date数据数字转标准时间
                    for(var i = 0;i < result.data.total;i ++){
                        self.volunteer[i].starttime = self.transferTime(self.volunteer[i].starttime);
                        self.volunteer[i].endtime = self.transferTime(self.volunteer[i].endtime);
                    }

                }).catch(function (err) {
                    console.error(err);
                });
            },
            insert(){

                var self = this;
                self.dialogFormVisible = true
            },
            //pageSize改变时触发的函数
            handleSizeChange(val) {
                var self = this;
                this.findVTByPage(this.pageConf.pageCode, val);
                self.pageConf.pageSize = val;
            },
            //当前页改变时触发的函数
            handleCurrentChange(val) {
                this.findVTByPage(val, this.pageConf.pageSize);
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
            this.findVTByPage(this.pageConf.pageCode, this.pageConf.pageSize);
        }
    }

})