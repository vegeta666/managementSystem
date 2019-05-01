define(function (require, exports, module) {
    'use strict';
    var temp = require("./temp.html");
    module.exports = {
        name:"Template",
        template:temp,
        data(){

            return{
                attendant:[{
                    name:'',
                    birthday:'',
                    entrytime:'',
                    salary:0,
                    grade:'',
                    status:''
                }],
                statusSearch:'',
                gradeSearch:'',
                gradeOptions:[{
                    value: '1',
                    label: '1'
                }, {
                    value: '2',
                    label: '2'
                }, {
                    value: '3',
                    label: '3'
                }, {
                    value: '4',
                    label: '4'
                }],
                statusOptions:[{
                    value: '实习',
                    label: '实习'
                }, {
                    value: '试用',
                    label: '试用'
                }, {
                    value: '正式',
                    label: '正式'
                }],

                insertForm:{
                    newName:'',
                    newGrade:'',
                    newBirthday:'',
                    newEntryTime:'',
                    newSalary:'',
                    newStatus:''
                },
                dialogFormVisible:false,
                pageConf: {
                    //设置一些初始值(会被覆盖)
                    pageCode: 1, //当前页
                    pageSize: 4, //每页显示的记录数
                    totalPage: 12, //总记录数
                    pageOption: [4, 5, 10], //分页选项
                    handleCurrentChange: function () {
                        console.log("页码改变了");
                    }
                }
            }
        },
        methods:{
            close:function(formName) {
                var self = this;
                self.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
            findAByGradeAndStatus(){

                var self = this;
                var param = new URLSearchParams();
                param.append('pageCode', self.pageConf.pageCode);
                param.append('pageSize', self.pageConf.pageSize);
                param.append('grade',self.gradeSearch);
                param.append('status',self.statusSearch);
                axios.post('/findAByGradeAndStatus', param
                ).then(function (result) {

                    self.pageConf.totalPage = result.data.total;
                    self.attendant = result.data.rows;
                    //date数据数字转标准时间
                    for(var i = 0;i < result.data.total;i ++){

                        self.attendant[i].birthday = self.transferTime(self.attendant[i].birthday);
                        self.attendant[i].entrytime = self.transferTime(self.attendant[i].entrytime);
                    }

                }).catch(function (err) {
                    console.error(err);
                });
            },
            insert(){

                var self = this;
                self.dialogFormVisible = true
            },
            submit:function(formName){
                var self = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var tempAttendant = JSON.stringify({
                            name:self.insertForm.newName,
                            grade:self.insertForm.newGrade,
                            salary:self.insertForm.newSalary,
                            birthday:self.insertForm.newBirthday,
                            entrytime:self.insertForm.newEntryTime,
                            status:self.insertForm.newStatus
                        });
                        let newAttendant = JSON.parse(tempAttendant);
                        axios.post('/addAttendant',newAttendant,{
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
            findAByPage(pageCode,pageSize){
                var self = this;
                var param = new URLSearchParams();
                param.append('pageCode', pageCode);
                param.append('pageSize', pageSize);

                axios.post('/findAByPage', param
                ).then(function (result) {

                    self.pageConf.totalPage = result.data.total;
                    self.attendant = result.data.rows;
                    //date数据数字转标准时间
                    for(var i = 0;i < result.data.total;i ++){
                        self.attendant[i].birthday = self.transferTime(self.attendant[i].birthday);
                        self.attendant[i].entrytime = self.transferTime(self.attendant[i].entrytime);
                    }

                }).catch(function (err) {
                    console.error(err);
                });
            },
            //pageSize改变时触发的函数
            handleSizeChange(val) {
                var self = this;
                //this.findAByPage(this.pageConf.pageCode, val);
                self.pageConf.pageSize = val;
                this.findAByGradeAndStatus();
            },
            //当前页改变时触发的函数
            handleCurrentChange(val) {
                var self = this;
               // this.findAByPage(val, this.pageConf.pageSize);
                self.pageConf.pageCode = val;
                this.findAByGradeAndStatus();
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
                var newDate = jsonDate.format("yyyy-MM-dd");
                return newDate;
            }
        },
        created(){
            this.findAByPage(this.pageConf.pageCode, this.pageConf.pageSize);
        }
    }

});