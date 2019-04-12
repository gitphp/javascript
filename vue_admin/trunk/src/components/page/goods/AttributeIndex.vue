<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-attention"></i> 商品属性列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_account" placeholder="属性名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" row-style="height:0" cell-style="padding:0" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="attr_id" label="属性值ID" sortable width="150"></el-table-column>
                <el-table-column prop="attr_name" label="属性名称" width="200"></el-table-column>
                <el-table-column prop="attr_value_type" label="属性值类型" width="110" :formatter="formatType"></el-table-column>
                <el-table-column prop="value" label="属性值数据"></el-table-column>

                <el-table-column prop="status" label="状态" width="100" :formatter="formatStatus"></el-table-column>
                <el-table-column prop="sort" label="排序"></el-table-column>

                <el-table-column label="操作" width="180" align="center">
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
            <el-dialog title="属性编辑" :visible.sync="editVisible" width="60%">
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="属性名称">
                        <el-input v-model="form.attr_name"></el-input>
                    </el-form-item>
                    <el-form-item label="属性值数据">
                        <el-input v-model="form.value"></el-input>
                    </el-form-item>
                    <el-form-item label="属性值类型">
                        <el-radio-group v-model="form.attr_value_type">
                            <el-radio label="1" value='1'>直接</el-radio>
                            <el-radio label="2" value='2'>单选</el-radio>
                            <el-radio label="3" value='3'>多选</el-radio>
                        </el-radio-group>
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
                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import AttributeBllayer from '../../../store/bllayer/AttributeBllayer'
    //    import AdminEditBllayer from '../../../store/bllayer/AdminEditBllayer'
    import GoodsBllayer from '../../../store/bllayer/GoodsBllayer';


    export default {
        data: function(){
            return {
                form: {
                    attr_id: '',
                    attr_name: '',
                    value:'',
                    attr_value_type:'',
                    status:'',
                    sort:'',
                    idx:-1
                },
                params:null,
                data: [],
                page: 1,
                limit:0,
                totalCount:0,
                editVisible: false,
                select_account:'',

                attr:['1','2'],
                use_in_goods_category:[]
            }
        },
        methods: {
            formatStatus: function (row, column) {
                return row.status == 1 ? '正常' : row.status == 2 ? '禁用' : '未知';
            },
            formatType: function (row, column) {
                return row.attr_value_type == 1 ? '直接' : row.attr_value_type == 2 ? '单选' : row.attr_value_type == 3 ?'多选' : '时间';
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
                    attr_id:this.attr_id,
                    attr_name:this.select_account ,
                    value:this.value,
                    attr_value_type:this.attr_value_type,
                    status:this.status,
                    sort:this.sort

                };
                vm.params = para
                AttributeBllayer.getList(vm)
            },
            handleEdit(index,row) {
                this.form = {
                    attr_name: row.attr_name,
                    attr_value_type: row.attr_value_type,
                    value: row.value,
                    attr_id:row.attr_id,
                    use_in_goods_category:row.use_in_goods_category,
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
                    attr_id:this.form.attr_id,
                    attr_name:this.form.attr_name,
                    value: this.form.value,
                    use_in_goods_category:this.form.use_in_goods_category,
                    attr_value_type:this.form.attr_value_type,
                    status:this.form.status,
                    sort:this.form.sort

                };
                vm.params = para
                AttributeBllayer.edit(vm)
                this.editVisible = false;
                //this.$message.success(`修改第 ${this.idx+1} 行成功`);
                this.$router.go(0);	// 刷新
            },
            updateGetList(){
                this.data[this.form.idx].username = this.form.account;
                this.data[this.form.idx].full_name = this.form.name;
                this.data[this.form.idx].phone = this.form.phone;
            },
            getCats(){
                let vm = this
                GoodsBllayer.getCats(vm)
            }
        },
        mounted() {
            this.getList();
            // 分类列表
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
