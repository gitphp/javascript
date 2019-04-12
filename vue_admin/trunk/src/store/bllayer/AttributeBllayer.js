import AttributeModel from '../api/AttributeModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class AttributeBllayer {
	constructor() {
		
	}
	// 列表属性
	static getList(vm) {
		var attributeModel = new AttributeModel()
		var data = vm.params
		data['username'] = data['account'];
		data['full_name'] = data['name'];
		data['phone'] = data['phone'];
		attributeModel.getList(data,function(sucResp){
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
	// 编辑属性
	static edit(vm) {
	var attributeModel = new AttributeModel()
	var data={attr_id:vm.params.attr_id,attr_name:vm.params.attr_name,attr_value_type: vm.params.attr_value_type,value:vm.params.value,
		sort:vm.params.sort,use_in_goods_category:vm.params.use_in_goods_category,status:vm.params.status}
	attributeModel.edit(data,function(sucResp){
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
        var attributeModel = new AttributeModel()
        var data=vm.form

        attributeModel.add(data,function(sucResp){
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