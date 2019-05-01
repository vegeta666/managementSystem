define(function (require, exports, module) {
   'use strict';
   var temp = require("./temp.html");
   module.exports = {
       name:"Template",
       template:temp,
       data(){
           return{
               older:[{
                   name:'',
                   gender:'',
                   idCard:'',
                   hospital:'',
                   doctor:'',
                   doctornum:'',
                   home:'',
                   adddate:'',
                   birthday:'',
                   phone:''
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
               nameSearch:''
           }
       },
       methods:{
           //获取数据
           findOByPage(pageCode,pageSize){
               var self = this;
               var param = new URLSearchParams();
               param.append('pageCode', pageCode);
               param.append('pageSize', pageSize);

               axios.post('/findOByPage', param
               ).then(function (result) {

                   self.pageConf.totalPage = result.data.total;
                   self.older = result.data.rows;
                   //date数据数字转标准时间
                   for(var i = 0;i < result.data.total;i ++){
                       if(self.older[i].gender === 1){
                           self.older[i].gender = '男'
                       }else{
                           self.older[i].gender = '女'
                       }
                       self.older[i].birthday = self.transferTime(self.older[i].birthday);
                       self.older[i].adddate = self.transferTime(self.older[i].adddate);
                   }

               }).catch(function (err) {
                   console.error(err);
               });
           },
           findOByName(){
               var self = this;
               var param = new URLSearchParams();
               param.append('pageCode', self.pageConf.pageCode);
               param.append('pageSize', self.pageConf.pageSize);
               param.append('name',self.nameSearch);
               axios.post('/findOByName', param
               ).then(function (result) {

                   self.pageConf.totalPage = result.data.total;
                   self.older = result.data.rows;
                   //date数据数字转标准时间
                   for(var i = 0;i < result.data.total;i ++){
                       if(self.older[i].gender === 1){
                           self.older[i].gender = '男'
                       }else{
                           self.older[i].gender = '女'
                       }
                       self.older[i].birthday = self.transferTime(self.older[i].birthday);
                       self.older[i].adddate = self.transferTime(self.older[i].adddate);
                   }

               }).catch(function (err) {
                   console.error(err);
               });
           },
           //pageSize改变时触发的函数
           handleSizeChange(val) {
               var self = this;
               //this.findOByPage(this.pageConf.pageCode, val);
               self.pageConf.pageSize = val;
               this.findOByName();
           },
           //当前页改变时触发的函数
           handleCurrentChange(val) {
               //this.findOByPage(val, this.pageConf.pageSize);
               var self = this;
               self.pageConf.pageCode = val;
               this.findOByName();
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
           this.findOByPage(this.pageConf.pageCode, this.pageConf.pageSize);
       }
   }

});