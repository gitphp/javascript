import WithSessModel from './base/WithSessModel'

export default class AdminAddModel extends WithSessModel {
	constructor() {
		super()
	}
	add(data,sucFun,errFun){
		super.post('m=admin&c=index&a=add',data,sucFun,errFun)
	}
}