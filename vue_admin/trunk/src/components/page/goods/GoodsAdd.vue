<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-goodsfill"></i> 商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加商品</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="商品名称"><el-input v-model="form.goods_name"></el-input></el-form-item>
                    <el-form-item label="商品市场价"><el-input v-model="form.market_price"></el-input></el-form-item>
                    <el-form-item label="商品销售价"><el-input v-model="form.price"></el-input></el-form-item>
                    <el-form-item label="成本价"><el-input v-model="form.cost_price"></el-input></el-form-item>
                    <el-form-item label="邮费或运费"><el-input v-model="form.freight"></el-input></el-form-item>
                    <el-form-item label="总库存量"><el-input v-model="form.stock"></el-input></el-form-item>
                    <el-form-item label="选择店铺">
                        <el-select v-model="form.shop_id" placeholder="请选择">
                            <el-option key="1" label="步步高" value="1"></el-option>
                            <el-option key="2" label="小天才" value="2"></el-option>
                            <el-option key="3" label="imoo" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择商品分类">
                        <el-select v-model="form.category_id" placeholder="请选择">
                            <el-option key="1" label="步步高" value="1"></el-option>
                            <el-option key="2" label="小天才" value="2"></el-option>
                            <el-option key="3" label="imoo" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="一级地区">
                        <el-select v-model="form.province_id" placeholder="请选择">
                            <el-option key="1" label="步步高" value="1"></el-option>
                            <el-option key="2" label="小天才" value="2"></el-option>
                            <el-option key="3" label="imoo" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="二级地区">
                        <el-select v-model="form.city_id" placeholder="请选择">
                            <el-option key="1" label="步步高" value="1"></el-option>
                            <el-option key="2" label="小天才" value="2"></el-option>
                            <el-option key="3" label="imoo" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品关键词"><el-input v-model="form.keywords"></el-input></el-form-item>
                    <el-form-item label="商品主图">
                        <v-upload-file @remote-file-change="getUploadFileInfo"></v-upload-file>
                    </el-form-item>
                    <el-form-item label="商品图片序列"><el-input v-model="form.img_id_array"></el-input></el-form-item>
                    <el-form-item label="规格名称"><el-input v-model="form.goods_spec_names"></el-input></el-form-item>
                    <el-form-item label="商品详情">
                        <quill-editor ref="myTextEditor" v-model="form.description" :options="editorOption"></quill-editor>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="form.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="是否热销商品">
                        <el-radio-group v-model="form.is_hot">
                            <el-radio value="2" label="2">是</el-radio>
                            <el-radio value="1" label="1">不是</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否推荐">
                        <el-radio-group v-model="form.is_recommend">
                            <el-radio value="2" label="2">是</el-radio>
                            <el-radio value="1" label="1">不是</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="商品状态">
                        <el-radio-group v-model="form.status">
                            <el-radio value="2" label="2">正常</el-radio>
                            <el-radio value="1" label="1">下架</el-radio>
                            <el-radio value="3" label="3">违规</el-radio>
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
    import GoodsBllayer from '../../../store/bllayer/GoodsBllayer';

    export default {
        name: 'baseform',
        data: function(){
            return {
                form:{
                    shop_id:'',
                    category_id:'',
                    goods_name:'',
                    market_price:'',
                    price:'',
                    cost_price:'',
                    freight:'',
                    province_id:'',
                    city_id:'',
                    picture:'',
                    keywords:'',
                    description:'',
                    img_id_array:'',
                    goods_spec_names:'',
                    is_hot:'',
                    status:'',
                    is_recommend:'',
                    sort:'',
                },
                editorOption: {
                    placeholder: '请编辑商品详情'
                },
                msgCue:''
            }
        },
        components:{
            vUploadFile,
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.description = html;
            },
            onSubmit() {
                let vm = this;
                //this.form.status = this.form.status == '开启' ? '1' : '2'
                GoodsBllayer.add(vm)
            },
            getUploadFileInfo(file_url,file_name){
                this.form.picture = file_name
            }

        }
    }

</script>