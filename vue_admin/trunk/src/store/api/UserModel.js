import WithSessModel from './base/WithSessModel'
// 注册用户模型
export default class UserModel extends WithSessModel {
	constructor() {
		super()
	}
	//列表
	getList(data,sucFun,errFun){
		super.post('m=user&c=index&a=index',data,sucFun,errFun)
	}
	//状态
	changeStatus(data,sucFun,errFun){
		super.post('m=user&c=index&a=forbidden',data,sucFun,errFun)
	}
	
}