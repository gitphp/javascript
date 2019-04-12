import AdminModel from '../api/AdminModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class AdminBllayer {
	constructor() {

	}
	static getList(vm) {
		var adminModel = new AdminModel()
		var data = vm.params
		data['username'] = data['account'];
		data['full_name'] = data['name'];
		data['phone'] = data['phone'];
		adminModel.getList(data,function(sucResp){
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
}