<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加商品属性</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="属性名称">
                        <el-input v-model="form.attr_name"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="属性对应相关数据">-->
                    <!--<el-input type="textarea" rows="5" v-model="form.value"></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item label="属性类型">
                        <el-radio-group v-model="form.attr_value_type" @change="handleType">
                            <el-radio value="1" label="1" >直接输入</el-radio>
                            <el-radio value="2" label="2" >单选</el-radio>
                            <el-radio value="3" label="3" >多选</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="属性值数据" v-if="radio2 !== 1">
                        <div v-for="(item,key) in items">
                            <el-input v-model="form.value[key]" name="value[]" :label="item" :key="key">
                                <template slot="append">
                                    &nbsp;&nbsp;
                                    <i class="el-icon-lx-move" @click="onMove"></i>
                                    &nbsp;&nbsp;
                                </template>
                            </el-input>
                        </div>
                    </el-form-item>

                    <el-form-item label="   " v-if="radio2 !== 1">

                        <el-button class="el-icon-lx-add" @click="onAdd"></el-button>
                        <!--<i class="el-icon-lx-add" @click="onAdd"></i>-->
                    </el-form-item>


                    <el-form-item label="用于商品分类">
                        <el-select v-model="form.use_in_goods_category" placeholder="请选择">

                            <el-option v-for="(value,key) in attr" :key="key" :label="value" :value="key">{{value}}</el-option>

                            <!--<el-option key="2" label="小天才" value="2"></el-option>-->

                        </el-select>
                    </el-form-item>

                    <el-form-item label="排序">
                        <el-input v-model="form.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-radio-group v-model="form.status">
                            <el-radio value="2" label="2">禁用</el-radio>
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
    import AttributeBllayer from '../../../store/bllayer/AttributeBllayer';
    import GoodsBllayer from '../../../store/bllayer/GoodsBllayer';

    export default {
        name: 'baseform',
        data: function(){
            return {
                form:{
                    attr_name:'',
                    value:[],
                    attr_value_type:'',
                    use_in_goods_category:'',
                    status:'',
                    sort:''
                },
                items:[''],
                msgCue:'',
                radio2: 1,
                attr:['1','2'],
                use_in_goods_category:[]
            }
        },
        components:{
            //vUploadFile
        },
        methods: {
            onSubmit() {
                let vm = this;
                //this.form.status = this.form.status == '开启' ? '1' : '2'
                AttributeBllayer.add(vm)
            },
            handleType(value){
                //console.log(value);
                if(value == 1){
                    this.radio2 = 1;
                }else if(value == 2){
                    this.radio2 = 2;
                }else{
                    this.radio2 = 3;
                }
            },
            onAdd(){

                this.items.push(Math.random())
            },
            onMove(){

                if(this.items.length > 1){
                    this.items.shift();
                }
            },
            getCats(){
                let vm = this
                GoodsBllayer.getCats(vm)
            }
            //getUploadFileInfo(file_url,file_name){
            //    this.form.img = file_name
            //}

        },
        mounted() {
            // 分类列表
            this.getCats()
        }
    }

</script>