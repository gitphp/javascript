import WithSessModel from './base/WithSessModel'

export default class AdminEditModel extends WithSessModel {
	constructor() {
		super()
	}
	edit(data,sucFun,errFun){
		super.post('m=admin&c=index&a=edit',data,sucFun,errFun)
	}
}