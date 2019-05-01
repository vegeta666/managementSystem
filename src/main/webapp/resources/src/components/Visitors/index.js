define(function (require, exports, module) {
    'use strict';
    var temp = require("./temp.html");
    module.exports = {
        name: "Template",
        template: temp,
        data(){
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            this.getOlderNameList();
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入名字'));
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
            var validateOlderName = (rule, value, callback) => {
                var self = this;
                //alert(self.olderNameListLen);
                if (value === '') {
                    callback(new Error('请输入老人名字'));
                } else {
                    var olderFlag = false;
                    for(var i = 0;i < self.olderNameListLen;i ++){
                        if(self.olderNameList[i] === value){
                            olderFlag = true;
                        }
                    }
                    if(olderFlag === false){
                        callback(new Error('老人不存在'));
                    }else{
                        callback();
                    }

                }
            };
            var validateIdcard = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入身份证号'));
                } else {
                    if(reg.test(value) === false)
                    {
                        callback(new Error('身份证号不合法，请重新输入！'));
                    }else{
                        callback();
                    }

                }
            };
            var validateRelationship = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入关系'));
                } else {
                    callback();
                }
            };
            return{
                visitor:[{
                    name:'',
                    phone:'',
                    vtime:'',
                    oldername:'',
                    relationship:'',
                    operator:'',
                    idcard:''

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
                adminOptions: [],
                adminSearch: '',
                nameSearch:'',
                dialogFormVisible:false,
                insertForm:{
                    newName:'',
                    newPhone:'',
                    newIdcard:'',
                    newOlderName:'',
                    newRelationship:'',
                },
                rules: {
                    newName:[
                        {required: true, validator:validateName, trigger: 'blur'}
                    ],
                    newPhone: [
                        {required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    newIdcard: [
                        {required: true, validator: validateIdcard, trigger: 'blur' }
                    ],
                    newOlderName: [
                        {required: true, validator: validateOlderName, trigger: 'blur' }
                    ],
                    newRelationship: [
                        {required: true, validator: validateRelationship, trigger: 'blur' }
                    ]

                },
                olderNameList:[],
                olderNameListLen:''

            }
        },
        methods:{
            submit(formName){
                var self = this;
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        var tempVisitor = JSON.stringify({
                            name:self.insertForm.newName,
                            phone:self.insertForm.newPhone,
                            idcard:self.insertForm.newIdcard,
                            oldername:self.insertForm.newOlderName,
                            relationship:self.insertForm.newRelationship
                        });
                        let newVisitor = JSON.parse(tempVisitor);
                        axios.post('/addVisitor',newVisitor,{
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
            //获取数据
            findVByPage(pageCode,pageSize){
                var self = this;
                var param = new URLSearchParams();
                param.append('pageCode', pageCode);
                param.append('pageSize', pageSize);

                axios.post('/findVByPage', param
                ).then(function (result) {

                    self.pageConf.totalPage = result.data.total;
                    self.visitor = result.data.rows;
                    //date数据数字转标准时间
                    for(var i = 0;i < result.data.total;i ++){
                        self.visitor[i].vtime = self.transferTime(self.visitor[i].vtime);
                    }

                }).catch(function (err) {
                    console.error(err);
                });
            },
            close:function(formName) {
                var self = this;
                self.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
            insert(){

                var self = this;
                self.dialogFormVisible = true
            },
            findVByOlderNameAndOperator(){

                var self = this;
                var param = new URLSearchParams();
                param.append('pageCode', self.pageConf.pageCode);
                param.append('pageSize', self.pageConf.pageSize);
                param.append('olderName',self.nameSearch);
                param.append('operator',self.adminSearch);
                axios.post('/findVByOlderNameAndOperator', param
                ).then(function (result) {

                    self.pageConf.totalPage = result.data.total;
                    self.visitor = result.data.rows;
                    //date数据数字转标准时间
                    for(var i = 0;i < result.data.total;i ++){

                        self.visitor[i].vtime = self.transferTime(self.visitor[i].vtime);
                    }

                }).catch(function (err) {
                    console.error(err);
                });
            },
            //pageSize改变时触发的函数
            handleSizeChange(val) {
                var self = this;
                //this.findVByPage(this.pageConf.pageCode, val);
                self.pageConf.pageSize = val;
                this.findVByOlderNameAndOperator();
            },
            //当前页改变时触发的函数
            handleCurrentChange(val) {
                //this.findVByPage(val, this.pageConf.pageSize);
                var self = this;
                self.pageConf.pageCode = val;
                this.findVByOlderNameAndOperator();
            },
            getOperator(){
                var self = this;
                axios.post('/findUserList').then(function (result) {
                    self.adminOptions = result.data;
                }).catch(function (err) {
                    console.error(err);
                });

            },
            getOlderNameList(){
                var self = this;
                axios.post('/findAllOlderName').then(function (res) {
                    self.olderNameList = res.data;
                    self.olderNameListLen = res.data.length;
                }).then(function (err) {
                    console.error(err);
                });
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
            this.getOlderNameList();
            this.getOperator();
            this.findVByPage(this.pageConf.pageCode, this.pageConf.pageSize);

        }
    }
});