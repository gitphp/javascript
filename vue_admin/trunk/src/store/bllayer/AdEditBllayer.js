import AdEditModel from '../api/AdEditModel'
import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class AdEditBllayer {
	constructor() {

	}
	static edit(vm) {

		var adEditModel = new AdEditModel()
		var data={id:vm.params.id,name:vm.params.name,img: vm.params.img,url:vm.params.url,remark:vm.params.remark,status:vm.params.status}
		adEditModel.edit(data,function(sucResp){
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

		var adEditModel = new AdEditModel()
		var data={id:vm.inits.id,password:vm.inits.password}
		console.log(data);
		data.password = md5(data.password)
		adEditModel.edit(data,function(sucResp){
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