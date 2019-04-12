import WithSessModel from './base/WithSessModel'

export default class ArticleCategoryModel extends WithSessModel {
	constructor() {
		super()
	}
	getList(data,sucFun,errFun){
		super.post('m=article&c=category&a=index',data,sucFun,errFun)
	}
	// 修改
	edit(data,sucFun,errFun){
		super.post('m=article&c=category&a=edit',data,sucFun,errFun)
	}
	// 新增
	add(data,sucFun,errFun){
		super.post('m=article&c=category&a=add',data,sucFun,errFun)
	}
	
	
}

