<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 文章管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="标题"><el-input v-model="form.title"></el-input></el-form-item>
                    <el-form-item label="编辑者"><el-input v-model="form.editor"></el-input></el-form-item>
                    <el-form-item label="内容来源"><el-input v-model="form.origin"></el-input></el-form-item>
                    <el-form-item label="关键词"><el-input v-model="form.keywords"></el-input></el-form-item>
                    <el-form-item label="文章描述">
                        <el-input type="textarea" rows="5" v-model="form.description"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="描述"><el-input v-model="form.description"></el-input></el-form-item>-->
                    <el-form-item label="标识符"><el-input v-model="form.iden"></el-input></el-form-item>
                    <el-form-item label="文章所属分类">
                        <el-select v-model="form.article_category_id" placeholder="请选择">

                            <el-option v-for="(value,key) in attr" :key="key" :label="value" :value="key">{{value}}</el-option>

                            <!--<el-option key="bbk" label="1" value="1">步步高</el-option>-->

                        </el-select>
                    </el-form-item>
                    <el-form-item label="图片">
                        <v-upload-file @remote-file-change="getUploadFileInfo"></v-upload-file>
                    </el-form-item>
                    <el-form-item label="文章内容">
                        <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
                    </el-form-item>
                    <el-form-item label="阅读数">
                        <el-input v-model="form.peruse_num"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-radio-group v-model="form.status">
                            <el-radio label="1" value='1'>草稿</el-radio>
                            <el-radio label="2" value='2'>发布中</el-radio>
                            <el-radio label="3" value='3'>删除</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="form.sort"></el-input>
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
    import ArticleBllayer from '../../../store/bllayer/ArticleBllayer';

    export default {
        name: 'baseform',
        data: function(){
            return {
                form:{
                    title:'',
                    editor:'',
                    origin:'',
                    keywords:'',
                    description:'',
                    iden:'',
                    article_category_id:'',
                    img:'',
                    content:'',
                    peruse_num:'',
                    status:'',
                    sort:''
                },
                editorOption: {
                    placeholder: '请编辑文章内容'
                },
                msgCue:'',
                article_category_id:[],
                attr:['1','2']
            }
        },
        components:{
            vUploadFile,
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            onSubmit() {
                let vm = this;
                this.form.status = this.form.status == '开启' ? '1' : '2'
                ArticleBllayer.add(vm)
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