import AccountModel from '../api/AccountModel'
//import md5 from 'js-md5'
import { local_save_remove } from '../../helper/cmm_helper'

export default class AccountBllayer {
	constructor() {
		
	}
	static changePwd(vm) {
		var accountModel = new AccountModel()
		var data = vm.form
		//data.password = md5(data.password)
		accountModel.changePwd(data,function(sucResp){
			var data,code, msg,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			item = data.data
			if(code == '100'){
				vm.$message.success(msg)
				vm.msgCue = ''
				for(let ar in vm.form) {
					vm.form[ar] = ''
				} 
			}else{
				if(code == '3' || code == '4'){
					vm.$message.success('您未登陆或登陆过期')
					vm.$router.push('/login')
				}
				vm.msgCue = msg
			}	
		},function(errResp){
			console.log(errResp)
		})
	}
	static logout(vm) {
		var accountModel = new AccountModel()
		var data = {}
		accountModel.logout(data,function(sucResp){
			var data,code, msg//,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			//item = data.data
			if(code == '100' || code == '3' || code == '4'){
				local_save_remove('ms_username')
				local_save_remove('sess_data')
				vm.$router.push('/login')
			}else{	
				vm.$message.success(msg)
			}	
		},function(errResp){
			console.log(errResp)
		})
	}
}