import WithSessModel from './base/WithSessModel'
// 属性模型
export default class CategoryModel extends WithSessModel {
	constructor() {
		super()
	}
	// 分类列表
	getList(data,sucFun,errFun){
		super.post('m=goods&c=category&a=index',data,sucFun,errFun)
	}
	// 属性添加
	add(data,sucFun,errFun){
		super.post('m=goods&c=category&a=add',data,sucFun,errFun)
	}
	// 分类修改
	edit(data,sucFun,errFun){
		super.post('m=goods&c=category&a=edit',data,sucFun,errFun)
	}
	//分类删除
	delete(data,sucFun,errFun){
		super.post('m=goods&c=category&a=delete',data,sucFun,errFun)
	}
	//属性列表
	getAttr(data,sucFun,errFun){
		super.post('m=goods&c=category&a=attr',data,sucFun,errFun)
	}
	// 子分类列表
	getCateList(data,sucFun,errFun){
		super.post('m=goods&c=category&a=clist',data,sucFun,errFun)
	}
}

