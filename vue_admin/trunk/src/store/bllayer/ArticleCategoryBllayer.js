import ArticleCategoryModel from '../api/ArticleCategoryModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class ArticleCategoryBllayer {
	constructor() {

	}
	// 文章分类的列表
	static getList(vm) {
		var articleCategoryModel = new ArticleCategoryModel()
		var data = vm.params
		articleCategoryModel.getList(data,function(sucResp){
			console.log(sucResp);
			var data,code, msg,items
			data = sucResp.data
			code = data.code
			msg = data.msg
			items = data.data
			if(code == '100'){
				//console.log(items.data);
				vm.data = items.data
				vm.limit = parseInt(items.limit)
				vm.totalCount = parseInt(items.total)

			}else{
				vm.msgCue = msg
			}
		},function(errResp){
			console.log(errResp)
		})
	}
	// 编辑文章分类
	static edit(vm) {
	var articleCategoryModel = new ArticleCategoryModel()
	var data={id:vm.params.id,title:vm.params.title,img: vm.params.img,keywords:vm.params.keywords,description:vm.params.description,
				iden:vm.params.iden,status:vm.params.status,sort:vm.params.sort}
	articleCategoryModel.edit(data,function(sucResp){
		var data,code, msg,item
		data = sucResp.data
		code = data.code
		msg = data.msg
		item = data.data
		if(code == '100'){
			vm.updateGetList()
		}else{
			vm.msgCue = msg
		}
		},function(errResp){
			console.log(errResp)
		})
	}
	
	// 新增分类
	static add(vm) {
		var articleCategoryModel = new ArticleCategoryModel()
	    var data=vm.form

		articleCategoryModel.add(data,function(sucResp){
		    console.log(sucResp)
	        var data,code,msg
	        data = sucResp.data
	        code = data.code
	        msg = data.msg
	        if(code == '100'){
				vm.msgCue = msg
	        }else{
	            vm.msgCue = msg
	        }
		},function(errResp){
			console.log(errResp)
		})
	}
	
	
}