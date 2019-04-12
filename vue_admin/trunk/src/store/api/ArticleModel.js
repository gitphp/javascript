import WithSessModel from './base/WithSessModel'
// 文章模型
export default class ArticleModel extends WithSessModel {
	constructor() {
		super()
	}
	// 列表
	getList(data,sucFun,errFun){
		super.post('m=article&c=index&a=index',data,sucFun,errFun)
	}

	// 文章添加
	add(data,sucFun,errFun){
		super.post('m=article&c=index&a=add',data,sucFun,errFun)
	}

	// 文章删除
    articleDelete(data,sucFun,errFun){
		super.post('m=article&c=index&a=delete',data,sucFun,errFun)
	}

    // 修改
    edit(data,sucFun,errFun){
        super.post('m=article&c=index&a=edit',data,sucFun,errFun)
    }

    // 获取分类
    category(data,sucFun,errFun){
        super.post('m=article&c=index&a=getCat',data,sucFun,errFun)
    }
	
	
	
}