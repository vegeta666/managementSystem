<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/1/6 0006
  Time: 18:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>儒雅随和养老院管理系统</title>

    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <script src="https://cdn.bootcss.com/vue/2.5.13/vue.min.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>

    <link rel="stylesheet" href="/resources/css/main.css">
    <script type="module" src="/resources/js/main.js" ></script>
</head>
<body>

    <div id = "main">

        <el-container style="border: 1px solid #eee; height: 100%">
            <el-header class = "header">
                <div id = "headleft">

                    <img id = "flag" src="../../resources/css/images/flag.png">&nbsp&nbsp&nbsp&nbsp
                    <label>儒雅随和</label>
                    <label style="font-size: 20px;position: absolute;padding-top: 66px">Elegant and easy-going</label>

                </div>

                <div id = "headerright">

                    <label>欢迎您，管理员  :  {{displayName}}</label>&nbsp&nbsp&nbsp&nbsp
                    <el-button icon = "el-icon-back" size = "small" circle @click = "logout()"></el-button>

                </div>
                <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            个人信息<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="clearfix" @click.native = "modifynick()">
                            修改昵称
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix"  @click.native = "dialogFormVisible = true">
                            修改密码
                        </el-dropdown-item>
                    </el-dropdown-menu>
                    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
                        <el-form :model = "form" status-icon :rules="rules" ref="form">
                            <el-form-item label="初始密码" :label-width="formLabelWidth" prop = "init">
                                <el-input type = "password" v-model = "form.init" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" :label-width="formLabelWidth" prop = "new">
                                <el-input type = "password" v-model = "form.new" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" :label-width="formLabelWidth" prop = "check">
                                <el-input type = "password" v-model = "form.check" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="close('form')">取 消</el-button>
                            <el-button type="primary" @click="submit('form')">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-dropdown>

            </el-header>
            <el-container>
            <el-aside>
                <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>导航一</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="2-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="3-1">选项1</el-menu-item>
                            <el-menu-item index="3-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="3-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="3-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-aside>

                <el-main>

                </el-main>
            </el-container>
        </el-container>

    </div>

</body>
</html>
