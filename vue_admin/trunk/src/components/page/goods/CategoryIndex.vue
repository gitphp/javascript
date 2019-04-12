<template>
	<div class="table">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 分类列表</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-table :data="data" style="width: 100%">
				<el-table-column prop="category_name" label="名称" width="120">
					<template slot-scope="scope">
						<div v-on:click="hier(scope.$index,scope.row)">
							<!--<i class="el-icon-lx-add"></i>-->
							<i :class="{'el-icon-lx-add':scope.row.hasChildren}"></i>
							<i :class="{'el-icon-lx-move':!scope.row.hasChildren}"></i>
							<span style="margin-left: 10px">{{ scope.row.category_name }}</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="short_name" label="简称"></el-table-column>
				<el-table-column prop="category_pic" label="图片">
					<template scope="scope">
						<img :src="file_url + scope.row.category_pic" width="120" height="120" class="head_pic"/>
					</template>
				</el-table-column>
				<el-table-column prop="relation_goods_attribute_name" label="属性"></el-table-column>
				<!--<el-table-column prop="keywords" label="关键字"></el-table-column>
				<el-table-column prop="description" label="描述"></el-table-column>
				<el-table-column prop="sort" label="排序"></el-table-column>-->
				<el-table-column prop="is_visible" label="是否显示" :formatter="formatStatus"></el-table-column>
				<el-table-column label="操作" width="180" align="center">
					<template slot-scope="scope">
						<el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<!--<el-button type="text" icon="el-icon-lx-lock" v-if="scope.row.is_visible=='2'" class="blue" @click="handleUp(scope.$index, scope.row, 1)">显示</el-button>
						<el-button type="text" icon="el-icon-lx-lock" v-if="scope.row.is_visible=='1'" class="red" @click="handleUp(scope.$index, scope.row, 2)">隐藏</el-button>-->
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
					<el-form-item label="名称"><el-input v-model="form.category_name"></el-input></el-form-item>
					<el-form-item label="简称"><el-input v-model="form.short_name"></el-input></el-form-item>
					<el-form-item label="图片">
						<img class="default-image" :src="file_url + form.category_pic" width="80px" height="80px" @click="uploadVisible">
						<div v-show="upVisible">
							<v-upload-file  @remote-file-change="getUploadFileInfo"></v-upload-file>
						</div>
					</el-form-item>
					<el-form-item label="属性">
						<el-checkbox-group v-model="relation_goods_attribute_name_array_new">
							<el-checkbox v-for="(item,index) in attr" :label="item" :key="index">{{item}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="是否显示">
						<el-radio-group v-model="form.is_visible">
							<el-radio label="1" value='1'>显示</el-radio>
							<el-radio label="2" value='2'>隐藏</el-radio>
						</el-radio-group>
					</el-form-item>
					<!--<el-form-item label="关键字"><el-input v-model="form.keywords"></el-input></el-form-item>
					<el-form-item label="描述"><el-input v-model="form.description"></el-input></el-form-item>
					<el-form-item label="排序"><el-input v-model="form.sort"></el-input></el-form-item>-->
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
    import CategoryBllayer from '../../../store/bllayer/CategoryBllayer'
    import vUploadFile from '../../common/UploadFile.vue'

    export default {
        data: function(){
            return {
                form: {
                    category_id:'',
                    category_name: '',
                    short_name: '',
                    is_visible:'',
                    category_pic:'',
                    relation_goods_attribute_ids:'',
                    relation_goods_attribute_name:'',
                    relation_goods_attribute_name_array:[],
                    keywords:'',
                    description:'',
                    idx:-1,
                    sort:''
                },
                category_name:'',
                short_name:'',
                params:null,
                data: [],
                cdata:[],
                page: 1,
                limit:0,
                totalCount:0,
                editVisible: false,
                upVisible:false,
                file_url:'',
                attr:[],
                relation_goods_attribute_name_array_new:[]
            }
        },
        components:{
            vUploadFile
        },
        methods: {
            hier(index,row){
                index = index + 1
                var vm = this
                let para = {
                    pid:row.category_id,
                    index:index
                };
                vm.params = para
                //console.log(vm.data)
                if(row['hasChildren']){
                    CategoryBllayer.getCateList(vm)

                }else{
                    row['hasChildren'] = true
                    var level = parseInt(row['level']) + 1
                    vm.data.forEach(function(value,indexs){
                        if(value['pid'] == row['category_id'] && value['level'] == level){

                        }
                    })
                }
                //console.log(vm.data)
            },
            getUploadFileInfo(file_url,file_name){
                this.form.fileName = file_name
                this.form.category_pic =  file_name
                this.upVisible = false
            },
            uploadVisible(){
                this.upVisible = true;
            },
            formatStatus: function (row, column) {
                return row.is_visible == 1 ? '显示' : row.is_visible == 2 ? '隐藏' : '未知';
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
                    page: vm.page
                };
                vm.params = para
                CategoryBllayer.getList(vm)
            },
            handleEdit(index, row) {
                this.relation_goods_attribute_name_array_new = row.relation_goods_attribute_name_array
                this.form = {
                    category_name: row.category_name,
                    short_name: row.short_name,
                    is_visible: row.is_visible,
                    category_pic:row.category_pic,
                    relation_goods_attribute_ids:row.relation_goods_attribute_ids,
                    keywords: row.keywords,
                    description: row.description,
                    sort:row.sort,
                    category_id: row.category_id,
                    idx:index
                }
                this.editVisible = true;
            },
            handleUp(index, row, num){

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.form.relation_goods_attribute_ids = ''
                this.form.relation_goods_attribute_name = ''
                for(let index in this.relation_goods_attribute_name_array_new){
                    this.form.relation_goods_attribute_name += '|' + this.relation_goods_attribute_name_array_new[index]
                    for(let key in this.attr){
                        if(this.relation_goods_attribute_name_array_new[index] == this.attr[key]){
                            this.form.relation_goods_attribute_ids += ',' + key
                        }
                    }
                }
                this.form.relation_goods_attribute_ids = this.form.relation_goods_attribute_ids.substr(1)
                this.form.relation_goods_attribute_name = this.form.relation_goods_attribute_name.substr(1)
                var vm = this
                let para = {
                    id:this.form.category_id,
                    category_name:this.form.category_name,
                    short_name:this.form.short_name,
                    is_visible:this.form.is_visible,
                    category_pic:this.form.category_pic,
                    relation_goods_attribute_ids:this.form.relation_goods_attribute_ids,
                    keywords:this.form.keywords,
                    description:this.form.description,
                    sort:this.form.sort,
                };
                vm.params = para
                CategoryBllayer.edit(vm)
                this.editVisible = false;
                //this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            updateGetList(){
                this.data[this.form.idx].category_name = this.form.category_name,
                    this.data[this.form.idx].short_name = this.form.short_name,
                    this.data[this.form.idx].is_visible = this.form.is_visible,
                    this.data[this.form.idx].category_pic = this.form.category_pic,
                    this.data[this.form.idx].relation_goods_attribute_name = this.form.relation_goods_attribute_name,
                    this.data[this.form.idx].keywords = this.form.keywords,
                    this.data[this.form.idx].description = this.form.description,
                    this.data[this.form.idx].sort = this.form.sort
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
