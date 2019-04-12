import WithSessModel from './base/WithSessModel'

export default class AdAddModel extends WithSessModel {
	constructor() {
		super()
	}
	add(data,sucFun,errFun){
		super.post('m=ad&c=index&a=add',data,sucFun,errFun)
	}
}