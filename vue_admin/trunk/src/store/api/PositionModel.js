import WithSessModel from './base/WithSessModel'

export default class PositionModel extends WithSessModel {
	constructor() {
		super()
	}
	getList(data,sucFun,errFun){
		super.post('m=ad&c=position&a=index',data,sucFun,errFun)
	}
    edit(data,sucFun,errFun){
        super.post('m=ad&c=position&a=edit',data,sucFun,errFun)
    }
	add(data,sucFun,errFun){
		super.post('m=ad&c=position&a=add',data,sucFun,errFun)
	}
	adPic(data,sucFun,errFun){
		super.post('m=ad&c=position&a=adPic',data,sucFun,errFun)
	}
}