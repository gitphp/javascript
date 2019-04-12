<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-goodsfill"></i> 商品列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_id" placeholder="商品ID" class="handle-input mr10"></el-input>
                <!--<img src="../../../assets/img/yes.png" height="20" width="20"/>-->
                <el-input v-model="select_name" placeholder="商品名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" row-style="height:0" cell-style="padding:0" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="goods_id" label="商品id" sortable width="90"></el-table-column>
                <!--<el-table-column prop="shop_id" label="店铺id" sortable width="90"></el-table-column>-->
                <el-table-column prop="picture" label="图片" width="120">
                    <template scope="scope">
                        <img :src="file_url + scope.row.picture" width="40" height="40" class="head_pic"/>
                    </template>
                </el-table-column>
                <el-table-column prop="goods_name" label="商品名称" width="120"></el-table-column>
                <el-table-column prop="price" label="价格" width="120"></el-table-column>
                <!--<el-table-column prop="cost_price" label="成本价" width="120"></el-table-column>-->
                <!--<el-table-column prop="market_price" label="商品市场价" width="120"></el-table-column>-->

                <el-table-column prop="freight" label="邮费或运费" width="120"></el-table-column>
                <el-table-column prop="stock" label="总库存量" width="120"></el-table-column>
                <!--<el-table-column prop="keywords" label="商品关键词" width="120"></el-table-column>-->
                <!--<el-table-column prop="description" label="商品详情" width="120"></el-table-column>-->
                <el-table-column  label="是否热销">
                    <template slot-scope="scope">
                        <img :src="scope.row.is_hot==1?require('../../../assets/img/no.svg'):require('../../../assets/img/yes.svg')" height='20' width='20' @click="hotEdit(scope.$index,scope.row,'is_hot')">
                    </template>
                </el-table-column>
                <el-table-column  label="是否推荐">
                    <template slot-scope="scope">
                        <img :src="scope.row.is_recommend==1?require('../../../assets/img/no.svg'):require('../../../assets/img/yes.svg')" height='20' width='20' @click="recommendEdit(scope.$index,scope.row,'is_recommend')">
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
                <el-table-column prop="sort" width="90" label="排序"></el-table-column>
                <el-table-column prop="sale_time" width="155" label="上架时间"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-lx-news" @click="handleEdit(scope.$index,scope.row)">详情</el-button>
                        <el-button type="text" icon="el-icon-lx-roundclose" @click="handleDown(scope.$index,scope.row)">违规下架</el-button>
                        <!--<el-button type="text" icon="el-icon-lx-deletefill" @click="handleDelete(scope.$index,scope.row)">删除</el-button>-->

                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="totalCount" :page-size="limit">
                </el-pagination>
            </div>

            <!-- 编辑弹出框 -->
            <el-dialog title="商品详情" :visible.sync="editVisible" width="50%" @close='closeDialog'>
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="商品名称："><el-input v-html="form.goods_name" readyonly></el-input></el-form-item>
                    <el-form-item label="图片：">
                        <img class="default-image" :src="file_url + form.picture" width="80px" height="80px" @click="uploadVisible">
                        <!--<div v-show="upVisible"><v-upload-file  @remote-file-change="getUploadFileInfo"></v-upload-file></div>-->
                    </el-form-item>

                    <el-form-item label="价格："><el-input v-html="form.price"></el-input></el-form-item>
                    <!--<el-form-item label="成本价"><el-input v-model="form.cost_price"></el-input></el-form-item>-->
                    <!--<el-form-item label="商品市场价"><el-input v-model="form.market_price"></el-input></el-form-item>-->
                    <el-form-item label="邮费或运费："><el-input v-html="form.freight"></el-input></el-form-item>
                    <el-form-item label="总库存量："><el-input v-html="form.stock"></el-input></el-form-item>
                    <el-form-item label="商品关键词："><el-input v-html="form.keywords"></el-input></el-form-item>
                    <el-form-item label="商品详情：">

                        <el-input
                                type="textarea"
                                :rows="20"
                                v-html="form.description">
                        </el-input>

                    </el-form-item>


                    <el-form-item label="是否热销：">
                        <el-radio-group v-model="form.is_hot">
                            <el-radio label="1" value='1'>不是</el-radio>
                            <el-radio label="2" value='2'>是</el-radio>
                        </el-radio-group>
                    </el-form-item><el-form-item label="是否推荐：">
                    <el-radio-group v-model="form.is_recommend">
                        <el-radio label="1" value='1'>不是</el-radio>
                        <el-radio label="2" value='2'>是</el-radio>
                    </el-radio-group>
                </el-form-item>
                    <el-form-item label="状态：">
                        <el-radio-group v-model="form.status">
                            <el-radio label="1" value='1'>下架</el-radio>
                            <el-radio label="2" value='2'>正常</el-radio>
                            <el-radio label="3" value='3'>违规禁售</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序："><el-input v-html="form.sort"></el-input></el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <!--<el-button @click="editVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="editVisible = false">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 删除商品提示框 -->
            <el-dialog title="提示" :visible.sync="userHide" width="300px" center>
                <div class="del-dialog-cnt">确定要禁售此商品吗？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="userHide = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow()">确 定</el-button>
            </span>
            </el-dialog>

        </div>
    </div>
</template>

<script>
    import GoodsBllayer from '../../../store/bllayer/GoodsBllayer'
    import vUploadFile from '../../common/UploadFile.vue'

    export default {
        data: function(){
            return {
                form: {
                    goods_id: '',
                    shop_id: '',
                    category_id: '',
                    category_id_2: '',
                    category_id_3: '',
                    goods_name: '',
                    market_price:'',
                    price:'',
                    cost_price:'',
                    freight:'',
                    stock:'',
                    sale_num:'',
                    province_id:'',
                    city_id:'',
                    picture:'',
                    img_id_array:'',
                    keywords:'',
                    description:'',
                    goods_spec_ids:'',
                    goods_spec_names:'',
                    is_hot:'',
                    is_recommend:'',
                    status:'',
                    sale_time:'',
                    create_time:'',
                    sort:'',
                    idx:-1
                },
                params:null,
                data: [],
                page: 1,
                limit:0,
                totalCount:0,
                editVisible: false,
                userHide:false,
                select_id:'',
                select_name:'',
                upVisible:false,
                imgVisible:true,
                file_url:''
            }
        },
        components:{
            vUploadFile
        },
        methods: {
            formatStatus: function (row, column) {
                return row.status == 1 ? '下架' : row.status == 2 ? '正常' : '违规禁售';
            },
            formatHot: function (row, column) {
                return row.is_hot == 1 ? "<img src='../../../assets/img/no.png' height='20' width='20'/>" : row.is_hot == 2 ? '<img src="../../../assets/img/yes.png" height="20" width="20"/>' : '——';
            },
            formatTuijian: function (row, column) {
                return row.is_recommend == 1 ? "<img src='../../../assets/img/no.png' height='20' width='20'/>" : row.is_recommend == 2 ? '<img src="../../../assets/img/yes.png" height="20" width="20"/>' : '——';
            },
            uploadVisible(){
                this.upVisible = true;
            },
            getUploadFileInfo(file_url,file_name){
                this.form.fileName = file_name
                this.form.img =  file_name
                this.upVisible = false
            },
            closeDialog() {
                this.upVisible = false
            },

            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            search() {
                this.page = 1;
                this.getList();
            },
            getList(){
                var vm = this
                let para = {
                    page: this.page,
                    article_id:this.article_id,
                    title:this.title ,
                    keywords:this.keywords,
                    description:this.description,
                    origin:this.origin,
                    img:this.img,
                    article_category_id:this.article_category_id,
                    iden:this.iden,
                    status:this.status,
                    peruse_num:this.peruse_num,
                    sort:this.sort,
                    atime:this.atime,
                    select_id:this.select_id,
                    select_name:this.select_name
                };
                vm.params = para
                GoodsBllayer.getList(vm)
            },

            // 点击删除
            handleDelete(index,row){
                this.form = {
                    account: row.username,
                    name: row.full_name,
                    phone: row.phone,
                    goods_id:row.goods_id,
                    idx:index
                }
                this.userHide = true;
            },
            hotEdit(index,row,method_type,thisImg){
                var vm = this
                var hot_value = row.is_hot==1 ? 2 : 1;
                var hot_src = row.is_hot==1 ? 'yes' : 'no';
                hot_src = "../../../assets/img/"+hot_src+".svg";
                let init = {
                    goods_id:row.goods_id,
                    method_type:method_type,
                    value_data:hot_value
                }
                vm.inits = init

                GoodsBllayer.hotGoods(vm)
                //this.src=require(hot_src);
                this.$router.go(0);
            },
            recommendEdit(index,row,method_type,thisImg){
                var vm = this
                var hot_value = row.is_hot==1 ? 2 : 1;
                var tui_value = row.is_recommend==1 ? 2 : 1;
                if(method_type == 'is_hot'){
                    var data_value = hot_value;
                }else{
                    var data_value = tui_value;
                }
                var hot_src = row.is_hot==1 ? 'yes' : 'no';
                hot_src = "../../../assets/img/"+hot_src+".svg";
                let init = {
                    goods_id:row.goods_id,
                    method_type:method_type,
                    value_data:data_value
                }
                vm.inits = init

                GoodsBllayer.hotGoods(vm)
                //this.src=require(hot_src);
                this.$router.go(0);
            },
            // 下架处理
            handleDown(index,row){
                this.form = {
                    account: row.username,
                    name: row.full_name,
                    phone: row.phone,
                    goods_id:row.goods_id,
                    idx:index
                }
                this.userHide = true;
            },

            handleEdit(index,row) {
                this.form = {
                    goods_id:row.goods_id,
                    goods_name: row.goods_name,
                    picture: row.picture,
                    price: row.price,
                    freight: row.freight,
                    stock: row.stock,
                    sale_num: row.sale_num,
                    keywords: row.keywords,
                    description: row.description,
                    is_hot: row.is_hot,
                    is_recommend:row.is_recommend,
                    create_time:row.create_time,
                    sale_time:row.sale_time,
                    status:row.status,
                    sort:row.sort,
                    idx:index
                }
                this.editVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // 保存编辑
            saveEdit() {
                var vm = this
                let para = {
                    goods_id:this.form.goods_id,
                    title:this.form.title,
                    origin:this.form.origin,
                    img: this.form.img,
                    editor: this.form.editor,
                    article_category_id: this.form.article_category_id,
                    peruse_num: this.form.peruse_num,
                    keywords:this.form.keywords,
                    description:this.form.description,
                    iden:this.form.iden,
                    status:this.form.status,
                    sort:this.form.sort
                };
                vm.params = para
                GoodsBllayer.edit(vm)
                this.editVisible = false;
                //this.$message.success(`修改第 ${this.idx+1} 行成功`);
                //this.$router.go(0);	// 刷新
            },

            // 下架违规商品
            deleteRow(){
                var vm = this
                let init = {
                    goods_id:this.form.goods_id
                }
                vm.inits = init

                GoodsBllayer.goodsOff(vm)
                //this.initVisible = false;
                this.userHide = false;
                //this.$router.go(0);	// 刷新
            },
            updateGetList(){
                this.data[this.form.idx].username = this.form.account;
                this.data[this.form.idx].full_name = this.form.name;
                this.data[this.form.idx].phone = this.form.phone;
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
