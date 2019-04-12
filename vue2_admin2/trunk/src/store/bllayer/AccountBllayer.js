import AccountModel from '../api/AccountModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

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
			}else{
				vm.msgCue = msg
			}	
		},function(errResp){
			console.log(errResp)
		})
	}
}