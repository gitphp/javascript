import GoodsModel from '../api/GoodsModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class GoodsBllayer {
	constructor() {
		
	}
	static getList(vm) {
		var goodsModel = new GoodsModel()
		var data = vm.params
	
		goodsModel.getList(data,function(sucResp){
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

    // 新增商品
    static add(vm) {

        var goodsModel = new GoodsModel()
        var data=vm.form

        goodsModel.add(data,function(sucResp){
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

    // 下架违规商品
    static goodsOff(vm) {

        var goodsModel = new GoodsModel()
        var data={goods_id:vm.inits.goods_id}

        goodsModel.offGoods(data,function(sucResp){
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

    // 推荐热销商品
    static hotGoods(vm) {

        var goodsModel = new GoodsModel()
        var data={goods_id:vm.inits.goods_id, method_type:vm.inits.method_type, value_data:vm.inits.value_data}

        goodsModel.hotGoods(data,function(sucResp){
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

    // 商品分类列表
    static getCats(vm) {
        var goodsModel = new GoodsModel()
        var data = {}
        goodsModel.goodsCat(data,function(sucResp){
            console.log(sucResp)
            vm.attr = sucResp.data.data
            console.log(sucResp.data.data)
        },function(errResp){
            console.log(errResp)
        })
    }

	
}