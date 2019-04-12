import WithSessModel from './base/WithSessModel'

export default class AdminModel extends WithSessModel {
	constructor() {
		super()
	}
	getList(data,sucFun,errFun){
		super.post('m=admin&c=index&a=index',data,sucFun,errFun)
	}
}