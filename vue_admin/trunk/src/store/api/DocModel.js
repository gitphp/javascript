import JaidModel from '../../system/core/Model'

export default class DocModel extends JaidModel {
	constructor() {
		super()
	}
	detail(data,sucFun,errFun){
		super.post('m=article&c=appindex&a=docs',data,sucFun,errFun)
	}
}