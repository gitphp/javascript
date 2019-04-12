<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 商品列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="form.goods_id" placeholder="ID号" class="handle-input mr10"></el-input>
                <el-input v-model="form.goods_name" placeholder="商品名称" class="handle-input mr10"></el-input>
               
                <el-button type="primary" icon="search" @click="search(form)">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="goods_id" label="商品id" sortable width="150">
                </el-table-column><el-table-column prop="goods_name" label="商品名称" width="120">
                </el-table-column><el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="cost_price" label="成本价" ></el-table-column>
                <el-table-column prop="stock" label="库存"></el-table-column>
				<el-table-column prop="sale_num" label="销量"></el-table-column>
				<el-table-column prop="is_hot" label="是否热销"></el-table-column>
				<el-table-column prop="is_recommend" label="是否推荐"></el-table-column>
				<el-table-column prop="status" label="状态"></el-table-column>
				<el-table-column prop="sale_time" label="上架时间"></el-table-column>
				<el-table-column prop="sort" label="排序"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="totalCount" :page-size="limit">
                </el-pagination>
            </div>

            <!-- 编辑弹出框 -->
            <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
                <el-form ref="form" :model="form" label-width="50px">
                    <el-form-item label="账号"><el-input v-model="form.account"></el-input></el-form-item>
                    <el-form-item label="姓名"><el-input v-model="form.name"></el-input></el-form-item>
                    <el-form-item label="电话"><el-input v-model="form.phone"></el-input></el-form-item>
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
    import AdminBllayer from '../../../store/bllayer/AdminBllayer'
    import AdminEditBllayer from '../../../store/bllayer/AdminEditBllayer'

    export default {
        data: function(){
            return {
                form: {
                    account: '',
                    name: '',
                    phone:''
                },
				params:null,
                data: [],
                page: 1,
                limit:0,
                totalCount:0,
                editVisible: false
            }
        },
        methods: {
            formatStatus: function (row, column) {
                return row.status == 1 ? '正常' : row.status == 2 ? '禁用' : '未知';
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            getList(){
				var vm = this
                let para = {
                    page: this.page,
                    account:this.form.account,
                    name: this.form.name,
                    phone:this.form.phone
                };
				vm.params = para
                AdminBllayer.getList(vm)
            },
            handleEdit(row) {
                this.form = {
                    account: row.username,
                    name: row.full_name,
                    phone: row.phone,
                    id:row.id
                }
                this.editVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                console.log(this.form);
                var vm = this
                let para = {
                    id:this.form.id,
                    username:this.form.account,
                    full_name: this.form.name,
                    phone:this.form.phone
                };
                vm.params = para
                AdminEditBllayer.edit(vm)
                this.editVisible = false;
                //this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
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
