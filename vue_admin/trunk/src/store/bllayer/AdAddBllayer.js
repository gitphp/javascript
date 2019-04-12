import AdAddModel from '../api/AdAddModel'
import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class AdminAddBllayer {
	constructor() {

	}
	static add(vm) {
		console.log(11)
		console.log(vm)
		console.log(22)
		var adAddModel = new AdAddModel()
        var data=vm.form
		console.log(data)
		console.log(333)
		adAddModel.add(data,function(sucResp){
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