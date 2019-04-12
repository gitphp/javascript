<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-goodsfill"></i> 商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加商品分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="商品分类名称"><el-input v-model="form.category_name"></el-input></el-form-item>
                    <el-form-item label="商品分类简称"><el-input v-model="form.short_name"></el-input></el-form-item>
                    <el-form-item label="商品分类图片">
                        <v-upload-file @remote-file-change="getUploadFileInfo"></v-upload-file>
                    </el-form-item>
                    <el-form-item label="商品分类关键词"><el-input v-model="form.keywords"></el-input></el-form-item>
                    <el-form-item label="商品分类描述"><el-input v-model="form.description"></el-input></el-form-item>
                    <el-form-item label="商品属性">
                        <el-checkbox-group v-model="checkedAttr">
                            <el-checkbox v-for="(value,key) in attr" :label="value" :key="key">{{value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="商品分类排序">
                        <el-input v-model="form.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="是否显示">
                        <el-radio-group v-model="form.is_visible">
                            <el-radio value="1" label="1">是</el-radio>
                            <el-radio value="2" label="2">否</el-radio>
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
    import CategoryBllayer from '../../../store/bllayer/CategoryBllayer';

    export default {
        name: 'baseform',
        data: function(){
            return {
                form:{
                    category_name:'',
                    short_name:'',
                    keywords:'',
                    description:'',
                    category_pic:'',
                    sort:'',
                    is_visible:'1',
                    relation_goods_attribute_ids:''
                },
                msgCue:'',
                attr:['1','2'],
                checkedAttr:[]
            }
        },
        components:{
            vUploadFile
        },
        methods: {
            onSubmit() {
                let vm = this;
                for(let value in vm.checkedAttr){
                    for(let key in vm.attr){
                        if(vm.attr[key] == vm.checkedAttr[value]){
                            vm.form.relation_goods_attribute_ids += ',' + key
                        }
                    }
                }
                vm.form.relation_goods_attribute_ids = vm.form.relation_goods_attribute_ids.substr(1)
                console.log(vm.form)
                CategoryBllayer.add(vm)
            },
            getUploadFileInfo(file_url,file_name){
                this.form.category_pic = file_name
            },
            getAttr(){
                let vm = this
                CategoryBllayer.getAttr(vm)
            }
        },
        mounted() {
            this.getAttr()
        }
    }

</script>