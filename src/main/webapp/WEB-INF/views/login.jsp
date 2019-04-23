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
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>儒雅随和养老院管理系统</title>
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

    <link href="/resources/css/element-ui/reset.css" rel="stylesheet"/>
    <link href="/resources/css/element-ui/index.css" rel="stylesheet"/>
    <script src="/resources/js/lib/vue/vue.js"></script>
    <script src="/resources/js/lib/axios/axios.min.js"></script>

    <script src="/resources/js/lib/element-ui/index.js"></script>
    <script type="module" src="/resources/js/login.js"></script>
    <link rel="stylesheet" href="/resources/css/login.css">
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

</body>
</html>

