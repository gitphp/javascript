import AdminEditModel from '../api/AdminEditModel'
import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class AdminEditBllayer {
	constructor() {

	}
	static edit(vm) {
		var adminEditModel = new AdminEditModel()
		var data={id:vm.params.id,username:vm.params.username,full_name: vm.params.full_name,phone:vm.params.phone}
		adminEditModel.edit(data,function(sucResp){
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
	static password(vm) {
		console.log(vm);

		var adminEditModel = new AdminEditModel()
		var data={id:vm.inits.id,password:vm.inits.password}
		console.log(data);
		data.password = md5(data.password)
		adminEditModel.edit(data,function(sucResp){
			console.log(sucResp)
			var data,code, msg,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			item = data.data
			if(code == '100'){

			}else{
				vm.msgCue = msg
			}
		},function(errResp){
			console.log(errResp)
		})
	}
}