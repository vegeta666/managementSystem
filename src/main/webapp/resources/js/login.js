var vm = new Vue({
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

});