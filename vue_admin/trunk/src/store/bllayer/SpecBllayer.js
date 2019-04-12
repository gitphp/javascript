import SpecModel from '../api/SpecModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class SpecBllayer {
	constructor() {

	}
	// 列表
	static getList(vm) {
		var specModel = new SpecModel()
		var data = vm.params
		specModel.getList(data,function(sucResp){
			console.log(sucResp);
			var data,code, msg,items
			data = sucResp.data
			code = data.code
			msg = data.msg
			items = data.data
			if(code == '100'){
				//console.log(items.data);
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
	// 编辑商品规格
	static edit(vm) {
	var specModel = new SpecModel()
	var data={spec_id:vm.params.spec_id,spec_name:vm.params.spec_name,show_type: vm.params.show_type,is_screen:vm.params.is_screen,
				is_platform:vm.params.is_platform,spec_item_name:vm.params.spec_item_name,
				status:vm.params.status,sort:vm.params.sort,use_in_goods_category:vm.params.use_in_goods_category
			}

	specModel.edit(data,function(sucResp){
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

    // 新增分类
    static add(vm) {
        var specModel = new SpecModel()
        var data=vm.form

        specModel.add(data,function(sucResp){
            console.log(sucResp)
            var data,code,msg
            data = sucResp.data
            code = data.code
            msg = data.msg
            if(code == '100'){
                vm.msgCue = msg
            }else{
                vm.msgCue = msg
            }
        },function(errResp){
            console.log(errResp)
        })
    }


}