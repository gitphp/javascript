import AdminAddModel from '../api/AdminAddModel'
import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class AdminAddBllayer {
	constructor() {

	}
	static add(vm) {
		var adminAddModel = new AdminAddModel()
        var data={username:vm.form.account,password:'123456',full_name:vm.form.name,phone:vm.form.phone,remark:vm.form.remark}
		data.password = md5(data.password)
		adminAddModel.add(data,function(sucResp){
		    console.log(sucResp)
            var data,code,msg
            data = sucResp.data
            code = data.code
            msg = data.msg
            if(code == '100'){

            }else{
                vm.msgCue = msg
            }
		},function(errResp){
			console.log(errResp)
		})
	}
}