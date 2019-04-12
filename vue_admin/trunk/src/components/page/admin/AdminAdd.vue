<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理员管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <div class="plugins-tips" style="padding-left: 35px;background-color:white">
                        初始密码：123456,新添加账号在登录后修改密码
                    </div>
                    <el-form-item label="账号">
                        <el-input v-model="form.account"></el-input>
                    </el-form-item>
					<el-form-item label="姓名">
					    <el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="手机号">
					    <el-input v-model="form.phone"></el-input>
					</el-form-item>
					<el-form-item label="备注">
					    <el-input v-model="form.remark"></el-input>
					</el-form-item>
                    
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                    <p class="login-tips">{{msgCue}}</p>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import { quillEditor } from 'vue-quill-editor';
    import AdminAddBllayer from '../../../store/bllayer/AdminAddBllayer';

	export default {
	    name: 'baseform',
	    data: function(){
	        return {
	            form:{
	                account:'',
                    name:'',
                    phone:'',
                    remark:''
                },
                msgCue:''
	        }
	    },
	    methods: {
	        onSubmit() {
                let vm = this;
                this.msgCue=''
                AdminAddBllayer.add(vm)
	        }
	    }
	}
    
</script>