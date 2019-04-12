import WithSessModel from './base/WithSessModel'
// 属性模型
export default class AttributeModel extends WithSessModel {
	constructor() {
		super()
	}
	// 属性列表
	getList(data,sucFun,errFun){
		super.post('m=goods&c=attribute&a=index',data,sucFun,errFun)
	}
	// 属性添加
	
	// 属性修改
	edit(data,sucFun,errFun){
		super.post('m=goods&c=attribute&a=edit',data,sucFun,errFun)
	}

    // 属性添加
    add(data,sucFun,errFun){
        super.post('m=goods&c=attribute&a=add',data,sucFun,errFun)
    }
	
	
}

