import WithSessModel from './base/WithSessModel'
// 文章模型
export default class ArticleModel extends WithSessModel {
	constructor() {
		super()
	}
	ArticleList(data,sucFun,errFun){
		super.post('m=article&c=index&a=index',data,sucFun,errFun)
	}
}