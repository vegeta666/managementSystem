<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/12/21 0021
  Time: 16:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>儒雅随和养老院管理系统</title>
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <script src="https://cdn.bootcss.com/vue/2.5.13/vue.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>

    <link rel="stylesheet" href="resources/css/login.css">
</head>
<body>
<div id = "login">
    <div class="message">养老管理系统-管理登录</div>
    <div id = "container">

        <el-form ref = "loginForm" :model = "loginForm" label-width = "80px">
            <el-form-item id = "username" prop="username">
                <el-input  required="true" prefix-icon="el-icon-view" v-model = "loginForm.username" size = "medium" placeholder = "请输入用户名">

                </el-input>

            </el-form-item>
            <el-form-item id = "userpassword" prop="password">
                <el-input required="true" type = "password" prefix-icon="el-icon-view" v-model = "loginForm.password" size = "medium" placeholder = "请输入密码">

                </el-input>
            </el-form-item>
            <label id = "tips">{{loginForm.tips}}</label>
            <el-form-item >
                <el-button id = "loginbutton" size = "medium" type = "success" round @click = "login()">登录</el-button>
                <el-button id = "rebutton" size = "medium" type = "primary" round @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</div>
<script>
    new Vue({
        el: '#login',
        data: {
            loginForm:{
                username:'',
                password:'',
                tips:''

            }
        },
        methods: {
            resetForm:function(formName){
                this.$refs[formName].resetFields();
                this.loginForm.tips = '';
            },
            login:function(){
                var self = this;
                var param = new URLSearchParams()
                param.append('username', self.loginForm.username)
                param.append('password', self.loginForm.password)
                axios.post('/login',param
                ).then(function(res){
                    if(res.data == 'user'){
                        self.loginForm.tips = '用户不存在，请重新输入!';
                    }else if(res.data == 'password'){
                        self.loginForm.tips = '密码输入错误，请重新输入!';
                    }else if(res.data == 'ok'){

                        window.location.href = "/welcome";

                    }



                }).catch(function(err){
                    console.error(err);
                });
            }
        }

    })
</script>
</body>
</html>

