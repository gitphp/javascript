import WithSessModel from './base/WithSessModel'
// 规格模型
export default class SpecModel extends WithSessModel {
	constructor() {
		super()
	}
	getList(data,sucFun,errFun){
		super.post('m=goods&c=spec&a=index',data,sucFun,errFun)
	}
	// 修改
	edit(data,sucFun,errFun){
		super.post('m=goods&c=spec&a=edit',data,sucFun,errFun)
	}

    // 添加
    add(data,sucFun,errFun){
        super.post('m=goods&c=spec&a=add',data,sucFun,errFun)
    }

}