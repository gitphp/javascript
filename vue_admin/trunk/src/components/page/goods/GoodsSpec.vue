<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加商品规格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="规格名称">
                        <el-input v-model="form.spec_name"></el-input>
                    </el-form-item>
                    <el-form-item label="规格选项">
                        <div v-for="(item,key) in items">
                            <el-input v-model="form.spec_item_name[key]">
                                <template slot="append">
                                    &nbsp;&nbsp;
                                    <i class="el-icon-lx-move" @click="onMove"></i>
                                    &nbsp;&nbsp;
                                </template>
                            </el-input>
                        </div>

                    </el-form-item>
                    <el-form-item label="   ">

                        <el-button class="el-icon-lx-add" @click="onAdd"></el-button>
                        <!--<i class="el-icon-lx-add" @click="onAdd"></i>-->
                    </el-form-item>
                    <!--<el-form-item label="选择店铺">-->
                    <!--<el-select v-model="form.shop_id" placeholder="请选择">-->
                    <!--<el-option key="1" label="步步高" value="1"></el-option>-->
                    <!--<el-option key="2" label="小天才" value="2"></el-option>-->
                    <!--<el-option key="3" label="imoo" value="3"></el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item label="用于商品分类">
                        <el-select v-model="form.use_in_goods_category" placeholder="请选择">

                            <el-option v-for="(value,key) in attr" :key="key" :label="value" :value="key">{{value}}</el-option>
                            <!--<el-option key="2" label="小天才" value="2"></el-option>-->
                        </el-select>
                    </el-form-item>

                    <el-form-item label="展示方式">
                        <el-radio-group v-model="form.show_type">
                            <el-radio value="1" label="1">文字</el-radio>
                            <el-radio value="2" label="2">颜色</el-radio>
                            <el-radio value="3" label="3">图片</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否参与筛选">
                        <el-radio-group v-model="form.is_screen">
                            <el-radio value="1" label="1">参与</el-radio>
                            <el-radio value="2" label="2">不参与</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!--<el-form-item label="是否是平台规格">-->
                    <!--<el-radio-group v-model="form.is_platform">-->
                    <!--<el-radio value="1" label="1">是</el-radio>-->
                    <!--<el-radio value="2" label="2">不是</el-radio>-->
                    <!--</el-radio-group>-->
                    <!--</el-form-item>-->
                    <el-form-item label="排序">
                        <el-input v-model="form.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-radio-group v-model="form.status">
                            <el-radio value="2" label="2">禁用</el-radio>
                            <el-radio value="1" label="1">开启</el-radio>
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
    import SpecBllayer from '../../../store/bllayer/SpecBllayer';
    import ArticleBllayer from '../../../store/bllayer/ArticleBllayer';
    import GoodsBllayer from '../../../store/bllayer/GoodsBllayer';

    export default {
        name: 'baseform',
        data: function(){
            return {
                form:{
//                    shop_id:'',
                    spec_name:'',
                    show_type:'',
                    is_screen:'',
//                    is_platform:'',
                    spec_item_name:[],
                    use_in_goods_category:'',
                    status:'',
                    sort:''
                },
                msgCue:'',
                items:[''],

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
                SpecBllayer.add(vm)
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
//            getUploadFileInfo(file_url,file_name){
//                this.form.img = file_name
//            }

        },
        mounted() {
            // 商品分类列表
            this.getCats();
        }
    }

</script>