import PositionModel from '../api/PositionModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'
import AdEditModel from "../api/AdEditModel";

export default class PositionBllayer {
	constructor() {

	}
	static getList(vm) {
		var positionModel = new PositionModel()
		var data = vm.params
		positionModel.getList(data,function(sucResp){
			var data,code, msg,items
			data = sucResp.data
			code = data.code
			msg = data.msg
			items = data.data
			console.log(items.data)
			if(code == '100'){
				vm.data = items.data
				vm.adlist = items.adlist
				vm.limit = parseInt(items.limit)
				vm.totalCount = parseInt(items.total)
				vm.file_url = items.url
				console.log(vm.data)
			}else{
				vm.data = []
				vm.msgCue = msg
			}
		},function(errResp){
			console.log(errResp)
		})
	}

	static edit(vm) {
		var positionModel = new PositionModel()
		var data={id:vm.params.id,name:vm.params.name,iden: vm.params.iden,ads:vm.params.ads,status:vm.params.status}
		positionModel.edit(data,function(sucResp){
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

	static add(vm) {
		console.log(vm)
		var positionModel = new PositionModel()
		var data={name:vm.form.name,iden: vm.form.iden,ads:vm.form.ads,status:vm.form.status}
		positionModel.add(data,function(sucResp){
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

	static adPic(vm) {
		var positionModel = new PositionModel()
		var data={}
		positionModel.adPic(data,function(sucResp){
			var data,code, msg,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			item = data
			if(code == '100'){
				vm.data = item.data.adlist
				vm.file_url = item.data.url
				console.log(vm.data)
			}else{
				vm.msgCue = msg
			}
		},function(errResp){
			console.log(errResp)
		})
	}
}