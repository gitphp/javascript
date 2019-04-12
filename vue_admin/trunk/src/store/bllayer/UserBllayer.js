// import UserModel from '../api/base/UserModel'
import UsersModel from '../api/UserModel'
import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class UserBllayer {
	constructor() {
		
	}
	// 用户列表
	static getList(vm) {
		var usersModel = new UsersModel()
		var data = vm.params
		data['username'] = data['account'];
		data['full_name'] = data['name'];
		data['phone'] = data['phone'];
		usersModel.getList(data,function(sucResp){
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
				vm.msgCue = msg
			}
		},function(errResp){
			console.log(errResp)
		})
	}
	// 禁用用户
	static changeStatus(vm) {
	
		var usersModel = new UsersModel()
		var data={id:vm.inits.id,status:vm.inits.status}
		console.log(data);
		//data.password = md5(data.password)
		usersModel.changeStatus(data,function(sucResp){
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