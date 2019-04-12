<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-tag"></i> 文章列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_title" placeholder="文章标题" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            </div>
            <el-table :data="data" border class="table" row-style="height:0" cell-style="padding:0" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column prop="article_id" label="ID" sortable width="60"></el-table-column>
                <el-table-column prop="img" label="图片" width="120">
                    <template scope="scope">
                        <img :src="file_url + scope.row.img" width="40" height="40" class="head_pic"/>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="文章标题" width="120"></el-table-column>
                <el-table-column prop="article_category_id" label="文章分类"></el-table-column>
				<el-table-column prop="editor" label="编辑者" width="120"></el-table-column>
				<el-table-column prop="origin" label="内容来源" width="120"></el-table-column>
				<!--<el-table-column prop="keywords" label="关键词" width="120"></el-table-column>-->
				<!--<el-table-column prop="description" label="描述" width="120"></el-table-column>-->
				<!--<el-table-column prop="iden" label="标识符"></el-table-column>-->
				<!--<el-table-column prop="peruse_num" label="阅读数"></el-table-column>-->
				<el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
                <el-table-column prop="sort" width="90" label="排序"></el-table-column>
				<el-table-column prop="atime" width="155" label="添加时间"></el-table-column>
				
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-lx-edit" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-lx-deletefill" @click="handleDelete(scope.$index,scope.row)">删除</el-button>

                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="totalCount" :page-size="limit">
                </el-pagination>
            </div>

            <!-- 编辑弹出框 -->
            <el-dialog title="文章编辑" :visible.sync="editVisible" width="50%" @close='closeDialog'>
                <el-form ref="form" :model="form" label-width="150px">
                    <el-form-item label="文章标题"><el-input v-model="form.title"></el-input></el-form-item>
                    <el-form-item label="编辑者"><el-input v-model="form.editor"></el-input></el-form-item>
                    <el-form-item label="内容来源"><el-input v-model="form.origin"></el-input></el-form-item>
                    <el-form-item label="关键词"><el-input v-model="form.keywords"></el-input></el-form-item>
                    <el-form-item label="描述"><el-input v-model="form.description"></el-input></el-form-item>
                    <el-form-item label="标识符"><el-input v-model="form.iden"></el-input></el-form-item>

                    <el-form-item label="所属分类">
                        <el-select v-model="form.article_category_id" placeholder="请选择">

                            <el-option v-for="(value,key) in attr" :key="key" :label="value" :value="key">{{value}}</el-option>

                            <!--<el-option key="2" label="小天才" value="2"></el-option>-->

                        </el-select>
                    </el-form-item>
					<el-form-item label="图片">
					    <img class="default-image" :src="file_url + form.img" width="80px" height="80px" @click="uploadVisible">
					    <div v-show="upVisible">
					        <v-upload-file  @remote-file-change="getUploadFileInfo"></v-upload-file>
					    </div>
					</el-form-item>
                    <el-form-item label="文章内容">
                        <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
                    </el-form-item>
					<el-form-item label="阅读数"><el-input v-model="form.peruse_num"></el-input></el-form-item>

					<el-form-item label="状态">
						<el-radio-group v-model="form.status">
							<el-radio label="1" value='1'>草稿</el-radio>
							<el-radio label="2" value='2'>发布中</el-radio>
							<el-radio label="3" value='3'>删除</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="排序"><el-input v-model="form.sort"></el-input></el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                <!--<el-button @click="editVisible = false">取 消</el-button>-->
                <el-button type="primary" @click="saveEdit">提交</el-button>
            </span>
            </el-dialog>

            <!-- 删除文章提示框 -->
            <el-dialog title="提示" :visible.sync="userHide" width="300px" center>
                <div class="del-dialog-cnt">确定要删除此文章吗？</div>
                <span slot="footer" class="dialog-footer">
                <el-button @click="userHide = false">取 消</el-button>
                <el-button type="primary" @click="initRow()">提 交</el-button>
            </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>

    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import vUploadFile from '../../common/UploadFile.vue'
    import { quillEditor } from 'vue-quill-editor';
    import ArticleBllayer from '../../../store/bllayer/ArticleBllayer';

    export default {
        data: function(){
            return {
                form: {
                    article_id: '',
                    title: '',
					editor:'',
					origin:'',
                    article_category_id:'',
                    keywords:'',
					description:'',
					img:'',
					iden:'',
					peruse_num:'',
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
                userHide:false,
                select_title:'',
				upVisible:false,
				imgVisible:true,
				file_url:'',

                attr:['1','2'],
                article_category_id:[]
            }
        },
		components:{
		    vUploadFile,
            quillEditor
		},
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            formatStatus: function (row, column) {
                return row.status == 1 ? '草稿' : row.status == 2 ? '发布中' : '删除';
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
                    content:this.content,
					article_category_id:this.article_category_id,
					iden:this.iden,
					status:this.status,
					peruse_num:this.peruse_num,
					sort:this.sort,
					atime:this.atime,
					select_title:this.select_title
                };
				vm.params = para
                ArticleBllayer.getList(vm)
            },

            // 点击删除
            handleDelete(index,row){
                this.form = {
                    account: row.username,
                    name: row.full_name,
                    phone: row.phone,
                    article_id:row.article_id,
                    idx:index
                }
                this.userHide = true;
            },
            handleEdit(index,row) {
                this.form = {
                    article_id:row.article_id,
                    title: row.title,
                    origin: row.origin,
                    editor: row.editor,
                    img: row.img,
                    content: row.content,
                    article_category_id: row.article_category_id,
                    peruse_num: row.peruse_num,
                    iden: row.iden,
                    keywords:row.keywords,
					description:row.description,
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
                    article_id:this.form.article_id,
                    title:this.form.title,
                    origin:this.form.origin,
                    img: this.form.img,
                    editor: this.form.editor,
                    content: this.form.content,
                    article_category_id: this.form.article_category_id,
                    peruse_num: this.form.peruse_num,
                    keywords:this.form.keywords,
					description:this.form.description,
					iden:this.form.iden,
					status:this.form.status,
					sort:this.form.sort
                };
                vm.params = para
                ArticleBllayer.edit(vm)
                this.editVisible = false;
                //this.$message.success(`修改第 ${this.idx+1} 行成功`);
				//this.$router.go(0);	// 刷新
            },
            // 删除文章
            initRow(){
                var vm = this
                let init = {
                    article_id:this.form.article_id
                }
                vm.inits = init

                ArticleBllayer.articleDelete(vm)
                //this.initVisible = false;
                this.userHide = false;
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
