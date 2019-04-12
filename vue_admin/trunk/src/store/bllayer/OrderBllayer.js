import OrderModel from '../api/OrderModel'
//import md5 from 'js-md5'
import { local_save_remove } from '../../helper/cmm_helper'

export default class AccountBllayer {
	constructor() {
		
	}
	static getList(vm) {
		var orderModel = new OrderModel()
		var data = vm.form
		orderModel.getList(data,function(sucResp){
			var data,code, msg,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			item = data.data
			if(code == '100'){
				console.log('ok')
			}else{
				console.log('no')
			}	
		},function(errResp){
			console.log(errResp)
		})
	}
}