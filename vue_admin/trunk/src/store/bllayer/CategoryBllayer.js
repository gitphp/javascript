import CategoryModel from '../api/CategoryModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class CategoryBllayer {
	constructor() {
		
	}
	// 列表属性
	static getList(vm) {
		var categoryModel = new CategoryModel()
		var data = vm.params
		categoryModel.getList(data,function(sucResp){
			var data,code, msg,items
			data = sucResp.data
			code = data.code
			msg = data.msg
			items = data.data
			if(code == '100'){
				vm.data = items.data
				vm.limit = parseInt(items.limit)
				vm.file_url = items.url
				vm.attr = items.attr
				vm.totalCount = parseInt(items.total)
			}else{
				vm.data = []
				vm.limit = 1
				vm.totalCount = 0
				vm.msgCue = msg
			}
		},function(errResp){
			console.log(errResp)
		})
	}
	// 编辑属性
	static edit(vm) {
	var categoryModel = new CategoryModel()
	var data=vm.params
		categoryModel.edit(data,function(sucResp){
		var data,code, msg,item
		data = sucResp.data
		code = data.code
		msg = data.msg
		item = data.data
		if(code == '100'){
			console.log(100)
			vm.updateGetList()
		}else{
			vm.msgCue = msg
		}
		},function(errResp){
			console.log(errResp)
		})
	}
	// 编辑属性
	static add(vm) {
		console.log('add')
		console.log(vm)
		var categoryModel = new CategoryModel()
		var data=vm.form
		categoryModel.add(data,function(sucResp){
			console.log(sucResp)
			var data,code, msg,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			item = data.data
			if(code == '100'){
				vm.$router.push('/categoryIndex')
			}else{
				vm.msgCue = msg
			}
		},function(errResp){
			console.log(errResp)
		})
	}
	// 商品属性列表
	static getAttr(vm) {
		var categoryModel = new CategoryModel()
		var data = {}
		categoryModel.getAttr(data,function(sucResp){
			console.log(sucResp)
			vm.attr = sucResp.data.data
			console.log(sucResp.data.data)
		},function(errResp){
			console.log(errResp)
		})
	}

	//
	static getCateList(vm){
		var categoryModel = new CategoryModel()
		var data = vm.params
		categoryModel.getCateList(data,function(sucResp){
			var data,code, msg,items
			data = sucResp.data
			code = data.code
			msg = data.msg
			items = data.data
			if(code == '100'){
				vm.cdata = []
				//vm.cdata = items
				console.log(items)
				vm.data[vm.params.index - 1]['hasChildren'] = false
				vm.data[vm.params.index - 1]['flag'] = true
				items.data.forEach(function(value,index,array){
					vm.data.splice(vm.params.index,0,value)
				})
				console.log(vm.data)
			}else{
				vm.cdata = []
				vm.msgCue = msg
			}
		},function(errResp){
			console.log(errResp)
		})
	}
}