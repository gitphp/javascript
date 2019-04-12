<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 商户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div v-if="visible" >
            <div class="handle-box">
                <el-input v-model="select_name" placeholder="店铺名称" class="handle-input mr10"></el-input>
                <el-input v-model="select_tel" placeholder="店铺电话" class="handle-input mr10"></el-input>
                <el-input v-model="select_phone" placeholder="店铺手机号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="shop_logo" label="店铺LOGO" width="120">
                </el-table-column>
                <el-table-column prop="shop_name" label="店铺名称" sortable width="150">
                </el-table-column>
                <el-table-column prop="shop_address" label="店铺地址">
                </el-table-column>
                <el-table-column prop="contacts" label="店铺联系人">
                </el-table-column>
                <el-table-column prop="shop_tel" label="店铺电话">
                </el-table-column>
                <el-table-column prop="phone" label="店铺手机号">
                </el-table-column>
                <el-table-column prop="introduction" label="店铺介绍">
                </el-table-column>
                <el-table-column prop="shop_status" label="店铺状态" :formatter="formatStatus">
                </el-table-column>
                <el-table-column prop="creat_time" label="店铺创建时间">
                </el-table-column>
                <el-table-column prop="user_name" label="用户昵称" sortable width="150">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleDetail(scope.row)">详情</el-button>
                        <el-button type="text" icon="el-icon-lx-lock" v-if="scope.row.shop_status=='1'" class="blue" @click="handleUp(scope.$index, scope.row, 3)">开启</el-button>
                        <el-button type="text" icon="el-icon-lx-unlock" v-if="scope.row.shop_status=='2'" class="red" @click="handleUp(scope.$index, scope.row, 3)">关闭</el-button>
                        <el-button type="text" icon="el-icon-lx-lock" v-if="scope.row.shop_status=='3'" class="blue" @click="handleUp(scope.$index, scope.row, 1)">审核通过</el-button>
                        <el-button type="text" icon="el-icon-lx-lock" v-if="scope.row.shop_status=='3'" class="blue" @click="handleUp(scope.$index, scope.row, 2)">审核不通过</el-button>
                        <el-button type="text" icon="el-icon-lx-unlock" v-if="scope.row.shop_status=='4'" class="blue" @click="handleUp(scope.$index, scope.row, 1)">审核通过</el-button>
                        <el-button type="text" icon="el-icon-lx-lock" v-if="scope.row.shop_status=='4'" class="blue" @click="handleUp(scope.$index, scope.row, 2)">审核不通过</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="totalCount" :page-size="limit">
                </el-pagination>
            </div>
            <!-- 禁用用户提示框 -->
            <el-dialog title="提示" :visible.sync="userHide" width="300px" center>
                <div class="del-dialog-cnt">确定要禁用此用户吗？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="userHide = false">取 消</el-button>
                <el-button type="primary" @click="upStatus(1)">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 开启用户提示框 -->
            <el-dialog title="提示" :visible.sync="initVisible" width="300px" center>
                <div class="del-dialog-cnt">确定要开启此用户吗？</div>
                <span slot="footer" class="dialog-footer">
			    <el-button @click="initVisible = false">取 消</el-button>
			    <el-button type="primary" @click="upStatus(1)">确 定</el-button>
			</span>
            </el-dialog>
            <!-- 审核不通过提示框 -->
            <el-dialog title="提示" :visible.sync="disAbleUser" width="300px" center>
                <div class="del-dialog-cnt">确定要驳回此用户吗？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="disAbleUser = false">取 消</el-button>
                <el-button type="primary" @click="upStatus(2)">确 定</el-button>
            </span>
            </el-dialog>
            <!-- 审核通过提示框 -->
            <el-dialog title="提示" :visible.sync="openUser" width="300px" center>
                <div class="del-dialog-cnt">确定要通过此用户吗？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="openUser = false">取 消</el-button>
                <el-button type="primary" @click="upStatus(2)">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        <div v-if="!visible" class="container">
            <el-form ref="form" :model="form" label-width="80px">
                <el-col :span="11">
                    <el-form-item label="店铺ID">:
                        {{form.shop_id}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺名称">:
                        {{form.shop_name}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺LOGO">:
                        {{form.shop_logo}}
                    </el-form-item>
                </el-col>

                <el-col :span="11">
                    <el-form-item label="店铺所在的省">:
                        {{form.province_name}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺所在的市">:
                        {{form.city_name}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="邮政编码">:
                        {{form.shop_zip}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺联系人">:
                        {{form.contacts}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺电话">:
                        {{form.shop_tel}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺手机号">:
                        {{form.phone}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺邮箱">:
                        {{form.email}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="是否推荐">:
                        {{form.shop_recommend}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺seo关键字">:
                        {{form.shop_keywords}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺介绍">:
                        {{form.introduction}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺状态">:
                        {{form.shop_status}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="店铺用户名">:
                        {{form.user_name}}
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="创建时间">:
                        {{form.create_time}}
                    </el-form-item>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="back">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import ShopBllayer from '../../../store/bllayer/ShopBllayer'

    export default {
        data: function(){
            return {
                form: {
                    shop_id:'',
                    shop_name:'',
                    shop_logo:'',
                    province_name:'',
                    city_name:'',
                    shop_zip:'',
                    contacts:'',
                    shop_tel:'',
                    phone:'',
                    email:'',
                    shop_recommend:'',
                    shop_keywords:'',
                    introduction:'',
                    shop_status:'',
                    user_name:'',
                    create_time:''
                },
                dt:{
                  shop_id:'',
                  shop_status:'',
                  idx:-1
                },
				params:null,
                data: [],
                page: 1,
                limit:0,
                totalCount:0,
                select_name:'',
                select_tel:'',
                select_phone:'',
                visible:true,
                initVisible: false,
                userHide:false,
                disAbleUser:false,
                openUser:false
            }
        },
        methods: {
            formatStatus: function (row, column) {
                return row.shop_status == 1 ? '关闭' : row.shop_status == 2 ? '开启' : row.shop_status == 3 ? '审核中' : row.shop_status == 4 ? '未通过' : '未知';
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
                    account:this.select_tel,
                    name: this.select_name,
                    phone:this.select_phone
                };
				vm.params = para
                ShopBllayer.getList(vm)
            },
            handleDetail(row) {
                var vm = this
                vm.params = row.shop_id
                ShopBllayer.getDetail(vm)
                this.visible = false
            },
            back(){
                this.visible = true
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleUp(index,row,num){
                //console.log(row.shop_status)
                if(num == 3){//开启或者禁用
                    if(row.shop_status == 1){//原先状态是关闭 现在要修改成开启
                        this.dt = {
                            shop_id:row.shop_id,
                            shop_status:2,
                            idx:index
                        }
                        this.initVisible = true
                    }
                    if(row.shop_status == 2){//原先状态是开启 现在要修改成关闭
                        this.dt = {
                            shop_id:row.shop_id,
                            shop_status:1,
                            idx:index
                        }
                        this.userHide = true
                    }
                }
                if(num == 2){//待审核的
                    this.dt = {
                        shop_id:row.shop_id,
                        shop_status:4,
                        idx:index
                    }
                    this.disAbleUser = true
                }
                if(num == 1){//通过审核
                    this.dt = {
                        shop_id:row.shop_id,
                        shop_status:2,
                        idx:index
                    }
                    this.openUser = true
                }
            },
            upStatus(flag){
                var vm = this
                let init = {
                    shop_id:this.dt.shop_id,
                    shop_status:this.dt.shop_status
                }
                vm.params = init
                if(flag == 1){
                    ShopBllayer.disAble(vm)
                    if(this.dt.shop_status == 2){
                        this.initVisible = false;
                    }
                    if(this.dt.shop_status == 1){
                        this.userHide = false;
                    }
                }
                if(flag == 2){
                    ShopBllayer.upData(vm)
                    if(this.dt.shop_status == 4){
                        this.disAbleUser = false;
                    }
                    if(this.dt.shop_status == 2){
                        this.openUser = false;
                    }
                }
            },
            upDisable(){
                this.data[this.dt.idx].shop_status = this.dt.shop_status;
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
