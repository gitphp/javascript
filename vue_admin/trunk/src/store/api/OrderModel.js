import WithSessModel from './base/WithSessModel'
export default class OrderModel extends WithSessModel {
	constructor() {
		super()
	}
	getList(data,sucFun,errFun){
		super.post('m=order&c=index&a=orderList',data,sucFun,errFun)
	}
}