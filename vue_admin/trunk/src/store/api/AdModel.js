import WithSessModel from './base/WithSessModel'

export default class AdModel extends WithSessModel {
	constructor() {
		super()
	}
	getList(data,sucFun,errFun){
		super.post('m=ad&c=index&a=index',data,sucFun,errFun)
	}
}