import WithSessModel from './base/WithSessModel'

export default class AdminModel extends WithSessModel {
	constructor() {
		super()
	}
	detail(data,sucFun,errFun){
		super.post('m=admin&c=index&a=index',data,sucFun,errFun)
	}
}
}