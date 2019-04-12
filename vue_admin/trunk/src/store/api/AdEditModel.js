import WithSessModel from './base/WithSessModel'

export default class AdEditModel extends WithSessModel {
	constructor() {
		super()
	}
	edit(data,sucFun,errFun){
		super.post('m=ad&c=index&a=edit',data,sucFun,errFun)
	}
}