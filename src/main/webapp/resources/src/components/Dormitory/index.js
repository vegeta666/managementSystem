define(function (require, exports, module) {
    'use strict';
    var temp = require('./temp.html');
    require('./style.css');
    module.exports = {
        name:"Template",
        template:temp,
        data(){
            return{
                addFormVisible:false,
                updateFormVisible:false,
                searchFormVisible:false,
                addForm:{
                    addAdress:'',
                    addRoom:'',
                    addBed:''
                },
                updateForm:{

                },
                searchForm:{

                }
            }
        },
        methods:{
            addDormitory(){
                var self = this;
                self.addFormVisible = true
            },
            updateDormitory(){
                var self = this;
                self.updateFormVisible = true
            },
            searchDormitory(){
                var self = this;
                self.searchFormVisible = true
            },
            close:function(formName) {
                var self = this;
                self.dialogFormVisible = false;
                this.$refs[formName].resetFields();
            },
            submitAdd(){
                var self = this;
                this.$refs['addForm'].validate((valid) => {
                    if (valid) {
                        var tempDormitory = JSON.stringify({
                            adress:self.addForm.addAdress,
                            room:self.addForm.addRoom,
                            bed:self.addForm.addBed
                        });
                        let newDormitory = JSON.parse(tempDormitory);
                        axios.post('/addDormitory',newDormitory,{
                            headers: {
                                "Content-Type": "application/json;charset=utf-8"  //头部信息
                            }
                        }).then(function (res) {

                        }).catch(function (err) {
                            console.error(err);
                        });
                        self.addFormVisible = false;
                        this.$refs['addForm'].resetFields();
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
            }
        }
    }
});