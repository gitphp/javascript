import WithSessModel from './base/WithSessModel'
export default class AccountModel extends WithSessModel {
	constructor() {
		super()
	}
	changePwd(data,sucFun,errFun){
		super.post('c=account&a=changePwd',data,sucFun,errFun)
	}
	logout(data,sucFun,errFun){
		super.post('c=account&a=logout',data,sucFun,errFun)
	}
}