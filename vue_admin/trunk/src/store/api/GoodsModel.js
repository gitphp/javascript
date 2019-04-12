import WithSessModel from './base/WithSessModel'
// 商品模型
export default class GoodsModel extends WithSessModel {
	constructor() {
		super()
	}
    getList(data,sucFun,errFun){
		super.post('m=goods&c=index&a=index',data,sucFun,errFun)
	}
	// 商品添加
	add(data,sucFun,errFun){
		super.post('m=goods&c=index&a=add',data,sucFun,errFun)
	}
	// 商品违规下架
    offGoods(data,sucFun,errFun){
		super.post('m=goods&c=index&a=off',data,sucFun,errFun)
	}
    // 推荐热销下架
    hotGoods(data,sucFun,errFun){
        super.post('m=goods&c=index&a=hotRecommend',data,sucFun,errFun)
    }

    // 商品分类列表
    goodsCat(data,sucFun,errFun){
        super.post('m=goods&c=index&a=getCat',data,sucFun,errFun)
    }
	
	
	
	
}