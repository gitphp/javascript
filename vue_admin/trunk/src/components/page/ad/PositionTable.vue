<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 广告位</el-breadcrumb-item>
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
                <el-table-column prop="iden" label="标识符" sortable width="150">
                </el-table-column>
                <el-table-column prop="imgs" label="广告图" >
                    <template scope="scope">
                        <div v-for="img in scope.row.imgs" :key="img.idx">
                            <img :src="file_url + img.img" width="120" height="120" class="head_pic"/>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
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
                    <el-form-item label="标识符">
                        <el-input v-model="form.iden"></el-input>
                    </el-form-item>
                    <el-form-item label="广告图">
                        <div  v-on:click="showImgs" v-if="addPic">添加广告图</div>
                        <div v-for="img in form.imgs_temp" :key="img.idx">
                            <i class="el-icon-close" style="position: absolute;padding-left: 121px;" v-on:click="closeImg(img.id)"></i>
                            <img :src="file_url + img.img" width="120" height="120" class="head_pic"  v-on:click="showImgs"/>
                        </div>
                        <hr  v-if="showPic">
                        <div v-for="img in adlist" :key="img.id" v-if="showPic">
                            <img :src="file_url + img.img" width="120" height="120" class="head_pic" v-on:click="addImg(img.id,img.img)"/>
                        </div>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-radio-group v-model="form.status">
                            <el-radio label="开启"></el-radio>
                            <el-radio label="禁用"></el-radio>
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
    import PositionBllayer from '../../../store/bllayer/PositionBllayer'
    import vUploadFile from '../../common/UploadFile.vue'
    import Icon from "../Icon";

    export default {
        data: function(){
            return {
                form: {
                    name:'',
                    iden:'',
                    imgs:[],
                    imgs_temp:[],
                    ads:'',
                    status:'',
                    fileName:''
                },
				params:null,
                data: [],
                adlist:[],
                page: 1,
                limit:0,
                totalCount:0,
                select_name:'',
                editVisible:false,
                idx:-1,
                file_url:'',
                showPic:false,
                addPic:false
            }
        },
        components:{
            Icon,
            vUploadFile
        },
        methods: {
            addImg(id,img){
                if(this.form.imgs_temp[id]){
                    console.log('图片存在')
                }else{
                    this.form.imgs_temp.push({'id':id,'img':img})
                }
                if(this.form.imgs_temp.length != 0){
                    this.addPic = false
                }
            },
            closeImg(id){
                this.form.imgs_temp.forEach(function(value,index,array){
                    if(id == value.id){
                        array.splice(index,1)
                    }
                })
                if(this.form.imgs_temp.length == 0){
                    this.addPic = true
                }
            },
            showImgs(){
                console.log(this.form)
                this.showPic = true
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
                this.showPic = false
            },
            formatter: function (row, column) {
                return row.status == 1 ? '开启' : '禁用';
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
                PositionBllayer.getList(vm)
            },
            handleEdit(index,row) {
                this.form = {
                    id:row.id,
                    name: row.name,
                    iden: row.iden,
                    imgs: row.imgs,
                    imgs_temp: row.imgs,
                    status: row.status === 1 ? '开启' : '禁用',
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
                var f_ads = ''
                for(var index in vm.form.imgs_temp){
                    f_ads += vm.form.imgs_temp[index].id + ','
                }
                let para = {
                    id:vm.form.id,
                    name:vm.form.name,
                    iden: vm.form.iden,
                    ads:f_ads.slice(0,-1),
                    status:vm.form.status == '开启' ? '1' : '2',
                };
                vm.params = para
                PositionBllayer.edit(vm)
                this.editVisible = false;
            },
            updateGetList(){
                this.data[this.form.idx].name = this.form.name;
                this.data[this.form.idx].iden = this.form.iden;
                this.data[this.form.idx].imgs = this.form.imgs_temp;
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
