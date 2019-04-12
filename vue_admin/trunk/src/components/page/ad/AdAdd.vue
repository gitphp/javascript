<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 广告管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加广告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
					<el-form-item label="图片">
                        <v-upload-file @remote-file-change="getUploadFileInfo"></v-upload-file>
                    </el-form-item>
					<el-form-item label="跳转地址">
					    <el-input v-model="form.url"></el-input>
					</el-form-item>
					<el-form-item label="备注">
					    <el-input v-model="form.remark"></el-input>
					</el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="form.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-radio-group v-model="form.status">
                            <el-radio label="禁用"></el-radio>
                            <el-radio label="开启"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
					<el-form-item>

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
	import vUploadFile from '../../common/UploadFile.vue'
	import { quillEditor } from 'vue-quill-editor';
    import AdAddBllayer from '../../../store/bllayer/AdAddBllayer';
	
	export default {
	    name: 'baseform',
	    data: function(){
	        return {
	            form:{
                    name:'',
                    url:'',
                    phone:'',
                    remark:'',
                    status:'',
					img:''
                },
                msgCue:''
	        }
	    },
		components:{
		    vUploadFile
		},
	    methods: {
	        onSubmit() {
                let vm = this;
                this.form.status = this.form.status == '开启' ? '1' : '2'
                AdAddBllayer.add(vm)
	        },
			getUploadFileInfo(file_url,file_name){
				this.form.img = file_name
			}
	    }
	}
    
</script>