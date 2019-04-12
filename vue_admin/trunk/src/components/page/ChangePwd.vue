<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="90px">   
                    <el-form-item  label="原密码">
                        <el-input type="password" placeholder="请输入原密码" v-model="form.ypassword" clearable></el-input>
                    </el-form-item>
                    <el-form-item  label="新密码">
                        <el-input type="password" placeholder="请输入新密码" v-model="form.npassword" clearable></el-input>
                    </el-form-item>
                    <el-form-item  label="确认新密码">
                        <el-input type="password" placeholder="请输入确认新密码" v-model="form.cpassword" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <!--<el-button  @click="onCancel">取消</el-button>-->
                    </el-form-item>
					<p class="login-tips">{{msgCue}}</p>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
	import AccountBllayer from '../../store/bllayer/AccountBllayer'
    export default {
        name: 'baseform',
        data: function(){
            return { 
                form: {
                    ypassword: '',
                    npassword: '',
                    cpassword: ''
                },
				msgCue:''
            }
        },
        methods: {
            onSubmit() {
				var vm = this
				AccountBllayer.changePwd(vm)
            },
			onCancel() {
				var vm = this
				vm.$router.back()
			}
        }
    }
</script>
<style scoped>
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#FF4D51;
    }
</style>