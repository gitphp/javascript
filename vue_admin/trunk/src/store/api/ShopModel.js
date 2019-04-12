import WithSessModel from './base/WithSessModel'

export default class ShopModel extends WithSessModel {
	constructor() {
		super()
	}
	getList(data,sucFun,errFun){
		super.post('m=shop&c=index&a=index',data,sucFun,errFun)
	}
	getDetail(data,sucFun,errFun){
		super.post('m=shop&c=index&a=detail',data,sucFun,errFun)
	}
	disAble(data,sucFun,errFun){//开启禁用
		super.post('m=shop&c=index&a=delete',data,sucFun,errFun)
	}
	upData(data,sucFun,errFun){//审核
		super.post('m=shop&c=index&a=edit',data,sucFun,errFun)
	}

}