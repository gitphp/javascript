<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-vipcard"></i> 商品规格列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_name" placeholder="规格名称" class="handle-input mr10"></el-input>
                <el-input v-model="select_shop_id" placeholder="店铺ID" class="handle-input mr10"></el-input>
                <!-- <el-input v-model="select_phone" placeholder="电话" class="handle-input mr10"></el-input> -->
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            </div>
            <el-table :data="data" border class="table"  row-style="height:0" cell-style="padding:0" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="spec_id" label="规格ID" sortable width="150"></el-table-column>
                <!--<el-table-column prop="shop_id" label="店铺ID" width="120"></el-table-column>-->
                <el-table-column prop="spec_name" label="规格名称"></el-table-column>
                <el-table-column prop="show_type" label="展示方式" :formatter="formatType"></el-table-column>
                <el-table-column prop="is_screen" label="是否参与筛选" :formatter="formatScreen"></el-table-column>
                <!--<el-table-column prop="is_platform" label="是否是平台规格" :formatter="formatPlatform"></el-table-column>-->
                <el-table-column prop="status" label="状态" width="90" :formatter="formatStatus"></el-table-column>
                <el-table-column prop="sort" label="排序" width="100"></el-table-column>
                <el-table-column prop="create_time" label="创建时间"></el-table-column>

                <el-table-column label="操作" width="90" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-lx-edit" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="totalCount" :page-size="limit">
                </el-pagination>
            </div>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑" :visible.sync="editVisible" width="40%">
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="规格名称">
                        <el-input v-model="form.spec_name" :formatter="formatName"></el-input>
                    </el-form-item>

                    <el-form-item label="规格选项">
                        <div v-for="(item,key) in items">
                            <el-input v-model="form.spec_item_name[key]">
                                <template slot="append">
                                    <i class="el-icon-lx-add" @click="onAdd"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <i class="el-icon-lx-move" @click="onMove"></i>
                                </template>
                            </el-input>
                        </div>


                    </el-form-item>

                    <el-form-item label="展示方式">
                        <el-radio-group v-model="form.show_type">
                            <el-radio label="1" value='1'>文字</el-radio>
                            <el-radio label="2" value='2'>颜色</el-radio>
                            <el-radio label="3" value='3'>图片</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="用于商品分类">
                        <el-select v-model="form.use_in_goods_category" placeholder="请选择">

                            <el-option v-for="(value,key) in attr" :key="key" :label="value" :value="key">{{value}}</el-option>
                            <!--<el-option key="2" label="小天才" value="2"></el-option>-->
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否参与筛选">
                        <el-radio-group v-model="form.is_screen">
                            <el-radio label="1" value='1'>参与</el-radio>
                            <el-radio label="2" value='2'>不参与</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="状态">
                        <el-radio-group v-model="form.status">
                            <el-radio label="1" value='1'>正常</el-radio>
                            <el-radio label="2" value='2'>禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="form.sort"></el-input>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                <!--<el-button @click="editVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="saveEdit">提交</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import SpecBllayer from '../../../store/bllayer/SpecBllayer'
    import GoodsBllayer from '../../../store/bllayer/GoodsBllayer';

    export default {
        data: function(){
            return {
                form: {
                    shop_id: '',
                    spec_name: '',
                    show_type:'',
                    spec_id:'',
                    is_screen:'',
                    is_platform:'',
                    status:'',
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
                select_name:'',
                select_shop_id:'',

                attr:['1','2'],
                use_in_goods_category:[],

            }
        },
        methods: {
            formatStatus: function (row, column) {
                return row.status == 1 ? '正常' : row.status == 2 ? '禁用' : '未知';
            },
            formatType: function (row, column) {
                return row.show_type == 1 ? '文字' : row.show_type == 2 ? '颜色' : '图片';
            },
            formatScreen: function (row, column) {
                return row.is_screen == 1 ? '参与' : row.is_screen == 2 ? '不参与' : '其他';
            },
            formatName: function (row, column) {
                return row.form.spec_name.substring(0,4);
                //let str = "abcde";
                //let reg = /(.*)(?=d)/;
                //console.log(str.match(/(.*)(?=:)/)[0]);
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
                    shop_id:this.shop_id,
                    spec_name:this.spec_name ,
                    show_type:this.show_type,
                    spec_id:this.spec_id,
                    is_screen:this.is_screen,
                    is_platform:this.is_platform,
                    status:this.status,
                    create_time:this.create_time,
                    sort:this.sort,
                    select_name:this.select_name,
                    select_shop_id:this.select_shop_id

                };
                vm.params = para
                SpecBllayer.getList(vm)
            },
            handleEdit(index,row) {
                let item = row.spec_name.match(/:(\S*)/)[1];
                let item_arr = item.split(",");
                console.log(item_arr);
                let items=['a'];
                // todo 修改选项列表
                this.form = {
                    spec_name: row.spec_name.match(/(\S*):/)[1],    // 格式化取消后面的规格选项
                    show_type: row.show_type,
                    is_screen: row.is_screen,
                    is_platform:row.is_platform,
                    status:row.status,
                    spec_id:row.spec_id,
                    sort:row.sort,
                    id:row.id,
                    item_arr:item_arr,
                    use_in_goods_category:row.use_in_goods_category,
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
                    spec_id:this.form.spec_id,
                    spec_name:this.form.spec_name,
                    show_type: this.form.show_type,
                    is_screen:this.form.is_screen,
                    is_platform:this.form.is_platform,
                    status:this.form.status,
                    use_in_goods_category:this.form.use_in_goods_category,
                    sort:this.form.sort,
                };
                vm.params = para
                SpecBllayer.edit(vm)
                this.editVisible = false;

                this.$router.go(0);	// 刷新
            },
            updateGetList(){
                this.data[this.form.idx].username = this.form.account;
                this.data[this.form.idx].full_name = this.form.name;
                this.data[this.form.idx].phone = this.form.phone;
            },
            onAdd(){

                this.items.push(Math.random())
            },
            onMove(){

                this.items.shift()
            },
            getCats(){
                let vm = this
                GoodsBllayer.getCats(vm)
            }
        },
        mounted() {
            this.getList();
            // 商品分类列表
            this.getCats();
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
