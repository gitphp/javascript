<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">理想绿色商城-运营管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入用户名" clearable>
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')" clearable>
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">{{msgCue}}</p>
            </el-form>
        </div>
    </div>
</template>

<script>
	import LoginBllayer from '../../store/bllayer/LoginBllayer'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
				msgCue:''
            }
        },
        methods: {
            submitForm(formName) {
				var vm = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
						LoginBllayer.login(vm)						
                    } else {
                        ///console.log('error submit!!');
                        return false
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/bg-img.png);
        background-size: 100%;
		background-color: #fff;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:25px;
        color: #000;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#FF4D51;
    }
</style>