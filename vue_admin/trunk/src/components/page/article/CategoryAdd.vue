<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 文章分类管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="分类名称">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
					<el-form-item label="图片">
                        <v-upload-file @remote-file-change="getUploadFileInfo"></v-upload-file>
                    </el-form-item>
					<el-form-item label="关键词">
					    <el-input v-model="form.keywords"></el-input>
					</el-form-item>
					<el-form-item label="分类描述">
					    <el-input v-model="form.description"></el-input>
					</el-form-item>
					<el-form-item label="标识符">
					    <el-input v-model="form.iden"></el-input>
					</el-form-item>
					<el-form-item label="所属分类">
					    <el-select v-model="form.pid" placeholder="请选择">

					        <el-option v-for="(value,key) in attr" :key="key" :label="value" :value="key">{{value}}</el-option>

					        <!--<el-option key="2" label="小天才" value="2"></el-option>-->

					    </el-select>
					</el-form-item>

                    <el-form-item label="排序">
                        <el-input v-model="form.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-radio-group v-model="form.status">
                            <el-radio value="2" label="2">删除</el-radio>
                            <el-radio value="1" label="1">正常</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <!--<el-button>取消</el-button>-->
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
    import ArticleCategoryBllayer from '../../../store/bllayer/ArticleCategoryBllayer';
    import ArticleBllayer from '../../../store/bllayer/ArticleBllayer';
	
	export default {
	    name: 'baseform',
	    data: function(){
	        return {
	            form:{
                    title:'',
                    keywords:'',
                    description:'',
                    iden:'',
					pid:'',
                    status:'',
					sort:'',
					img:''
                },
                msgCue:'',
                attr:['1','2'],
                pid:[]
	        }
	    },
		components:{
		    vUploadFile
		},
	    methods: {
	        onSubmit() {
                let vm = this;
                //this.form.status = this.form.status == '开启' ? '1' : '2'
                ArticleCategoryBllayer.add(vm)
	        },
			getUploadFileInfo(file_url,file_name){
				this.form.img = file_name
			},
            getCats(){
                let vm = this
                ArticleBllayer.getCats(vm)
            }
			
	    },
        mounted() {
            // 分类列表
            this.getCats()
        }
	}
    
</script>