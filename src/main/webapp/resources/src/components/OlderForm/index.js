define(function (require, exports, module) {
    "use strict";
    var temp = require("./temp.html");
    require("./style.css");
    module.exports = {
        name:"Template",
        template: temp,
        data(){
            return{
                older:[{
                    name:'',
                    gender:0,
                    idcard:'',
                    hospital:'',
                    doctor:'',
                    doctornum:'',
                    home:'',
                    adddate:'',
                    birthday:'',
                    phone:''

                }],
                basicForm:{
                    name:'',
                    idCard:'',
                    gender:'',
                    home:'',
                    phone:'',
                    addDate:'',
                    birthday:'',
                    hospital:'',
                    doctor:'',
                    doctornum:''
                },
                liveForm:{

                },
                healthForm:{
                    status:'',
                    medicalHistory:'',
                    attention:'',
                    hobby:''
                },
                familyForm:{
                  mainContactName:'',
                  mainContactNum:'',
                  mainRelationship:'',
                  secondaryRelationship:'',
                  secondaryContactName:'',
                  secondaryContactNum:''

                },
                costForm:{
                    shouldCost:0,
                    actualCost:0,
                    arrears:0
                },
                imageUrl: '',
            }
        },
        methods: {
             async submit(){
                var self = this;
                this.$refs["basicForm"].validate((valid) => {
                    if(valid){
                        this.$refs["healthForm"].validate((valid) => {
                           if(valid){
                               var tempOlder = JSON.stringify({
                                   name:self.basicForm.name,
                                   gender:self.basicForm.gender === '男' ? 1 : 0,
                                   idcard:self.basicForm.idCard,
                                   hospital:self.basicForm.hospital,
                                   doctor:self.basicForm.doctor,
                                   doctornum:self.basicForm.doctornum,
                                   home:self.basicForm.home,
                                   adddate:self.basicForm.addDate,
                                   birthday:self.basicForm.birthday,
                                   phone:self.basicForm.phone
                               });
                               let newOlder = JSON.parse(tempOlder);
                               axios.post('/addOlder',newOlder,{
                                   headers: {
                                       "Content-Type": "application/json;charset=utf-8"  //头部信息
                                   }
                               }).then(function () {
                                   var param_Id = new URLSearchParams();
                                   param_Id.append('idcard', self.basicForm.idCard);
                                   axios.post('/findOlderId',param_Id).then(function (OlderId) {
                                       var tempOlderHealth = JSON.stringify({
                                           olderid:OlderId.data,
                                           status:self.healthForm.status,
                                           medhistory:self.healthForm.medicalHistory,
                                           attention:self.healthForm.attention,
                                           hobby:self.healthForm.hobby
                                       });
                                       let newOlderHealth = JSON.parse(tempOlderHealth);
                                       axios.post('/addOlderHealth',newOlderHealth, {
                                           headers: {
                                               "Content-Type": "application/json;charset=utf-8"  //头部信息
                                           }
                                       }).then(function () {

                                       }).catch(function (err) {
                                           console.error(err);
                                       });

                                   }).catch(function (err) {
                                       console.error(err);
                                   });
                               }).catch(function (err) {
                                   console.error(err);
                               });

                               self.dialogFormVisible = false;
                               //this.$refs["basicForm"].resetFields();
                               this.$message({
                                   showClose: true,
                                   message: '恭喜你，添加成功',
                                   type: 'success'
                               });
                           }
                        });

                    }
                });
            },
            resetForm:function(){
                this.$refs["basicForm"].resetFields();
                this.$refs["healthForm"].resetFields();
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        watch : {
            'costForm.shouldCost': {
                handler(newVal, oldVal) {
                    var self = this;
                    self.costForm.arrears = newVal - self.costForm.actualCost;
                },
                deep: true
            },
            'costForm.actualCost': {
                handler(newVal, oldVal) {
                    var self = this;
                    self.costForm.arrears = self.costForm.shouldCost - newVal;
                },
                deep: true
            }

        }
    }
})