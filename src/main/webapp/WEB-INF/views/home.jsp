<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/3/8 0008
  Time: 17:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>儒雅随和管理系统</title>

    <link href="/resources/css/element-ui/reset.css" rel="stylesheet"/>
    <link href="/resources/css/element-ui/index.css" rel="stylesheet"/>

    <script src="/resources/js/lib/seajs/sea.js"></script>
    <script src="/resources/js/lib/seajs/plugins/seajs-text.js"></script>
    <script src="/resources/js/lib/seajs/plugins/seajs-css.js"></script>

    <script src="/resources/js/lib/jquery/jquery-1.12.4.js"></script>

    <script src="/resources/js/lib/vue/vue.js"></script>
    <script src="/resources/js/lib/vue/vue-router.js"></script>
    <script src="/resources/js/lib/vue/vuex.js"></script>
    <script src="/resources/js/lib/axios/axios.min.js"></script>

    <script src="/resources/js/lib/element-ui/index.js"></script>
</head>
<body>
    <div id="app">
        <router-view></router-view>
    </div>
</body>
<script>
    //相对标识，以.或..开头
    seajs.root = "./resources/src";


    seajs.config({
        //base路径，所有顶级标识都基于base路径
        base: seajs.root,
        //路径设置
        paths: {
            //顶级标识，基于base路径
            '@': 'components',
        },
        //别名设置，方便调用
        alias: {
            app: "app",
        }
    });

    seajs.use("app");

</script>
</html>
