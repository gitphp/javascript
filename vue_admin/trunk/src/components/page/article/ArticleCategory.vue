<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-tag"></i> 文章分类列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_title" placeholder="分类名称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" row-style="height:0" cell-style="padding:0" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="id" label="ID" sortable width="60"></el-table-column>
                <el-table-column prop="img" label="图片" width="220">
                    <template scope="scope">
                        <img :src="file_url + scope.row.img" width="40" height="40" class="head_pic"/>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="分类名称"></el-table-column>

				<!--<el-table-column prop="keywords" label="关键词"></el-table-column>-->
				<!--<el-table-column prop="description" label="描述"></el-table-column>-->
				<!--<el-table-column prop="iden" label="标识符"></el-table-column>-->

				<el-table-column prop="status" label="状态" width="120" :formatter="formatStatus"></el-table-column>
                <el-table-column prop="sort" width="90" label="排序"></el-table-column>
				<el-table-column prop="atime" width="155" label="添加时间"></el-table-column>
				
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
            <el-dialog title="文章分类编辑" :visible.sync="editVisible" width="40%" @close='closeDialog'>
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="分类名称">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
					<el-form-item label="图片">
					    <img class="default-image" :src="file_url + form.img" width="80px" height="80px" @click="uploadVisible">
					    <div v-show="upVisible">
					        <v-upload-file  @remote-file-change="getUploadFileInfo"></v-upload-file>
					    </div>
					</el-form-item>
                    <el-form-item label="所属分类">
                        <el-select v-model="form.pid" placeholder="请选择">

                            <el-option v-for="(value,key) in attr" :key="key" :label="value" :value="key">{{value}}</el-option>

                            <!--<el-option key="2" label="小天才" value="2"></el-option>-->

                        </el-select>
                    </el-form-item>
					<el-form-item label="关键词">
					    <el-input v-model="form.keywords"></el-input>
					</el-form-item>
                    <el-form-item label="描述">
                        <el-input v-model="form.description"></el-input>
                    </el-form-item>
					<el-form-item label="标识符">
					    <el-input v-model="form.iden"></el-input>
					</el-form-item>
					<el-form-item label="状态">
						<el-radio-group v-model="form.status">
							<el-radio label="1" value='1'>正常</el-radio>
							<el-radio label="2" value='2'>删除</el-radio>
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
    import ArticleCategoryBllayer from '../../../store/bllayer/ArticleCategoryBllayer'
	import vUploadFile from '../../common/UploadFile.vue'
    import ArticleBllayer from '../../../store/bllayer/ArticleBllayer';

    export default {
        data: function(){
            return {
                form: {
                    id: '',
                    title: '',
                    img:'',
                    keywords:'',
					description:'',
					iden:'',
					status:'',
					atime:'',
					sort:'',
                    idx:-1
                },
				params:null,
                data: [],
                page: 1,
                limit:0,
                totalCount:0,
                editVisible: false,
                select_title:'',
				upVisible:false,
				imgVisible:true,
				file_url:'',

                attr:['1','2'],
                pid:[]
            }
        },
		components:{
		    vUploadFile
		},
        methods: {
            formatStatus: function (row, column) {
                return row.status == 1 ? '正常' : row.status == 2 ? '禁用' : '未知';
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
					id:this.id,
					title:this.title ,
					img:this.img,
					keywords:this.keywords,
					description:this.description,
					iden:this.iden,
					status:this.status,
					sort:this.sort,
					atime:this.atime,
					select_title:this.select_title
                };
				vm.params = para
                ArticleCategoryBllayer.getList(vm)
            },
            handleEdit(index,row) {
                this.form = {
					id:row.id,
                    title: row.title,
                    img: row.img,
                    value: row.value,
                    keywords:row.keywords,
					description:row.description,
					iden:row.iden,
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
                    id:this.form.id,
                    title:this.form.title,
                    img: this.form.img,
                    keywords:this.form.keywords,
					description:this.form.description,
					iden:this.form.iden,
					status:this.form.status,
					sort:this.form.sort
                };
                vm.params = para
                ArticleCategoryBllayer.edit(vm)
                this.editVisible = false;
                //this.$message.success(`修改第 ${this.idx+1} 行成功`);
				//this.$router.go(0);	// 刷新
            },
            updateGetList(){
                this.data[this.form.idx].username = this.form.account;
                this.data[this.form.idx].full_name = this.form.name;
                this.data[this.form.idx].phone = this.form.phone;
            },
            getCats(){
                let vm = this
                ArticleBllayer.getCats(vm)
            }
        },
        mounted() {
            this.getList();
            this.getCats()
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
