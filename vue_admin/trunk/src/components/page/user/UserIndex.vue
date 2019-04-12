<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-peoplefill"></i> 用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_email" placeholder="邮箱" class="handle-input mr10"></el-input>
                <el-input v-model="select_userName" placeholder="名字" class="handle-input mr10"></el-input>
                <el-input v-model="select_mobile" placeholder="手机" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" row-style="height:0" cell-style="padding:0" @selection-change="handleSelectionChange">
                <el-table-column prop="id" label="ID" sortable width="150"></el-table-column>
                <el-table-column prop="head_img" label="头像" width="120">
                    <template scope="scope">
                        <img :src="file_url + scope.row.head_img" width="40" height="40" class="head_pic"/>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机号码" width="120"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
				<el-table-column prop="username" label="昵称"></el-table-column>
				<!-- <el-table-column prop="wx_openid" width="320" label="微信openid"></el-table-column> -->
				<!-- <el-table-column prop="invite_code" label="邀请码"></el-table-column> -->
                <el-table-column prop="status" label="状态" :formatter="formatStatus">
                </el-table-column>
                <el-table-column prop="join_time" width="155" label="注册时间">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <!-- <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)">编辑</el-button> -->
                        <!-- <el-button type="text" icon="el-icon-lx-refresh" @click="handleInit(scope.$index,scope.row)">初始化密码</el-button> -->
                        <el-button type="text" icon="el-icon-lx-lock" v-if="scope.row.status=='1'" class="red" @click="handleHide(scope.$index, scope.row)">禁用</el-button>
                        <el-button type="text" icon="el-icon-lx-unlock" v-if="scope.row.status=='2'" class="blue" @click="handleInit(scope.$index, scope.row)">开启</el-button>
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
                    <el-form-item label="手机号码">
                        <el-input v-model="form.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
					

                </el-form>
                <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
            </el-dialog>

            <!-- 禁用用户提示框 -->
            <el-dialog title="提示" :visible.sync="userHide" width="300px" center>
                <div class="del-dialog-cnt">确定要禁用此用户吗？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="userHide = false">取 消</el-button>
                <el-button type="primary" @click="initRow(2)">确 定</el-button>
            </span>
            </el-dialog>
			<!-- 开启用户提示框 -->
			<el-dialog title="提示" :visible.sync="initVisible" width="300px" center>
			    <div class="del-dialog-cnt">确定要开启此用户吗？</div>
			    <span slot="footer" class="dialog-footer">
			    <el-button @click="initVisible = false">取 消</el-button>
			    <el-button type="primary" @click="initRow(1)">确 定</el-button>
			</span>
			</el-dialog>
			
        </div>
    </div>
</template>

<script>
    import UserBllayer from '../../../store/bllayer/UserBllayer.js'
    import AdminEditBllayer from '../../../store/bllayer/AdminEditBllayer'

    export default {
        data: function(){
            return {
                form: {
                    mobile: '',
                    email: '',
                    username:'',
					head_img:'',
					wx_openid:'',
					join_time:'',
					invite_code:'',
					status:'',
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
				userHide:false,
                select_email:'',
                select_userName:'',
                select_mobile:''
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
			// 搜索条件
            search() {
                this.page = 1;
                this.getList();
            },
            getList(){
				var vm = this
                let para = {
                    page: this.page,
                    email:this.select_email,
                    userName: this.select_userName,
                    mobile:this.select_mobile
                };
				vm.params = para
                UserBllayer.getList(vm)
            },
            handleEdit(index,row) {
                this.form = {
                    mobile: row.mobile,
                    email: row.email,
                    username: row.username,
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
			handleHide(index,row) {
			    this.form = {
			        account: row.username,
			        name: row.full_name,
			        phone: row.phone,
			        id:row.id,
			        idx:index
			    }
			    this.userHide = true;
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
            // 开启禁用用户管理
            initRow(status){
                var vm = this
                let init = {
                    id:this.form.id,
                    status:status
                }
                vm.inits = init
                console.log(vm)
                console.log('-------------')
                UserBllayer.changeStatus(vm)
                this.initVisible = false;
				this.userHide = false;
				this.$router.go(0);	// 刷新
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
