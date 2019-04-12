import UserModel from '../api/base/UserModel'
import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class UserBllayer {
	constructor() {
		
	}
	static login(vm) {
		//console.log(vm.ruleForm.username)
		var userModel = new UserModel()
		var data={username:vm.ruleForm.username,password:vm.ruleForm.password}
		data.password = md5(data.password)
		userModel.login(data,function(sucResp){
			var data,code, msg,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			item = data.data
			if(code == '100'){
				local_save_set('ms_username',vm.ruleForm.username)
				local_save_set('sess_data',JSON.stringify(item))	
				vm.$router.push('/')
			}else{
				vm.msgCue = msg
			}	
		},function(errResp){
			console.log(errResp)
		})
	}
}