<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 管理员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_account" placeholder="账号" class="handle-input mr10"></el-input>
                <el-input v-model="select_name" placeholder="名字" class="handle-input mr10"></el-input>
                <el-input v-model="select_phone" placeholder="电话" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="username" label="账号" sortable width="150">
                </el-table-column>
                <el-table-column prop="full_name" label="名字" width="120">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="formatStatus">
                </el-table-column>
                <el-table-column prop="atime" label="创建时间">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-lx-refresh" @click="handleInit(scope.$index,scope.row)">初始化密码</el-button>
                        <!--<el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">开启</el-button>-->
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
                    <el-form-item label="账号">
                        <el-input v-model="form.account"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>

                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 初始化管理员密码提示框 -->
            <el-dialog title="提示" :visible.sync="initVisible" width="300px" center>
                <div class="del-dialog-cnt">初始化管理员密码(123456)</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="initVisible = false">取 消</el-button>
                <el-button type="primary" @click="initRow">确 定</el-button>
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
                    phone:'',
                    id:'',
                    idx:-1
                },
				params:null,
                data: [],
                page: 1,
                limit:0,
                totalCount:0,
                initVisible: false,
                editVisible: false,
                select_account:'',
                select_name:'',
                select_phone:''
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
            search() {
                this.page = 1;
                this.getList();
            },
            getList(){
				var vm = this
                let para = {
                    page: this.page,
                    account:this.select_account,
                    name: this.select_name,
                    phone:this.select_phone
                };
				vm.params = para
                AdminBllayer.getList(vm)
            },
            handleEdit(index,row) {
                this.form = {
                    account: row.username,
                    name: row.full_name,
                    phone: row.phone,
                    id:row.id,
                    idx:index
                }
                this.editVisible = true;
            },
            handleInit(index,row) {
                this.form = {
                    account: row.username,
                    name: row.full_name,
                    phone: row.phone,
                    id:row.id,
                    idx:index
                }
                this.initVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },

            // 保存编辑
            saveEdit() {
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
            // 确认初始化管理员密码
            initRow(){
                var vm = this
                let init = {
                    id:this.form.id,
                    password:'123456'
                }
                vm.inits = init
                console.log(vm)
                console.log('-------------')
                AdminEditBllayer.password(vm)
                this.initVisible = false;
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
