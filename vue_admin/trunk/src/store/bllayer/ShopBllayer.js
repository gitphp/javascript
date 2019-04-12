import ShopModel from '../api/ShopModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class ShopBllayer {
	constructor() {

	}
	static getList(vm) {
		var shopModel = new ShopModel()
		var data = vm.params
		data['shop_tel'] = data['account'];
		data['shop_name'] = data['name'];
		data['phone'] = data['phone'];
		shopModel.getList(data,function(sucResp){
			console.log(sucResp);
			var data,code, msg,items
			data = sucResp.data
			code = data.code
			msg = data.msg
			items = data.data
			if(code == '100'){
				vm.data = items.data
				vm.limit = parseInt(items.limit)
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

	static getDetail(vm) {
		var shopModel = new ShopModel()
		var data={shop_id:vm.params}
		shopModel.getDetail(data,function(sucResp){
			var data,code, msg,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			item = data.data
			if(code == '100'){
				vm.form = item
			}else{

			}
		},function(errResp){
			console.log(errResp)
		})
	}

	static disAble(vm) {
		var shopModel = new ShopModel()
		var data={shop_id:vm.params.shop_id,shop_type:vm.params.shop_status}
		shopModel.disAble(data,function(sucResp){
			var data,code, msg,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			item = data.data
			if(code == '100'){
				vm.upDisable()
			}else{

			}
		},function(errResp){
			console.log(errResp)
		})
	}

	static upData(vm) {
		var shopModel = new ShopModel()
		var status = vm.params.shop_status == 4 ? 1 : 2
		var data={shop_id:vm.params.shop_id,shop_type:status}
		shopModel.upData(data,function(sucResp){
			var data,code, msg,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			item = data.data
			if(code == '100'){
				vm.upDisable()
			}else{

			}
		},function(errResp){
			console.log(errResp)
		})
	}
}