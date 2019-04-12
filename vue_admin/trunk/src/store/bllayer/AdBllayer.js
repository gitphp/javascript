import AdModel from '../api/AdModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class AdBllayer {
	constructor() {

	}
	static getList(vm) {
		var adModel = new AdModel()
		var data = vm.params
		adModel.getList(data,function(sucResp){
			var data,code, msg,items
			data = sucResp.data
			code = data.code
			msg = data.msg
			items = data.data
			if(code == '100'){
				vm.data = items.data
				vm.limit = parseInt(items.limit)
				vm.totalCount = parseInt(items.total)
				vm.file_url = items.url
			}else{
				vm.data = []
				vm.msgCue = msg
			}
		},function(errResp){
			console.log(errResp)
		})
	}
}