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
                positionForm:{
                    adressSearch:'',
                    roomSearch:'',
                    bedSearch:'',
                    rankSearch:'',
                    attendantSearch:''
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
                adressList:[],
                roomList:[],
                bedList:[],
                roomDisable:'false',
                bedDisable:'false',
                attendantDisable:'false',
                rankList:[
                    {
                        label:1,
                        value:1
                    },
                    {
                        label:2,
                        value:2
                    },
                    {
                        label:3,
                        value:3
                    },
                    {
                        label:4,
                        value:4
                    }
                ],
                attendantList:[]

            }
        },
        methods: {
            updateDormitoryStatus(olderid){
                var self = this;
                var param = new URLSearchParams();
                param.append("adress",self.positionForm.adressSearch);
                param.append("room",self.positionForm.roomSearch);
                param.append("bed",self.positionForm.bedSearch);
                param.append("olderid",olderid);
                axios.post('/updateStatus',param).then(function () {

                }).catch(function (err) {
                    console.log(err);
                });

            },
            addO_A(olderid){
                var self = this;
                var paramName = new URLSearchParams();
                paramName.append('name',self.positionForm.attendantSearch);
                axios.post('/findIdByName',paramName).then(function (attendantid) {
                    var tempO_A = JSON.stringify({
                        olderid:olderid,
                        attendantid:attendantid.data,
                        grade:self.positionForm.rankSearch
                    });
                    let newO_A = JSON.parse(tempO_A);
                    axios.post('/addO_A',newO_A, {
                        headers:{
                            "Content-Type": "application/json;charset=utf-8"  //头部信息
                        }
                    }).then(function () {

                    }).catch(function (err) {
                        console.error(err);
                    });
                }).then(function (err) {
                    console.error(err);
                });
            },
            getAttendantByRank(){
                var self = this;
                var param = new URLSearchParams();
                param.append('grade',self.positionForm.rankSearch);

                axios.post('/findNameByGrade',param).then(function (res) {
                    self.attendantList = res.data;
                }).catch(function (err) {
                    console.log(err);
                });
            },
            async submit(){
                var self = this;
                this.$refs["basicForm"].validate((valid) => {
                    if(valid){
                        this.$refs["positionForm"].validate((valid) => {
                            if (valid){
                                this.$refs["healthForm"].validate((valid) => {
                                    if(valid){
                                        this.$refs["familyForm"].validate((valid) => {
                                           if(valid){
                                               this.$refs["costForm"].validate((valid) => {
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
                                                             self.updateDormitoryStatus(OlderId.data);
                                                             self.addO_A(OlderId.data);
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
                                                             var tempOlderFamily = JSON.stringify({
                                                                 olderid:OlderId.data,
                                                                 main:self.familyForm.mainContactName,
                                                                 mainNum:self.familyForm.mainContactNum,
                                                                 mainRelationship:self.familyForm.mainRelationship,
                                                                 second:self.familyForm.secondaryContactName,
                                                                 secondNum:self.familyForm.secondaryContactNum,
                                                                 secondRelationship:self.familyForm.secondaryRelationship
                                                             });
                                                             let newOlderFamily = JSON.parse(tempOlderFamily);
                                                             axios.post('/addOlderHome',newOlderFamily, {
                                                                 headers: {
                                                                     "Content-Type": "application/json;charset=utf-8"  //头部信息
                                                                 }
                                                             }).then(function () {

                                                             }).catch(function (err) {
                                                                 console.error(err);
                                                             });
                                                             //
                                                             var tempOlderCost = JSON.stringify({
                                                                 olderid:OlderId.data,
                                                                 shouldCost:self.costForm.shouldCost,
                                                                 actualCost:self.costForm.actualCost,
                                                                 arrears:self.costForm.arrears
                                                             });
                                                             let newOlderCost = JSON.parse(tempOlderCost);
                                                             axios.post('/addOlderCost',newOlderCost, {
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
                                    }
                                });
                            }
                        });
/*                        this.$refs["healthForm"].validate((valid) => {
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
                                        self.updateDormitoryStatus(OlderId.data);
                                        self.addO_A(OlderId.data);
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
                                        var tempOlderFamily = JSON.stringify({
                                            olderid:OlderId.data,
                                            main:self.familyForm.mainContactName,
                                            mainNum:self.familyForm.mainContactNum,
                                            mainRelationship:self.familyForm.mainRelationship,
                                            second:self.familyForm.secondaryContactName,
                                            secondNum:self.familyForm.secondaryContactNum,
                                            secondRelationship:self.familyForm.secondaryRelationship
                                        });
                                        let newOlderFamily = JSON.parse(tempOlderFamily);
                                        axios.post('/addOlderHome',newOlderFamily, {
                                            headers: {
                                                "Content-Type": "application/json;charset=utf-8"  //头部信息
                                            }
                                        }).then(function () {

                                        }).catch(function (err) {
                                            console.error(err);
                                        });
                                        //
                                        var tempOlderCost = JSON.stringify({
                                            olderid:OlderId.data,
                                            shouldCost:self.costForm.shouldCost,
                                            actualCost:self.costForm.actualCost,
                                            arrears:self.costForm.arrears
                                        });
                                        let newOlderCost = JSON.parse(tempOlderCost);
                                        axios.post('/addOlderCost',newOlderCost, {
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
                        });*/

                    }
                });
            },
            resetForm:function(){
                this.$refs["basicForm"].resetFields();
                this.$refs["healthForm"].resetFields();
                this.$refs["costForm"].resetFields();
                this.$refs["positionForm"].resetFields();
                this.$refs["familyForm"].resetFields();
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
            },
            getAdress(){
                 var self = this;
                axios.post('/findAdress').then(function (res) {
                    self.adressList = res.data;
                }).catch(function (err) {
                    console.error(err);
                });
            },
            getRoomByAress(){
                var self = this;
                var param = new URLSearchParams();
                param.append('adress', self.positionForm.adressSearch);
                axios.post('/findRoomByAdress',param).then(function (res) {
                    self.roomList = res.data;
                }).catch(function (err) {
                    console.log(err);
                })
            },
            getEmptyBedByAdressAndRoom(){
                 var self = this;
                 var param = new URLSearchParams();
                 param.append('adress',self.positionForm.adressSearch);
                 param.append('room',self.positionForm.roomSearch);
                axios.post('/findEmptyBedByAdressAndRoom',param).then(function (res) {
                    self.bedList = res.data;
                }).catch(function (err) {
                    console.log(err);
                });
            },
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
            },
            'positionForm.adressSearch':{

                handler(newVal, oldVal){
                    var self = this;
                    self.positionForm.adressSearch = newVal;
                    self.roomDisable = 'true';
                    this.getRoomByAress();
                },
                deep:true
            },
            'positionForm.roomSearch':{
                handler(newVal, oldVal){
                    var self = this;
                    self.positionForm.roomSearch = newVal;
                    self.bedDisable = 'true';
                    this.getEmptyBedByAdressAndRoom();
                },
                deep:true
            },
            'positionForm.rankSearch':{
                handler(newVal,oldVal){
                    var self = this;
                    self.positionForm.rankSearch = newVal;
                    self.attendantDisable = 'true';
                    this.getAttendantByRank();

                },
                deep:true
            }


        },
        created(){
            this.getAdress();
        }
    }
})