<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 广告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_name" placeholder="名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="name" label="名称" sortable width="150">
                </el-table-column>
                <el-table-column prop="img" label="图片" width="120">
                    <template scope="scope">
                        <img :src="file_url + scope.row.img" width="120" height="120" class="head_pic"/>
                    </template>
                </el-table-column>
                <el-table-column prop="url" label="跳转地址">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="sort" label="排序">
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
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
            <el-dialog title="编辑" :visible.sync="editVisible" width="40%" @close='closeDialog'>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="图片">
                        <img class="default-image" :src="file_url + form.img" width="80px" height="80px" @click="uploadVisible">
                        <div v-show="upVisible">
                            <v-upload-file  @remote-file-change="getUploadFileInfo"></v-upload-file>
                        </div>
                    </el-form-item>
                    <el-form-item label="跳转地址">
                        <el-input v-model="form.url"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.remark"></el-input>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input v-model="form.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-radio-group v-model="form.status">
                            <el-radio label="禁用"></el-radio>
                            <el-radio label="开启"></el-radio>
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
    import AdBllayer from '../../../store/bllayer/AdBllayer'
    import AdEditBllayer from '../../../store/bllayer/AdEditBllayer'
    import vUploadFile from '../../common/UploadFile.vue'

    export default {
        data: function(){
            return {
                form: {
                    name:'',
                    img:'',
                    url:'',
                    remark:'',
                    sort:'',
                    status:'',
                    fileName:''
                },
				params:null,
                data: [],
                page: 1,
                limit:0,
                totalCount:0,
                editVisible: false,
                select_account:'',
                select_name:'',
                select_phone:'',
                upVisible:false,
                imgVisible:true,
                idx:-1,
                file_url:''
            }
        },
        components:{
            vUploadFile
        },
        methods: {
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
            formatter: function (row, column) {
                return row.status == 1 ? '正常' : '禁用';
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
                    name: this.select_name
                };
				vm.params = para
                AdBllayer.getList(vm)
            },
            handleEdit(index,row) {
                this.form = {
                    id:row.id,
                    name: row.name,
                    img: row.img,
                    url: row.url,
                    remark:row.remark,
                    sort: row.sort,
                    status: row.status == 1 ? '开启' : '禁用',
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
                    id:this.form.id,
                    name:this.form.name,
                    img: this.form.img,
                    url:this.form.url,
                    remark:this.form.remark,
                    status:this.form.status == '开启' ? '1' : '2',
                };
                vm.params = para
                AdEditBllayer.edit(vm)
                this.editVisible = false;
                //this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            updateGetList(){
                console.log(this.form)
                this.data[this.form.idx].name = this.form.name;
                this.data[this.form.idx].img = this.form.img;
                this.data[this.form.idx].url = this.form.url;
                this.data[this.form.idx].remark = this.form.remark;
                this.data[this.form.idx].status = this.form.status;
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
